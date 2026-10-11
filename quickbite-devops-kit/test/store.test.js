import test from 'node:test';
import assert from 'node:assert/strict';
import { MENU, addItem, changeQuantity, cartCount, cartSubtotal, cartTotal } from '../src/store.js';

test('menu has unique item IDs and valid prices', () => {
  assert.ok(MENU.length >= 3);
  assert.equal(new Set(MENU.map(item => item.id)).size, MENU.length);
  assert.ok(MENU.every(item => item.price > 0));
});

test('adding an item creates a cart line', () => {
  assert.deepEqual(addItem([], 'burger'), [{ id: 'burger', quantity: 1 }]);
});

test('adding an existing item increases quantity', () => {
  const cart = addItem(addItem([], 'burger'), 'burger');
  assert.equal(cart[0].quantity, 2);
  assert.equal(cartCount(cart), 2);
});

test('unknown menu item is ignored', () => {
  assert.deepEqual(addItem([], 'not-a-real-item'), []);
});

test('subtotal and total are calculated correctly', () => {
  const cart = addItem(addItem([], 'burger'), 'pizza');
  assert.equal(cartSubtotal(cart), 430);
  assert.equal(cartTotal(cart, 30), 460);
  assert.equal(cartTotal([], 30), 0);
});

test('decreasing quantity removes a line at zero', () => {
  const cart = changeQuantity([{ id: 'burger', quantity: 1 }], 'burger', -1);
  assert.deepEqual(cart, []);
});

test('quantity changes accept only plus or minus one', () => {
  const cart = [{ id: 'burger', quantity: 1 }];
  assert.deepEqual(changeQuantity(cart, 'burger', 5), cart);
});
