import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Credential } from 'mppx'
import { Mppx, tempo } from 'mppx/server'

// pathUSD on Tempo testnet
const CURRENCY = '0x20c0000000000000000000000000000000000000'
// Demo recipient — replace with your own address
const RECIPIENT = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
import { menu } from './menu'
import { computePrice, type OrderItem } from './pricing'
import { createOrder, getRecentOrders } from './orders'
import { html } from './frontend'

const app = new Hono()

// CORS for frontend
app.use('/api/*', cors())

// MPP server instance — only charge intent (no sessions needed)
const mppx = Mppx.create({
  methods: [tempo.charge({ testnet: true })],
})

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
  const response = await mppx.charge({
    amount: breakdown.total,
    currency: CURRENCY,
    recipient: RECIPIENT,
    description: `MPP Bazaar order: ${breakdown.items.map(i => i.name).join(', ')}`,
  })(c.req.raw)

  // 402: send challenge back to client
  if (response.status === 402) {
    return response.challenge
  }

  // Payment verified — extract payer identity from credential
  const authHeader = c.req.header('Authorization')
  let payer: string | null = null
  if (authHeader) {
    try {
      const credential = Credential.deserialize(authHeader)
      payer = credential.source ?? null
    } catch {}
  }
  const order = createOrder(breakdown, payer)

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
      createdAt: order.createdAt,
    })
  )
})

// ─── Recent Orders Feed ──────────────────────────────────────────────
app.get('/api/orders/recent', (c) => {
  return c.json({ orders: getRecentOrders(10) })
})

// ─── Frontend ────────────────────────────────────────────────────────
app.get('/', (c) => {
  return c.html(html)
})

export default app
