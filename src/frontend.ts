export const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MPP Bazaar - Food Truck</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg: #f5f5f5;
    --surface: #ffffff;
    --card: #ffffff;
    --border: #e8e8e8;
    --text: #1a1a1a;
    --muted: #767676;
    --accent: #eb1700;
    --accent-hover: #c91400;
    --green: #1c8a1c;
    --shadow-sm: 0 1px 4px rgba(0,0,0,0.08);
    --shadow-md: 0 2px 12px rgba(0,0,0,0.10);
    --shadow-lg: 0 4px 24px rgba(0,0,0,0.12);
    --radius: 14px;
    --radius-sm: 8px;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
  }

  /* ── Header ── */
  header {
    background: var(--surface);
    box-shadow: var(--shadow-sm);
    padding: 0 2rem;
    height: 64px;
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .header-inner {
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .brand-logo {
    background: var(--accent);
    color: #fff;
    font-weight: 800;
    font-size: 1rem;
    padding: 0.25rem 0.55rem;
    border-radius: 6px;
    letter-spacing: -0.5px;
  }
  .brand-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.3px;
  }
  .header-sub {
    font-size: 0.78rem;
    color: var(--muted);
  }

  /* ── Layout ── */
  .layout {
    display: flex;
    max-width: 1280px;
    margin: 0 auto;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
    align-items: flex-start;
  }
  .menu-section { flex: 1; min-width: 0; }
  .cart-section {
    width: 360px;
    flex-shrink: 0;
    position: sticky;
    top: 80px;
    align-self: flex-start;
  }

  /* ── Section headers ── */
  .section-title {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 1.25rem;
    letter-spacing: -0.4px;
  }
  .category { margin-bottom: 2rem; }
  .category-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 1rem;
    padding-bottom: 0.6rem;
    border-bottom: 2px solid var(--border);
    letter-spacing: -0.2px;
  }

  /* ── Menu grid ── */
  .menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  .item-card {
    background: var(--card);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 0.18s, transform 0.14s;
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
  }
  .item-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-3px);
    border-color: var(--border);
  }
  .item-emoji-area {
    background: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 110px;
    font-size: 3rem;
    flex-shrink: 0;
  }
  .item-body {
    padding: 0.85rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .item-card .name {
    font-weight: 700;
    font-size: 0.95rem;
    color: var(--text);
    margin-bottom: 0.3rem;
    letter-spacing: -0.1px;
  }
  .item-card .desc {
    color: var(--muted);
    font-size: 0.78rem;
    line-height: 1.45;
    flex: 1;
  }
  .item-card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.75rem;
  }
  .item-card .price {
    font-weight: 700;
    font-size: 1rem;
    color: var(--text);
  }
  .add-btn {
    background: var(--accent);
    color: #fff;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.25rem;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    transition: background 0.15s, transform 0.1s;
    flex-shrink: 0;
  }
  .add-btn:hover { background: var(--accent-hover); transform: scale(1.08); }
  .add-btn:active { transform: scale(0.96); }

  /* ── Cart ── */
  .cart {
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
    padding: 1.25rem;
    border: 1px solid var(--border);
  }
  .cart-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: var(--text);
    margin-bottom: 1rem;
    letter-spacing: -0.3px;
  }
  .cart-empty {
    color: var(--muted);
    text-align: center;
    padding: 2rem 0;
    font-size: 0.9rem;
  }
  .cart-item {
    display: flex;
    align-items: center;
    padding: 0.65rem 0;
    border-bottom: 1px solid var(--border);
    gap: 0.5rem;
  }
  .cart-item:last-child { border-bottom: none; }
  .cart-item .ci-name {
    font-size: 0.88rem;
    font-weight: 500;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .cart-item .ci-controls {
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 999px;
    padding: 2px;
    gap: 0;
    flex-shrink: 0;
  }
  .cart-item .ci-controls button {
    background: transparent;
    border: none;
    color: var(--text);
    width: 26px;
    height: 26px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.12s;
    line-height: 1;
  }
  .cart-item .ci-controls button:hover { background: #e0e0e0; }
  .cart-item .ci-qty {
    font-size: 0.85rem;
    font-weight: 700;
    min-width: 22px;
    text-align: center;
  }
  .cart-item .ci-price {
    color: var(--text);
    font-weight: 700;
    font-size: 0.88rem;
    min-width: 48px;
    text-align: right;
    flex-shrink: 0;
  }

  /* ── Breakdown ── */
  .breakdown {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid var(--border);
    font-size: 0.85rem;
  }
  .breakdown .row {
    display: flex;
    justify-content: space-between;
    padding: 0.22rem 0;
    color: var(--muted);
  }
  .breakdown .discount { color: var(--green); font-weight: 600; }
  .breakdown .total-row {
    font-weight: 800;
    font-size: 1.05rem;
    color: var(--text);
    border-top: 1px solid var(--border);
    padding-top: 0.6rem;
    margin-top: 0.3rem;
  }

  /* ── Order button ── */
  .order-btn {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 0.9rem 1rem;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.98rem;
    font-weight: 700;
    width: 100%;
    margin-top: 1rem;
    letter-spacing: 0.1px;
    transition: background 0.15s, transform 0.1s;
  }
  .order-btn:hover:not(:disabled) { background: var(--accent-hover); transform: translateY(-1px); }
  .order-btn:active:not(:disabled) { transform: translateY(0); }
  .order-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── CLI hint ── */
  .cli-hint {
    background: #f9f9f9;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.85rem 1rem;
    margin-top: 1rem;
    font-size: 0.78rem;
  }
  .cli-hint p { margin-bottom: 0.4rem; color: var(--muted); }
  .cli-hint code {
    background: #efefef;
    padding: 0.2rem 0.45rem;
    border-radius: 4px;
    font-size: 0.73rem;
    color: #333;
    word-break: break-all;
    display: block;
    line-height: 1.5;
  }

  /* ── Live orders feed ── */
  .feed {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem 3rem;
  }
  .feed-list { display: flex; flex-direction: column; }
  .feed-item {
    background: var(--surface);
    border-radius: var(--radius-sm);
    padding: 0.9rem 1.1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.85rem;
    border-bottom: 1px solid var(--border);
    transition: background 0.12s;
  }
  .feed-item:first-child { border-radius: var(--radius-sm) var(--radius-sm) 0 0; }
  .feed-item:last-child { border-bottom: none; border-radius: 0 0 var(--radius-sm) var(--radius-sm); }
  .feed-item:only-child { border-radius: var(--radius-sm); }
  .feed-item:hover { background: #fafafa; }
  .feed-wrapper {
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border);
    overflow: hidden;
  }
  .feed-item .fi-id {
    color: var(--accent);
    font-weight: 700;
    flex-shrink: 0;
    font-size: 0.78rem;
    background: #fff0ef;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }
  .feed-item .fi-items {
    color: var(--muted);
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .feed-item .fi-total {
    color: var(--text);
    font-weight: 800;
    flex-shrink: 0;
  }
  .feed-item .fi-time {
    color: var(--muted);
    font-size: 0.75rem;
    flex-shrink: 0;
  }

  /* ── Loading state ── */
  #menu-container { min-height: 200px; }

  /* ── 402 Modal ── */
  .modal-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }
  .modal-overlay.open { display: flex; }
  .modal-card {
    background: var(--surface);
    border-radius: var(--radius);
    box-shadow: 0 8px 48px rgba(0,0,0,0.22);
    padding: 2rem;
    max-width: 560px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }
  .modal-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .badge-402 {
    background: var(--accent);
    color: #fff;
    font-weight: 800;
    font-size: 0.85rem;
    padding: 0.3rem 0.7rem;
    border-radius: 6px;
    letter-spacing: 0.5px;
    flex-shrink: 0;
  }
  .modal-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: var(--text);
    letter-spacing: -0.3px;
  }
  .modal-section {
    margin-bottom: 1.25rem;
  }
  .modal-section-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--muted);
    margin-bottom: 0.4rem;
  }
  .modal-amount {
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', monospace;
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--text);
  }
  .modal-amount-note {
    font-size: 0.75rem;
    color: var(--muted);
    margin-top: 0.2rem;
  }
  .modal-detail-row {
    display: flex;
    justify-content: space-between;
    padding: 0.3rem 0;
    font-size: 0.85rem;
    border-bottom: 1px solid var(--border);
  }
  .modal-detail-row:last-child { border-bottom: none; }
  .modal-detail-label { color: var(--muted); }
  .modal-detail-value { font-weight: 600; color: var(--text); font-family: 'SF Mono', 'Fira Code', monospace; font-size: 0.8rem; }
  .modal-note {
    background: #fffbe6;
    border: 1px solid #ffe58f;
    border-radius: var(--radius-sm);
    padding: 0.75rem 1rem;
    font-size: 0.82rem;
    color: #7a5c00;
    line-height: 1.5;
  }
  .modal-cli {
    background: #f4f4f4;
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 0.75rem 1rem;
  }
  .modal-cli p { font-size: 0.78rem; color: var(--muted); margin-bottom: 0.4rem; }
  .modal-cli code {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.72rem;
    color: #333;
    word-break: break-all;
    white-space: pre-wrap;
    display: block;
    line-height: 1.55;
  }
  .modal-close-btn {
    background: var(--accent);
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 700;
    margin-top: 1.25rem;
    transition: background 0.15s;
  }
  .modal-close-btn:hover { background: var(--accent-hover); }

  /* ── Pay button ── */
  .modal-pay-btn {
    background: var(--green);
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 700;
    margin-top: 1.25rem;
    margin-right: 0.5rem;
    transition: background 0.15s, opacity 0.15s;
  }
  .modal-pay-btn:hover:not(:disabled) { background: #157a15; }
  .modal-pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .pay-status {
    font-size: 0.82rem;
    color: var(--muted);
    margin-top: 0.75rem;
    min-height: 1.2em;
  }

  /* ── Success state ── */
  .success-banner {
    background: #eafbe7;
    border: 1px solid #b7eb8f;
    border-radius: var(--radius-sm);
    padding: 1.25rem;
    text-align: center;
  }
  .success-banner .check { font-size: 2.5rem; margin-bottom: 0.5rem; }
  .success-banner .order-id { font-size: 1.1rem; font-weight: 800; color: var(--text); }
  .success-banner .tx-hash {
    font-family: 'SF Mono', 'Fira Code', monospace;
    font-size: 0.72rem;
    color: var(--muted);
    word-break: break-all;
    margin-top: 0.5rem;
  }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .layout { flex-direction: column; padding: 1.25rem 1rem; }
    .cart-section { width: 100%; position: static; }
  }
  @media (max-width: 600px) {
    .menu-grid { grid-template-columns: repeat(auto-fill, minmax(155px, 1fr)); gap: 0.75rem; }
    header { padding: 0 1rem; }
    .layout, .feed { padding-left: 1rem; padding-right: 1rem; }
    .item-emoji-area { height: 90px; font-size: 2.5rem; }
  }
