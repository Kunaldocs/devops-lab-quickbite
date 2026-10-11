import { MENU, cartSubtotal, cartCount, cartTotal, addItem, changeQuantity } from './store.js';

const money = amount => `₹${amount}`;
const menuGrid = document.querySelector('#menu-grid');
const cartItems = document.querySelector('#cart-items');
const count = document.querySelector('#cart-count');
const subtotal = document.querySelector('#subtotal');
const delivery = document.querySelector('#delivery');
const total = document.querySelector('#total');
const message = document.querySelector('#checkout-message');

let cart = [];

function renderMenu() {
  menuGrid.innerHTML = MENU.map(item => `
    <article class="food-card">
      <div class="food-art" aria-hidden="true">${item.emoji}</div>
      <div class="food-body">
        <div class="food-top"><h3>${item.name}</h3><span class="price">${money(item.price)}</span></div>
        <p>${item.description}</p>
        <button class="add-button" data-add="${item.id}">Add to cart +</button>
      </div>
    </article>`).join('');
}

function renderCart() {
  count.textContent = cartCount(cart);
  subtotal.textContent = money(cartSubtotal(cart));
  const fee = cart.length ? 30 : 0;
  delivery.textContent = money(fee);
  total.textContent = money(cartTotal(cart, fee));
  if (!cart.length) {
    cartItems.innerHTML = '<p class="empty-state">Your cart is empty. Add something tasty from the menu.</p>';
    return;
  }
  cartItems.innerHTML = cart.map(line => {
    const item = MENU.find(product => product.id === line.id);
    return `<div class="cart-row">
      <span class="cart-emoji">${item.emoji}</span>
      <div class="cart-info"><strong>${item.name}</strong><small>${money(item.price)} each</small></div>
      <div class="quantity">
        <button data-change="${item.id}" data-delta="-1" aria-label="Remove one ${item.name}">−</button>
        <span>${line.quantity}</span>
        <button data-change="${item.id}" data-delta="1" aria-label="Add one ${item.name}">+</button>
      </div>
    </div>`;
  }).join('');
}

menuGrid.addEventListener('click', event => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  cart = addItem(cart, button.dataset.add);
  message.textContent = '';
  renderCart();
});
cartItems.addEventListener('click', event => {
  const button = event.target.closest('[data-change]');
  if (!button) return;
  cart = changeQuantity(cart, button.dataset.change, Number(button.dataset.delta));
  renderCart();
});
document.querySelector('#checkout').addEventListener('click', () => {
  if (!cart.length) {
    message.textContent = 'Your cart is empty. Add an item before checkout.';
    return;
  }
  const orderId = `QB-${String(Date.now()).slice(-6)}`;
  message.textContent = `Demo order ${orderId} confirmed! Total: ${total.textContent}. No payment was collected.`;
  cart = [];
  renderCart();
});
renderMenu();
renderCart();
