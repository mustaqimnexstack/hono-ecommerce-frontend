'use client';
import Link from 'next/link'; import { useCart } from '@/store/cart';
export function Header() { const count = useCart(s => s.items.reduce((n, i) => n + i.quantity, 0)); return <header><Link href="/" className="brand">Field Store</Link><nav><Link href="/products">Shop</Link><Link href="/account/orders">Orders</Link><Link href="/admin/products">Admin</Link><Link href="/cart">Cart ({count})</Link></nav></header>; }