</style>
</head>
<body>

<header>
  <div class="header-inner">
    <div class="brand">
      <span class="brand-logo">MPP</span>
      <span class="brand-name">Bazaar</span>
    </div>
    <span class="header-sub">Where algorithms meet appetite</span>
  </div>
</header>

<div class="layout">
  <div class="menu-section">
    <div class="section-title">Menu</div>
    <div id="menu-container">Loading...</div>
  </div>
  <div class="cart-section">
    <div class="cart">
      <div class="cart-title">Your Cart</div>
      <div id="cart-items"><div class="cart-empty">Nothing here yet</div></div>
      <div id="breakdown" style="display:none"></div>
      <button class="order-btn" id="order-btn" disabled onclick="previewOrder()">Preview Total</button>
      <button class="order-btn" id="place-btn" style="display:none;margin-top:0.5rem" onclick="placeOrder()">Place Order →</button>
      <div class="cli-hint" id="cli-hint">
        <p>Agents pay via CLI:</p>
        <code>tempo request -X POST --json '{"items":[...]}' http://localhost:8787/api/order</code>
      </div>
    </div>
  </div>
</div>

<div class="feed">
  <div class="section-title">Live Orders</div>
  <div class="feed-wrapper">
    <div id="feed-list" class="feed-list"><div class="feed-item" style="justify-content:center;color:var(--muted)">No orders yet</div></div>
  </div>
