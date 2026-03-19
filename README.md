# MPP Bazaar 🌯

A food truck ordering API where **AI agents browse, build a cart, and pay dynamic totals** using the [Machine Payments Protocol](https://mpp.dev).

## Why This Matters

x402 only supports static pricing — every request costs the same. Real commerce needs **dynamic, computed totals**: combo discounts, bulk pricing, tax calculations. MPP Bazaar demonstrates this with a fun food truck API.

```
Agent: "I want 2 Quantum Burritos + Stack Overflow Fries + Sudo Soda"
Server: "That's $33.00 - $4.50 combo discount + $2.53 tax = $31.03"
Agent: *pays exactly $31.03 via Tempo*
Server: "Order ORD-1001 confirmed!"
```

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:8787 for the UI
```

## Test with mppx CLI

```bash
# Create a testnet wallet
npx mppx account create

# Place an order (agent-style)
npx mppx http://localhost:8787/api/order \
  -X POST \
  -d '{"items":[{"id":"quantum-burrito","qty":1},{"id":"stack-fries","qty":1},{"id":"sudo-soda","qty":1}]}'
```

## Deploy

```bash
npx wrangler deploy
```

## API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/menu` | None | Full menu with prices |
| POST | `/api/preview` | None | Price breakdown without payment |
| POST | `/api/order` | MPP | Place order, pay dynamic total |
| GET | `/api/orders/recent` | None | Last 10 orders |

## Pricing Engine

The server computes every total dynamically:

- **Combo discount (15%):** Order a Main + Side + Drink together
- **Bulk discount (10%):** Any item with qty >= 3
- **SF Tax (8.875%):** Applied after discounts

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Agent/CLI  │────>│  Hono API    │────>│  Pricing    │
│  (mppx)     │<────│  + MPP/Tempo │<────│  Engine     │
└─────────────┘     └──────────────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │  Frontend   │
                    │  (vanilla)  │
                    └─────────────┘
```

## Stack

- **Runtime:** Cloudflare Workers
- **Framework:** Hono
- **Payments:** mppx + Tempo (pathUSD)
- **Frontend:** Vanilla HTML/CSS/JS (no frameworks)

## Menu

| Item | Price | Category |
|------|-------|----------|
| Quantum Burrito | $12.50 | Main |
| Neural Noodles | $10.00 | Main |
| Binary Burger | $14.00 | Main |
| Pixel Pizza Slice | $6.00 | Main |
| Algo Tacos (3-pack) | $11.00 | Main |
| Hash Browns | $4.50 | Side |
| Stack Overflow Fries | $5.00 | Side |
| Recursive Onion Rings | $6.50 | Side |
| Sudo Soda | $3.00 | Drink |
| Kernel Kombucha | $5.50 | Drink |
| Null Pointer Espresso | $4.00 | Drink |
| Cookie Cache | $3.50 | Dessert |

## License

MIT
