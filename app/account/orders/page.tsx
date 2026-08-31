'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, money } from '@/lib/api';
import type { Order } from '@store/types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { api<Order[]>('/orders').then(setOrders).catch((reason) => setError(reason instanceof Error ? reason.message : 'Could not load orders.')); }, []);

  if (error) return <main className="page"><div className="empty-state"><h2>Sign in to view your orders</h2><p>Your account keeps track of orders placed while signed in.</p><Link className="button" href="/login?next=/account/orders">Sign in</Link></div></main>;
  if (!orders) return <main className="route-loading"><p>Loading your orders…</p></main>;
  if (!orders.length) return <main className="page"><div className="empty-state"><h2>No orders yet</h2><p>When you order while signed in, it will appear here.</p><Link className="button" href="/products">Start shopping</Link></div></main>;

  return <main className="page"><div className="page-heading"><div><p className="eyebrow">Your account</p><h1>Order history</h1></div></div><div className="table-wrap"><table><thead><tr><th>Order</th><th>Status</th><th>Total</th><th>Date</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong>#{order.id.slice(-8).toUpperCase()}</strong></td><td><span className="status">{order.status}</span></td><td>{money(order.totalCents)}</td><td>{new Date(order.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></main>;
}
