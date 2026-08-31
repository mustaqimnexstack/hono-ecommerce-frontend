'use client';

import Link from 'next/link';
import { useCart } from '@/store/cart';
import { money } from '@/lib/api';

export default function Cart() {
  const { items, setQuantity, remove } = useCart();
  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  if (!items.length) return <main className="page"><div className="empty-state"><h2>Your cart is empty</h2><p>Add something useful from the collection when you’re ready.</p><Link className="button" href="/products">Browse products</Link></div></main>;

  return <main className="page"><div className="page-heading"><div><p className="eyebrow">Your selection</p><h1>Shopping cart</h1><p>{items.reduce((sum, item) => sum + item.quantity, 0)} items ready for checkout.</p></div></div><div className="table-wrap"><table><thead><tr><th>Product</th><th>Quantity</th><th>Total</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{items.map((item) => <tr key={item.productId}><td><strong>{item.name}</strong></td><td><input className="quantity-input" aria-label={`Quantity for ${item.name}`} type="number" min="1" value={item.quantity} onChange={(event) => setQuantity(item.productId, Math.max(1, Number(event.target.value) || 1))} /></td><td>{money(item.priceCents * item.quantity)}</td><td><button onClick={() => remove(item.productId)}>Remove</button></td></tr>)}</tbody></table></div><div className="space"><div><p className="eyebrow">Order total</p><h2>{money(total)}</h2></div><Link className="button" href="/checkout">Continue to checkout</Link></div></main>;
}