</div>

<!-- 402 Challenge Modal -->
<div class="modal-overlay" id="modal-overlay" onclick="closeModal(event)">
  <div class="modal-card" id="modal-card">
    <div class="modal-header">
      <span class="badge-402">402</span>
      <span class="modal-title">Payment Required</span>
    </div>
    <div id="modal-body"></div>
    <div id="pay-status" class="pay-status"></div>
    <div style="display:flex;align-items:center">
      <button class="modal-pay-btn" id="modal-pay-btn" onclick="payFromBrowser()" style="display:none">Pay Now</button>
      <button class="modal-close-btn" onclick="document.getElementById('modal-overlay').classList.remove('open')">Close</button>
    </div>
  </div>
</div>

<script src="/client.js"></script>
<script>
const cart = {}; // { id: qty }
let menuData = [];
let tempoKey = null;

// Load testnet key from server config
fetch('/api/config').then(r => r.json()).then(cfg => {
  tempoKey = cfg.tempoKey;
}).catch(() => {});

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
    h += '<div class="category"><div class="category-title">' + labels[cat] + '</div><div class="menu-grid">';
    for (const item of groups[cat]) {
      h += '<div class="item-card">'
        + '<div class="item-emoji-area">' + item.emoji + '</div>'
        + '<div class="item-body">'
        + '<div class="name">' + item.name + '</div>'
        + '<div class="desc">' + item.description + '</div>'
        + '<div class="item-card-footer">'
        + '<div class="price">$' + item.price.toFixed(2) + '</div>'
        + '<button class="add-btn" onclick="addToCart(\\'' + item.id + '\\')">+</button>'
        + '</div>'
        + '</div>'
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
  const placeBtn = document.getElementById('place-btn');
  if (!ids.length) {
    document.getElementById('cart-items').innerHTML = '<div class="cart-empty">Nothing here yet</div>';
    document.getElementById('breakdown').style.display = 'none';
    placeBtn.style.display = 'none';
    btn.disabled = true;
    var hint = document.getElementById('cli-hint');
    if (hint) hint.innerHTML = '<p>Agents pay via CLI:</p><code>tempo request -X POST --json ' + "'" + '{"items":[...]}' + "'" + ' http://localhost:8787/api/order</code>';
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
      + '<button onclick="changeQty(\\'' + id + '\\',-1)">−</button>'
      + '<span class="ci-qty">' + cart[id] + '</span>'
      + '<button onclick="changeQty(\\'' + id + '\\',1)">+</button>'
      + '</span>'
      + '<span class="ci-price">$' + (item.price * cart[id]).toFixed(2) + '</span>'
      + '</div>';
  }
  document.getElementById('cart-items').innerHTML = h;
  document.getElementById('breakdown').style.display = 'none';
  placeBtn.style.display = 'none';

  // Update CLI hint with current cart
  const cartItems = Object.entries(cart).map(function(e) { return {id: e[0], qty: e[1]}; });
  var cliHint = document.getElementById('cli-hint');
  if (cliHint) {
    cliHint.innerHTML = '<p>Agents pay via CLI:</p><code>' + "tempo request -X POST --json '" + JSON.stringify({items: cartItems}) + "' http://localhost:8787/api/order" + '</code>';
  }
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
    document.getElementById('place-btn').style.display = 'block';
  } catch (e) { alert('Error: ' + e.message); }
  finally { btn.textContent = 'Preview Total'; btn.disabled = false; }
}

