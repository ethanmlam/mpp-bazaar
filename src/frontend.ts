export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MPP Bazaar - Food Truck</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg: #0f0f0f; --surface: #1a1a1a; --card: #222; --border: #333;
    --text: #eee; --muted: #888; --accent: #ff6b35; --accent2: #ffd23f;
    --green: #4caf50; --red: #f44336;
  }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: var(--bg); color: var(--text); min-height: 100vh; }
  header { background: var(--surface); border-bottom: 2px solid var(--accent); padding: 1.5rem 2rem; text-align: center; }
  header h1 { font-size: 2rem; color: var(--accent); }
  header p { color: var(--muted); margin-top: 0.25rem; }
  .layout { display: flex; max-width: 1200px; margin: 0 auto; gap: 1.5rem; padding: 1.5rem; }
  .menu-section { flex: 1; }
  .cart-section { width: 340px; position: sticky; top: 1.5rem; align-self: flex-start; }
  h2 { color: var(--accent2); margin-bottom: 1rem; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; }
  .category { margin-bottom: 1.5rem; }
  .category h3 { color: var(--accent); margin-bottom: 0.5rem; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid var(--border); padding-bottom: 0.25rem; }
  .menu-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; }
  .item-card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; cursor: pointer; transition: border-color 0.2s, transform 0.1s; }
  .item-card:hover { border-color: var(--accent); transform: translateY(-2px); }
  .item-card .emoji { font-size: 1.5rem; }
  .item-card .name { font-weight: 600; margin: 0.25rem 0; }
  .item-card .desc { color: var(--muted); font-size: 0.8rem; line-height: 1.3; }
  .item-card .price { color: var(--accent2); font-weight: 700; margin-top: 0.5rem; }
  .item-card .add-btn { background: var(--accent); color: #fff; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; font-size: 0.8rem; margin-top: 0.5rem; width: 100%; }
  .item-card .add-btn:hover { opacity: 0.9; }

  .cart { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 1rem; }
  .cart-empty { color: var(--muted); text-align: center; padding: 2rem 0; }
  .cart-item { display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid var(--border); }
  .cart-item:last-child { border-bottom: none; }
  .cart-item .ci-name { font-size: 0.9rem; flex: 1; }
  .cart-item .ci-controls { display: flex; align-items: center; gap: 0.4rem; }
  .cart-item .ci-controls button { background: var(--card); border: 1px solid var(--border); color: var(--text); width: 24px; height: 24px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
  .cart-item .ci-qty { font-size: 0.85rem; min-width: 20px; text-align: center; }
  .cart-item .ci-price { color: var(--accent2); font-weight: 600; margin-left: 0.5rem; font-size: 0.85rem; min-width: 50px; text-align: right; }

  .breakdown { margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid var(--border); font-size: 0.85rem; }
  .breakdown .row { display: flex; justify-content: space-between; padding: 0.15rem 0; }
  .breakdown .discount { color: var(--green); }
  .breakdown .total-row { font-weight: 700; font-size: 1.1rem; color: var(--accent2); border-top: 1px solid var(--border); padding-top: 0.5rem; margin-top: 0.25rem; }
  .order-btn { background: var(--accent); color: #fff; border: none; padding: 0.75rem; border-radius: 6px; cursor: pointer; font-size: 1rem; font-weight: 600; width: 100%; margin-top: 1rem; }
  .order-btn:hover { opacity: 0.9; }
  .order-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .feed { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem 2rem; }
  .feed h2 { margin-top: 1rem; }
  .feed-list { display: flex; flex-direction: column; gap: 0.5rem; }
  .feed-item { background: var(--card); border: 1px solid var(--border); border-radius: 6px; padding: 0.75rem 1rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; }
  .feed-item .fi-id { color: var(--accent); font-weight: 600; }
  .feed-item .fi-items { color: var(--muted); flex: 1; margin: 0 1rem; }
  .feed-item .fi-total { color: var(--accent2); font-weight: 700; }
  .feed-item .fi-time { color: var(--muted); font-size: 0.75rem; }

  .cli-hint { background: var(--surface); border: 1px solid var(--border); border-radius: 6px; padding: 1rem; margin-top: 1rem; font-size: 0.8rem; }
  .cli-hint code { background: var(--bg); padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.75rem; color: var(--accent2); }
  .cli-hint p { margin-bottom: 0.5rem; color: var(--muted); }

  @media (max-width: 768px) {
    .layout { flex-direction: column; }
    .cart-section { width: 100%; position: static; }
    .menu-grid { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>
<header>
  <h1>MPP Bazaar</h1>
  <p>Where algorithms meet appetite // Powered by Machine Payments Protocol</p>
</header>

<div class="layout">
  <div class="menu-section">
    <h2>Menu</h2>
    <div id="menu-container">Loading...</div>
  </div>
  <div class="cart-section">
    <div class="cart">
      <h2>Cart</h2>
      <div id="cart-items"><div class="cart-empty">Nothing here yet</div></div>
      <div id="breakdown" style="display:none"></div>
      <button class="order-btn" id="order-btn" disabled onclick="previewOrder()">Preview Total</button>
      <div class="cli-hint">
        <p>Agents pay via CLI:</p>
        <code>npx mppx POST /api/order -d '{"items":[...]}'</code>
      </div>
    </div>
  </div>
</div>

<div class="feed">
  <h2>Live Orders</h2>
  <div id="feed-list" class="feed-list"><div class="cart-empty">No orders yet</div></div>
</div>

<script>
const cart = {}; // { id: qty }
let menuData = [];

async function loadMenu() {
  const res = await fetch('/api/menu');
  const data = await res.json();
  menuData = data.items;
  renderMenu(data.items);
}

function renderMenu(items) {
  const groups = {};
  items.forEach(i => { (groups[i.category] = groups[i.category] || []).push(i); });
  const order = ['mains','sides','drinks','dessert'];
  const labels = { mains: 'Mains', sides: 'Sides', drinks: 'Drinks', dessert: 'Dessert' };
  let h = '';
  for (const cat of order) {
    if (!groups[cat]) continue;
    h += '<div class="category"><h3>' + labels[cat] + '</h3><div class="menu-grid">';
    for (const item of groups[cat]) {
      h += '<div class="item-card">'
        + '<span class="emoji">' + item.emoji + '</span>'
        + '<div class="name">' + item.name + '</div>'
        + '<div class="desc">' + item.description + '</div>'
        + '<div class="price">$' + item.price.toFixed(2) + '</div>'
        + '<button class="add-btn" onclick="addToCart(\\'' + item.id + '\\')">Add to Cart</button>'
        + '</div>';
    }
    h += '</div></div>';
  }
  document.getElementById('menu-container').innerHTML = h;
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function changeQty(id, delta) {
  cart[id] = (cart[id] || 0) + delta;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function renderCart() {
  const ids = Object.keys(cart);
  const btn = document.getElementById('order-btn');
  if (!ids.length) {
    document.getElementById('cart-items').innerHTML = '<div class="cart-empty">Nothing here yet</div>';
    document.getElementById('breakdown').style.display = 'none';
    btn.disabled = true;
    return;
  }
  btn.disabled = false;
  let h = '';
  for (const id of ids) {
    const item = menuData.find(i => i.id === id);
    if (!item) continue;
    h += '<div class="cart-item">'
      + '<span class="ci-name">' + item.emoji + ' ' + item.name + '</span>'
      + '<span class="ci-controls">'
      + '<button onclick="changeQty(\\'' + id + '\\',-1)">-</button>'
      + '<span class="ci-qty">' + cart[id] + '</span>'
      + '<button onclick="changeQty(\\'' + id + '\\',1)">+</button>'
      + '</span>'
      + '<span class="ci-price">$' + (item.price * cart[id]).toFixed(2) + '</span>'
      + '</div>';
  }
  document.getElementById('cart-items').innerHTML = h;
  document.getElementById('breakdown').style.display = 'none';
}

async function previewOrder() {
  const items = Object.entries(cart).map(([id, qty]) => ({ id, qty }));
  if (!items.length) return;
  const btn = document.getElementById('order-btn');
  btn.textContent = 'Computing...';
  btn.disabled = true;
  try {
    const res = await fetch('/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    const data = await res.json();
    if (data.error) { alert(data.error); return; }
    const b = data.breakdown;
    let h = '<div class="breakdown">';
    h += '<div class="row"><span>Subtotal</span><span>$' + b.subtotal + '</span></div>';
    if (b.comboDiscount !== '0.00') h += '<div class="row discount"><span>Combo Discount</span><span>-$' + b.comboDiscount.replace('-','') + '</span></div>';
    if (b.bulkDiscount !== '0.00') h += '<div class="row discount"><span>Bulk Discount</span><span>-$' + b.bulkDiscount.replace('-','') + '</span></div>';
    h += '<div class="row"><span>Tax (' + b.taxRate + ')</span><span>$' + b.tax + '</span></div>';
    h += '<div class="row total-row"><span>Total</span><span>$' + b.total + '</span></div>';
    h += '</div>';
    document.getElementById('breakdown').innerHTML = h;
    document.getElementById('breakdown').style.display = 'block';
  } catch (e) { alert('Error: ' + e.message); }
  finally { btn.textContent = 'Preview Total'; btn.disabled = false; }
}

async function loadFeed() {
  try {
    const res = await fetch('/api/orders/recent');
    const data = await res.json();
    if (!data.orders.length) return;
    let h = '';
    for (const o of data.orders) {
      const names = o.items.map(i => i.name).join(', ');
      const time = new Date(o.createdAt).toLocaleTimeString();
      h += '<div class="feed-item">'
        + '<span class="fi-id">' + o.id + '</span>'
        + '<span class="fi-items">' + names + '</span>'
        + '<span class="fi-total">$' + o.breakdown.total + '</span>'
        + '<span class="fi-time">' + time + '</span>'
        + '</div>';
    }
    document.getElementById('feed-list').innerHTML = h;
  } catch {}
}

loadMenu();
loadFeed();
setInterval(loadFeed, 5000);
</script>
</body>
</html>`;
