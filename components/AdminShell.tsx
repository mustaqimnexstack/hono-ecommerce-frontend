'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { AdminGuard } from '@/components/AdminGuard';

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/products/new', label: 'Add product' },
  { href: '/admin/orders', label: 'Orders' },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return <AdminGuard><div className="admin-shell"><aside className="admin-sidebar"><div><p className="eyebrow">Field Store</p><h2>Admin</h2></div><nav aria-label="Admin navigation">{links.map((link) => <Link key={link.href} href={link.href} className={pathname === link.href ? 'active' : ''}>{link.label}</Link>)}</nav><Link className="admin-store-link" href="/products">View storefront</Link></aside><div className="admin-content">{children}</div></div></AdminGuard>;
}
