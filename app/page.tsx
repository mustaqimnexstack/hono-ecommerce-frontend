'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { api } from '@/lib/api';
import type { PaginatedProducts } from '@store/types';

export default function Home() {
  const [products, setProducts] = useState<PaginatedProducts | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api<PaginatedProducts>('/products?pageSize=4').then(setProducts).catch((reason: unknown) => setError(reason instanceof Error ? reason.message : 'Could not load products'));
  }, []);

  return <main><section className="hero"><p className="eyebrow">Everyday goods, thoughtfully made</p><h1>Simple things for a well-lived day.</h1><p>Discover practical, durable essentials selected for daily life.</p><Link className="button" href="/products">Shop the collection</Link></section><section className="section"><div className="space"><div><p className="eyebrow">New arrivals</p><h2>Featured products</h2></div><Link href="/products">View all products</Link></div>{error ? <p className="error">{error}</p> : !products ? <p>Loading products…</p> : <div className="product-grid">{products.items.map(product => <ProductCard key={product.id} product={product} />)}</div>}</section></main>;
}
