export const MENU = [
  { id: 'burger', name: 'Classic Burger', price: 180, emoji: '🍔', description: 'Grilled patty, fresh lettuce, and house sauce.' },
  { id: 'pizza', name: 'Margherita Pizza', price: 250, emoji: '🍕', description: 'Tomato, mozzarella, and fragrant basil.' },
  { id: 'salad', name: 'Garden Salad', price: 140, emoji: '🥗', description: 'Crunchy greens with a bright lemon dressing.' },
  { id: 'noodles', name: 'Veg Noodles', price: 160, emoji: '🍜', description: 'Wok-tossed noodles with colourful vegetables.' },
  { id: 'taco', name: 'Crispy Tacos', price: 190, emoji: '🌮', description: 'Crispy shells with a savoury, spicy filling.' },
  { id: 'dessert', name: 'Chocolate Treat', price: 110, emoji: '🍰', description: 'A little chocolate dessert to finish your meal.' }
];

export function cartCount(cart) {
  return cart.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartSubtotal(cart) {
  return cart.reduce((sum, line) => {
    const item = MENU.find(product => product.id === line.id);
    return sum + (item ? item.price * line.quantity : 0);
  }, 0);
}

export function cartTotal(cart, deliveryFee = 0) {
  return cartSubtotal(cart) + (cart.length ? deliveryFee : 0);
}

export function addItem(cart, id) {
  if (!MENU.some(item => item.id === id)) return cart;
  const existing = cart.find(line => line.id === id);
  if (existing) return cart.map(line => line.id === id ? { ...line, quantity: line.quantity + 1 } : line);
  return [...cart, { id, quantity: 1 }];
}

export function changeQuantity(cart, id, delta) {
  if (![-1, 1].includes(delta)) return cart;
  return cart
    .map(line => line.id === id ? { ...line, quantity: line.quantity + delta } : line)
    .filter(line => line.quantity > 0);
}