function closeModal(event) {
  const overlay = document.getElementById('modal-overlay');
  if (event.target === overlay) overlay.classList.remove('open');
}

async function placeOrder() {
  const items = Object.entries(cart).map(([id, qty]) => ({ id, qty }));
  if (!items.length) return;
  const placeBtn = document.getElementById('place-btn');
  placeBtn.textContent = 'Placing...';
  placeBtn.disabled = true;
  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });

    let challenge = null;
    let bodyText = '';
    try { bodyText = await res.text(); } catch {}

    if (res.status === 402) {
      const wwwAuth = res.headers.get('WWW-Authenticate');
      if (wwwAuth) {
        try {
          challenge = JSON.parse(atob(wwwAuth.replace('MPP ', '')));
        } catch {}
      }
    }

    const itemsJson = JSON.stringify({ items });
    const cliCmd = "tempo request -X POST --json '" + itemsJson + "' http://localhost:8787/api/order";

    let bodyHtml = '';

    if (challenge && challenge.request) {
      const req = challenge.request;
      bodyHtml += '<div class="modal-section">';
      bodyHtml += '<div class="modal-section-label">Dynamic Amount (server-computed)</div>';
      bodyHtml += '<div class="modal-amount">' + req.amount + ' ' + (req.currency || '') + '</div>';
      bodyHtml += '<div class="modal-amount-note">Demo mode: charged at 1/100th of the menu total. Full price would be $' + (parseFloat(req.amount) * 100).toFixed(2) + '.</div>';
      bodyHtml += '</div>';

      bodyHtml += '<div class="modal-section">';
      bodyHtml += '<div class="modal-section-label">Payment Details</div>';
      bodyHtml += '<div class="modal-detail-row"><span class="modal-detail-label">Method</span><span class="modal-detail-value">' + (challenge.method || req.method || '-') + '</span></div>';
      bodyHtml += '<div class="modal-detail-row"><span class="modal-detail-label">Recipient</span><span class="modal-detail-value">' + (req.recipient || '-') + '</span></div>';
      bodyHtml += '<div class="modal-detail-row"><span class="modal-detail-label">Currency</span><span class="modal-detail-value">' + (req.currency || '-') + '</span></div>';
      if (req.description) {
        bodyHtml += '<div class="modal-detail-row"><span class="modal-detail-label">Description</span><span class="modal-detail-value">' + req.description + '</span></div>';
      }
      if (challenge.realm) {
        bodyHtml += '<div class="modal-detail-row"><span class="modal-detail-label">Realm</span><span class="modal-detail-value">' + challenge.realm + '</span></div>';
      }
      bodyHtml += '</div>';
    } else {
      bodyHtml += '<div class="modal-section">';
      bodyHtml += '<div class="modal-section-label">Response</div>';
      bodyHtml += '<div class="modal-detail-row"><span class="modal-detail-label">Status</span><span class="modal-detail-value">' + res.status + '</span></div>';
      if (bodyText) bodyHtml += '<div class="modal-detail-row"><span class="modal-detail-label">Body</span><span class="modal-detail-value">' + bodyText.substring(0, 200) + '</span></div>';
      bodyHtml += '</div>';
    }

    bodyHtml += '<div class="modal-section">';
    bodyHtml += '<div class="modal-note">This amount was computed server-side based on your specific order (combos, bulk discounts, tax). An agent with an MPP wallet would automatically pay this challenge and receive the order confirmation.</div>';
    bodyHtml += '</div>';

    bodyHtml += '<div class="modal-section">';
    bodyHtml += '<div class="modal-cli"><p>Complete this order via CLI:</p><code id="cli-cmd-code">' + cliCmd + '</code></div>';
    bodyHtml += '</div>';

    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('pay-status').textContent = '';
    const payBtn = document.getElementById('modal-pay-btn');
    payBtn.style.display = 'inline-block';
    payBtn.disabled = false;
    payBtn.textContent = 'Pay Now';
    document.getElementById('modal-overlay').classList.add('open');
  } catch (e) {
    alert('Error: ' + e.message);
  } finally {
    placeBtn.textContent = 'Place Order →';
    placeBtn.disabled = false;
  }
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

