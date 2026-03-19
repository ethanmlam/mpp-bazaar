import { Mppx, tempo } from 'mppx/client'
import { privateKeyToAccount } from 'viem/accounts'

;(window as any).payForOrder = async function payForOrder(
  privateKey: string,
  items: Array<{ id: string; qty: number }>,
  onStatus?: (msg: string) => void,
): Promise<any> {
  const log = onStatus ?? console.log

  log('Initializing wallet...')
  const account = privateKeyToAccount(privateKey as `0x${string}`)
  log('Wallet: ' + account.address)

  const mppx = Mppx.create({
    methods: [tempo({ account })],
    polyfill: false,
  })

  log('Sending order & handling 402 challenge...')
  const res = await mppx.fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error('Order failed (' + res.status + '): ' + text)
  }

  log('Payment confirmed!')
  return res.json()
}
