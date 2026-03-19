// Menu items for MPP Bazaar food truck

export type Category = 'mains' | 'sides' | 'drinks' | 'dessert'

export interface MenuItem {
  id: string
  name: string
  price: number // USD
  category: Category
  description: string
  emoji: string
}

export const menu: MenuItem[] = [
  // Mains
  { id: 'quantum-burrito',   name: 'Quantum Burrito',      price: 12.50, category: 'mains',   emoji: '🌯', description: 'Exists in a superposition of delicious flavors until you bite' },
  { id: 'neural-noodles',    name: 'Neural Noodles',        price: 10.00, category: 'mains',   emoji: '🍜', description: 'Stir-fried noodles trained on 10,000 grandma recipes' },
  { id: 'binary-burger',     name: 'Binary Burger',         price: 14.00, category: 'mains',   emoji: '🍔', description: 'Two patties. No middle ground. It\'s a 1 or a 0.' },
  { id: 'pixel-pizza',       name: 'Pixel Pizza Slice',     price: 6.00,  category: 'mains',   emoji: '🍕', description: 'One perfectly rendered slice at native resolution' },
  { id: 'algo-tacos',        name: 'Algo Tacos (3-pack)',   price: 11.00, category: 'mains',   emoji: '🌮', description: 'Optimally sorted fillings with O(1) crunch time' },
  // Sides
  { id: 'hash-browns',       name: 'Hash Browns',           price: 4.50,  category: 'sides',   emoji: '🥔', description: 'SHA-256 shredded and golden fried' },
  { id: 'stack-fries',       name: 'Stack Overflow Fries',  price: 5.00,  category: 'sides',   emoji: '🍟', description: 'Piled high. May cause stack overflow.' },
  { id: 'recursive-rings',   name: 'Recursive Onion Rings', price: 6.50,  category: 'sides',   emoji: '🧅', description: 'Rings within rings within rings...' },
  // Drinks
  { id: 'sudo-soda',         name: 'Sudo Soda',             price: 3.00,  category: 'drinks',  emoji: '🥤', description: 'Permission granted to refresh' },
  { id: 'kernel-kombucha',   name: 'Kernel Kombucha',       price: 5.50,  category: 'drinks',  emoji: '🍵', description: 'Fermented at ring 0 for maximum probiotics' },
  { id: 'null-espresso',     name: 'Null Pointer Espresso', price: 4.00,  category: 'drinks',  emoji: '☕', description: 'Segfault-inducingly strong. Handle with care.' },
  // Dessert
  { id: 'cookie-cache',      name: 'Cookie Cache',          price: 3.50,  category: 'dessert', emoji: '🍪', description: 'Warm cookies stored locally for instant access' },
]

export function getMenuItem(id: string): MenuItem | undefined {
  return menu.find(item => item.id === id)
}
