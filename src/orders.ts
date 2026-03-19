// In-memory order store (stateless per isolate, good enough for demo)

import type { LineItem, PriceBreakdown } from './pricing'

export interface Order {
  id: string
  items: LineItem[]
  breakdown: PriceBreakdown
  payer: string | null
  status: 'confirmed'
  createdAt: string
}

const orders: Order[] = []
let orderCounter = 1000

export function createOrder(
  breakdown: PriceBreakdown,
  payer: string | null,
): Order {
  const order: Order = {
    id: `ORD-${++orderCounter}`,
    items: breakdown.items,
    breakdown,
    payer,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }
  orders.unshift(order) // newest first
  if (orders.length > 50) orders.pop()
  return order
}

export function getRecentOrders(limit = 10): Order[] {
  return orders.slice(0, limit)
}
