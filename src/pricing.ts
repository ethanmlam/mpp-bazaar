// Dynamic pricing engine — the key feature x402 can't do
// Computes combos, bulk discounts, and tax per order

import { getMenuItem, type Category } from './menu'

const TAX_RATE = 0.08875 // SF tax
const COMBO_DISCOUNT = 0.15 // 15% off when you get Main + Side + Drink
const BULK_DISCOUNT = 0.10 // 10% off items with qty >= 3

export interface OrderItem {
  id: string
  qty: number
}

export interface LineItem {
  id: string
  name: string
  unitPrice: number
  qty: number
  lineTotal: number
  comboDiscount: number
  bulkDiscount: number
  finalPrice: number
}

export interface PriceBreakdown {
  items: LineItem[]
  subtotal: string
  comboDiscount: string
  bulkDiscount: string
  taxRate: string
  tax: string
  total: string
}

export function computePrice(orderItems: OrderItem[]): PriceBreakdown {
  // Validate and build line items
  const lines: LineItem[] = orderItems.map(oi => {
    const item = getMenuItem(oi.id)
    if (!item) throw new Error(`Unknown item: ${oi.id}`)
    if (oi.qty < 1 || !Number.isInteger(oi.qty)) throw new Error(`Invalid qty for ${oi.id}`)
    return {
      id: item.id,
      name: item.name,
      unitPrice: item.price,
      qty: oi.qty,
      lineTotal: round(item.price * oi.qty),
      comboDiscount: 0,
      bulkDiscount: 0,
      finalPrice: round(item.price * oi.qty),
    }
  })

  // Detect combo: need at least 1 main, 1 side, 1 drink
  const categories = new Map<Category, LineItem[]>()
  for (const line of lines) {
    const item = getMenuItem(line.id)!
    const cat = item.category
    if (!categories.has(cat)) categories.set(cat, [])
    categories.get(cat)!.push(line)
  }

  const hasMains = categories.get('mains') || []
  const hasSides = categories.get('sides') || []
  const hasDrinks = categories.get('drinks') || []

  // Apply combo discount to cheapest Main + Side + Drink combo sets
  const combos = Math.min(
    hasMains.reduce((s, l) => s + l.qty, 0),
    hasSides.reduce((s, l) => s + l.qty, 0),
    hasDrinks.reduce((s, l) => s + l.qty, 0),
  )

  if (combos > 0) {
    // Apply combo discount proportionally to all mains, sides, drinks
    // Simple approach: discount the first N items in each category
    for (const group of [hasMains, hasSides, hasDrinks]) {
      let remaining = combos
      for (const line of group) {
        const eligible = Math.min(line.qty, remaining)
        if (eligible > 0) {
          line.comboDiscount = round(line.unitPrice * eligible * COMBO_DISCOUNT)
          remaining -= eligible
        }
        if (remaining <= 0) break
      }
    }
  }

  // Apply bulk discount: 10% off items with qty >= 3
  for (const line of lines) {
    if (line.qty >= 3) {
      line.bulkDiscount = round(line.lineTotal * BULK_DISCOUNT)
    }
  }

  // Compute final prices
  for (const line of lines) {
    line.finalPrice = round(line.lineTotal - line.comboDiscount - line.bulkDiscount)
  }

  const subtotal = round(lines.reduce((s, l) => s + l.lineTotal, 0))
  const totalComboDiscount = round(lines.reduce((s, l) => s + l.comboDiscount, 0))
  const totalBulkDiscount = round(lines.reduce((s, l) => s + l.bulkDiscount, 0))
  const afterDiscounts = round(subtotal - totalComboDiscount - totalBulkDiscount)
  const tax = round(afterDiscounts * TAX_RATE)
  const total = round(afterDiscounts + tax)

  return {
    items: lines,
    subtotal: subtotal.toFixed(2),
    comboDiscount: totalComboDiscount > 0 ? `-${totalComboDiscount.toFixed(2)}` : '0.00',
    bulkDiscount: totalBulkDiscount > 0 ? `-${totalBulkDiscount.toFixed(2)}` : '0.00',
    taxRate: `${(TAX_RATE * 100).toFixed(3)}%`,
    tax: tax.toFixed(2),
    total: total.toFixed(2),
  }
}

function round(n: number): number {
  return Math.round(n * 100) / 100
}