async function payFromBrowser() {
  const items = Object.entries(cart).map(([id, qty]) => ({ id, qty }));
  if (!items.length) return;

  const payBtn = document.getElementById('modal-pay-btn');
  const status = document.getElementById('pay-status');
  payBtn.disabled = true;
  payBtn.textContent = 'Paying...';

  try {
    status.textContent = 'Sending payment via tempo request...';
    const proxyRes = await fetch('http://localhost:8788', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    if (!proxyRes.ok) {
      const err = await proxyRes.json().catch(() => ({ error: 'Payment failed' }));
      throw new Error(err.error || 'Payment failed');
    }
    const result = await proxyRes.json();

    // Success — replace modal content
    document.getElementById('modal-body').innerHTML =
      '<div class="success-banner">'
      + '<div class="check">&#10003;</div>'
      + '<div class="order-id">Order ' + result.orderId + ' confirmed!</div>'
      + '<div style="margin-top:0.75rem;font-size:0.88rem;color:var(--muted)">'
      + result.items.map(function(i) { return i.qty + 'x ' + i.name; }).join(', ')
      + ' &mdash; $' + result.breakdown.total
      + '</div>'
      + (result.txHash ? '<div class="tx-hash" style="margin-top:0.5rem">Tx: ' + result.txHash.substring(0, 10) + '...' + result.txHash.substring(result.txHash.length - 6) + '</div>' : '')
      + (result.txHash ? '<div style="margin-top:0.75rem"><a href="https://explore.tempo.xyz/receipt/' + result.txHash + '" target="_blank" rel="noopener" style="color:var(--accent);font-weight:600;font-size:0.85rem">View transaction on Tempo Explorer &rarr;</a></div>' : '')
      + '</div>';
    document.querySelector('.modal-header .badge-402').textContent = '200';
    document.querySelector('.modal-header .badge-402').style.background = 'var(--green)';
    document.querySelector('.modal-title').textContent = 'Order Confirmed';
    payBtn.style.display = 'none';
    status.textContent = '';

    // Clear cart and refresh feed
    Object.keys(cart).forEach(function(k) { delete cart[k]; });
    renderCart();
    loadFeed();
  } catch (e) {
    status.textContent = 'Error: ' + e.message;
    payBtn.disabled = false;
    payBtn.textContent = 'Retry Payment';
  }
}

loadMenu();
loadFeed();
setInterval(loadFeed, 5000);
</script>
</body>
</html>`;
