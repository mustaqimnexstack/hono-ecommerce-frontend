'use client';

import { FormEvent, Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ProductCard } from '@/components/ProductCard';
import type { PaginatedProducts } from '@store/types';

function ProductsContent() {
  const [data, setData] = useState<PaginatedProducts | null>(null);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  async function load(search = '') {
    setError('');
    try { setData(await api<PaginatedProducts>(`/products?q=${encodeURIComponent(search)}`)); }
    catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not load products.'); }
  }

  useEffect(() => {
    const search = searchParams.get('q') || '';
    setQuery(search);
    void load(search);
  }, [searchParams]);

  function search(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void load(query); }

  return <main className="page"><div className="page-heading"><div><p className="eyebrow">Field Store collection</p><h1>Shop essentials</h1><p>Useful, durable goods for everyday routines.</p></div><form className="search-form" onSubmit={search}><label>Search products<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “tote” or “tee”" /></label></form></div>{error ? <div className="empty-state"><h2>We couldn’t load the collection.</h2><p>{error}</p><button onClick={() => void load(query)}>Try again</button></div> : !data ? <p className="route-loading">Loading products…</p> : !data.items.length ? <div className="empty-state"><h2>No products found</h2><p>Try a different search or browse the full collection.</p><Link className="button" href="/products">Clear search</Link></div> : <div className="product-grid catalog-grid">{data.items.map((product) => <ProductCard key={product.id} product={product} />)}</div>}</main>;
}

export default function Products() {
  return (<>{<Suspense fallback={<main className="route-loading"><p>Loading products…</p></main>}><ProductsContent /></Suspense>}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"Field Store\",\"url\":\"https://hono-ecommerce-frontend.vercel.app/products\"}" }} /></>);
}
