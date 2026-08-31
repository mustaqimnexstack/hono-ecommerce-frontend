'use client';

import Link from 'next/link';
import { useCart } from '@/store/cart';

export function Header() {
  const count = useCart((state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="storefront-header">
      <Link href="/" className="brand"><span>Field Store</span><small>Everyday goods</small></Link>
      <nav className="header-actions" aria-label="Primary navigation">
        <Link href="/">Home</Link>
        <Link href="/products">Shop</Link>
        <form className="header-search" action="/products" role="search">
          <label className="sr-only" htmlFor="store-search">Search products</label>
          <input id="store-search" name="q" type="search" placeholder="Search products" />
          <button type="submit">Search</button>
        </form>
        <Link href="/account/orders" className="header-icon-button" aria-label="Your account"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" /></svg></Link>
        <Link href="/cart" className="header-icon-button header-cart" aria-label={`Cart with ${count} items`}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L20 8H7M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" /></svg><span className="cart-count">{count}</span></Link>
      </nav>
    </header>
  );
}
