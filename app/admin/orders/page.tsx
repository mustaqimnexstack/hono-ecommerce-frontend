'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '@/components/AdminShell';
import { api, money } from '@/lib/api';

type AdminOrder = {
  id: string;
  status: string;
  totalCents: number;
  createdAt: string;
  customerName: string;
  phone: string;
  user: { name: string; email: string } | null;
  items: { id: string; productName: string; quantity: number }[];
};

function AdminOrdersContent() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [error, setError] = useState('');
  const load = async () => { try { setOrders(await api<AdminOrder[]>('/admin/orders')); } catch (reason) { setError(reason instanceof Error ? reason.message : 'Request failed'); } };

  useEffect(() => { void load(); }, []);

  async function status(id: string, value: string) {
    try { await api(`/admin/orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status: value }) }); void load(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not update order'); }
  }

  return <main className="page"><div className="page-heading"><div><p className="eyebrow">Store operations</p><h1>Orders</h1></div><Link href="/admin/products">Manage products</Link></div>{error && <p className="error">{error}</p>}<div className="table-wrap"><table><thead><tr><th>Customer</th><th>Contact</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong>{order.customerName}</strong><br /><small>{order.user?.email || 'Guest checkout'}</small></td><td>{order.phone}</td><td><ul className="order-items">{order.items.map((item) => <li key={item.id}>{item.productName} <span>×{item.quantity}</span></li>)}</ul></td><td>{money(order.totalCents)}</td><td><select value={order.status} onChange={(event) => status(order.id, event.target.value)}>{['PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED'].map((value) => <option key={value}>{value}</option>)}</select></td></tr>)}</tbody></table></div></main>;
}

export default function AdminOrders() {
  return <AdminShell><AdminOrdersContent /></AdminShell>;
}
