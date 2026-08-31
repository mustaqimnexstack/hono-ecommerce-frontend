'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, money } from '@/lib/api';
import { useCart } from '@/store/cart';

export default function Checkout() {
  const items = useCart((state) => state.items);
  const clear = useCart((state) => state.clear);
  const router = useRouter();
  const [error, setError] = useState('');
  const total = items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);

    try {
      const order = await api<{ id: string }>('/orders', { method: 'POST', body: JSON.stringify({ customerName: form.get('customerName'), phone: form.get('phone'), shippingAddress: form.get('shippingAddress'), items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })) }) });
      clear();
      router.push(`/checkout/success?id=${order.id}`);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Checkout failed');
    }
  }

  if (!items.length) return <main className="checkout-page"><p>Your cart is empty.</p></main>;

  return <main className="checkout-page"><section className="checkout-card"><div><p className="eyebrow">Guest checkout</p><h1>Where should we send it?</h1><p className="checkout-intro">Review your order and add your contact and delivery details. You can check out with or without an account; payments are not collected in this demo.</p></div><aside className="order-summary"><span>Order total</span><strong>{money(total)}</strong><small>{items.reduce((sum, item) => sum + item.quantity, 0)} item{items.length === 1 ? '' : 's'}</small></aside><form onSubmit={submit}><div className="form-grid"><label>Full name<input name="customerName" autoComplete="name" required minLength={2} placeholder="Your full name" /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" required minLength={7} placeholder="+880 1XXXXXXXXX" /></label></div><label>Shipping address<textarea name="shippingAddress" minLength={10} required placeholder="Street, city, postal code, country" /></label>{error && <p className="error" role="alert">{error}</p>}<button type="submit">Place test order</button></form></section></main>;
}
