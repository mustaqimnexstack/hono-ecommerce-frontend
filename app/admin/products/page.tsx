'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '@/components/AdminShell';
import { api, money } from '@/lib/api';
import type { Product } from '@store/types';

function AdminProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');

  const load = async () => {
    try { setProducts(await api<Product[]>('/admin/products')); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Request failed'); }
  };

  useEffect(() => { void load(); }, []);

  return <main className="page"><div className="page-heading"><div><p className="eyebrow">Store operations</p><h1>Products</h1><p>Manage catalog availability and stock.</p></div><Link className="button" href="/admin/products/new">Add product</Link></div>{error && <p className="error">{error}</p>}<section className="admin-list-section"><div className="space"><div><p className="eyebrow">Catalog</p><h2>Product list</h2></div><span className="status">{products.length} products</span></div><div className="table-wrap"><table><thead><tr><th>Product</th><th>Price</th><th>Availability</th><th>Stock</th></tr></thead><tbody>{products.map((product) => <tr key={product.id}><td><div className="product-cell">{product.images[0] ? <img className="product-thumb" src={product.images[0].url} alt="" /> : <span className="product-thumb product-thumb-empty" />}<div><strong>{product.name}</strong><br /><small>{product.category?.name || 'Uncategorized'}</small></div></div></td><td>{money(product.priceCents)}</td><td><span className="status">{product.active ? 'Active' : 'Hidden'}</span></td><td><span className={product.stock <= 5 ? 'stock-low' : ''}>{product.stock} in stock</span></td></tr>)}</tbody></table></div></section></main>;
}

export default function AdminProducts() {
  return <AdminShell><AdminProductsContent /></AdminShell>;
}
