import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Credential } from 'mppx'
import { Mppx, tempo } from 'mppx/server'

// USDC on Tempo mainnet
const CURRENCY = '0x20c000000000000000000000b9537d11c60e8b50'
import { menu } from './menu'
import { computePrice, type OrderItem } from './pricing'
import { createOrder, getRecentOrders } from './orders'
import { html } from './frontend'

const app = new Hono()

// CORS for frontend
app.use('/api/*', cors())

// MPP server instance — created per-request to access env bindings
function getMppx(env: { MPP_SECRET_KEY: string }) {
  return Mppx.create({
    secretKey: env.MPP_SECRET_KEY,
    methods: [tempo.charge()],
  })
}

// ─── Menu ────────────────────────────────────────────────────────────
app.get('/api/menu', (c) => {
  return c.json({
    name: 'MPP Bazaar Food Truck',
    tagline: 'Where algorithms meet appetite',
    items: menu,
  })
})

// ─── Price Preview (no payment required) ─────────────────────────────
app.post('/api/preview', async (c) => {
  try {
    const body = await c.req.json<{ items: OrderItem[] }>()
    if (!body.items?.length) return c.json({ error: 'No items provided' }, 400)
    const breakdown = computePrice(body.items)
    return c.json({ breakdown })
  } catch (e: any) {
    return c.json({ error: e.message }, 400)
  }
})

// ─── Order (payment required) ────────────────────────────────────────
app.post('/api/order', async (c) => {
  // Parse body first to compute dynamic price
  let body: { items: OrderItem[] }
  try {
    body = await c.req.json()
    if (!body.items?.length) return c.json({ error: 'No items provided' }, 400)
  } catch {
    return c.json({ error: 'Invalid JSON body' }, 400)
  }

  let breakdown
  try {
    breakdown = computePrice(body.items)
  } catch (e: any) {
    return c.json({ error: e.message }, 400)
  }

  // Dynamic charge — this is what x402 can't do
  const env = c.env as { MPP_SECRET_KEY: string; RECIPIENT_ADDRESS: string }
  const mppx = getMppx(env)
  // Scale price down 100x so demo orders cost pennies (e.g. $14.00 menu → $0.14 charge)
  const demoAmount = (parseFloat(breakdown.total) / 100).toFixed(2)
  const response = await mppx.charge({
    amount: demoAmount,
    currency: CURRENCY,
    recipient: env.RECIPIENT_ADDRESS,
    description: `MPP Bazaar order: ${breakdown.items.map(i => i.name).join(', ')}`,
  })(c.req.raw)

  // 402: send challenge back to client
  if (response.status === 402) {
    return response.challenge
  }

  // Payment verified — extract payer identity and tx hash from credential
  const authHeader = c.req.header('Authorization')
  let payer: string | null = null
  let txHash: string | null = null
  if (authHeader) {
    try {
      const credential = Credential.deserialize(authHeader)
      payer = credential.source ?? null
      const payload = credential.payload as any
      txHash = payload?.txHash ?? payload?.transactionHash ?? payload?.hash ?? null
    } catch {}
  }
  const order = createOrder(breakdown, payer)
  console.log(`[ORDER] ${order.id} | $${breakdown.total} | ${breakdown.items.map(i => `${i.qty}x ${i.name}`).join(', ')} | payer: ${payer ?? 'anonymous'} | tx: ${txHash ?? 'n/a'}`)

  return response.withReceipt(
    Response.json({
      orderId: order.id,
      status: order.status,
      items: order.items,
      breakdown: {
        subtotal: breakdown.subtotal,
        comboDiscount: breakdown.comboDiscount,
        bulkDiscount: breakdown.bulkDiscount,
        tax: breakdown.tax,
        total: breakdown.total,
      },
      payer,
      txHash,
      createdAt: order.createdAt,
    })
  )
})

// ─── Recent Orders Feed ──────────────────────────────────────────────
app.get('/api/orders/recent', (c) => {
  return c.json({ orders: getRecentOrders(10) })
})

// ─── Client config ───────────────────────────────────────────────────
app.get('/api/config', (c) => {
  const env = c.env as { TEMPO_PRIVATE_KEY?: string }
  return c.json({
    tempoKey: env.TEMPO_PRIVATE_KEY || null,
  })
})

// ─── Frontend ────────────────────────────────────────────────────────
app.get('/', (c) => {
  return c.html(html)
})

export default app
