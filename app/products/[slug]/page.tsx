'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api, money } from '@/lib/api';
import type { Product } from '@store/types';
import { useCart } from '@/store/cart';

export default function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');
  const add = useCart((state) => state.add);

  useEffect(() => { params.then(({ slug }) => api<Product>(`/products/${slug}`).then(setProduct).catch((reason) => setError(reason instanceof Error ? reason.message : 'Product not found.'))); }, [params]);

  if (error) return <main className="page"><div className="empty-state"><h2>We couldn’t find that product.</h2><p>{error}</p><Link className="button" href="/products">Back to shop</Link></div></main>;
  if (!product) return <main className="route-loading"><p>Loading product…</p></main>;

  return <main className="page"><Link href="/products">← Back to shop</Link><section className="product-detail"><div>{product.images[0] ? <img className="product-detail-image" src={product.images[0].url} alt={product.images[0].altText || product.name} /> : <div className="product-detail-image" />}</div><div><p className="eyebrow">{product.category?.name || 'Field Store'}</p><h1>{product.name}</h1><p className="product-description">{product.description}</p><p className="product-price">{money(product.priceCents)}</p><p className="status">{product.stock ? `${product.stock} in stock` : 'Sold out'}</p><p><button onClick={() => add(product)} disabled={!product.stock}>Add to cart</button></p></div></section></main>;
}

