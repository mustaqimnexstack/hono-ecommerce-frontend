'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AdminShell } from '@/components/AdminShell';
import { api, money } from '@/lib/api';
import type { OrderStatus } from '@store/types';

type Dashboard = {
  productCount: number;
  orderCount: number;
  revenueCents: number;
  lowStockProducts: { id: string; name: string; stock: number }[];
  ordersByStatus: { status: OrderStatus; _count: { _all: number } }[];
};

function AdminDashboardContent() {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { api<Dashboard>('/admin/dashboard').then(setDashboard).catch((reason) => setError(reason instanceof Error ? reason.message : 'Could not load dashboard.')); }, []);

  if (error) return <main className="page"><div className="empty-state"><h2>Dashboard unavailable</h2><p>{error}</p></div></main>;
  if (!dashboard) return <main className="route-loading"><p>Loading dashboard…</p></main>;

  const orderStatus = new Map(dashboard.ordersByStatus.map((item) => [item.status, item._count._all]));
  return <main className="page"><div className="page-heading"><div><p className="eyebrow">Store operations</p><h1>Dashboard</h1><p>A quick view of inventory and order activity.</p></div><div className="dashboard-actions"><Link className="button" href="/admin/products">Manage products</Link><Link href="/admin/orders">View orders</Link></div></div><section className="metric-grid"><article><span>Total products</span><strong>{dashboard.productCount}</strong></article><article><span>Total orders</span><strong>{dashboard.orderCount}</strong></article><article><span>Order value</span><strong>{money(dashboard.revenueCents)}</strong></article><article><span>Pending orders</span><strong>{orderStatus.get('PENDING') || 0}</strong></article></section><section className="dashboard-panels"><article className="card"><p className="eyebrow">Inventory attention</p><h2>Low stock</h2>{dashboard.lowStockProducts.length ? <ul className="dashboard-list">{dashboard.lowStockProducts.map((product) => <li key={product.id}><span>{product.name}</span><strong>{product.stock} left</strong></li>)}</ul> : <p className="muted">Everything is comfortably stocked.</p>}</article><article className="card"><p className="eyebrow">Order pipeline</p><h2>Status overview</h2><ul className="dashboard-list">{(['PENDING', 'CONFIRMED', 'SHIPPED', 'CANCELLED'] as OrderStatus[]).map((status) => <li key={status}><span className="status">{status}</span><strong>{orderStatus.get(status) || 0}</strong></li>)}</ul></article></section></main>;
}

export default function AdminDashboard() {
  return <AdminShell><AdminDashboardContent /></AdminShell>;
}
