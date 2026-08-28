'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@store/types';
type Cart = { items: CartItem[]; add: (p: Product) => void; setQuantity: (id: string, quantity: number) => void; remove: (id: string) => void; clear: () => void };
export const useCart = create<Cart>()(persist((set) => ({ items: [], add: (p) => set(s => { const found = s.items.find(i => i.productId === p.id); return { items: found ? s.items.map(i => i.productId === p.id ? { ...i, quantity: Math.min(i.quantity + 1, p.stock) } : i) : [...s.items, { productId: p.id, name: p.name, slug: p.slug, priceCents: p.priceCents, quantity: 1, imageUrl: p.images[0]?.url }] }; }), setQuantity: (id, quantity) => set(s => ({ items: quantity < 1 ? s.items.filter(i => i.productId !== id) : s.items.map(i => i.productId === id ? { ...i, quantity } : i) })), remove: id => set(s => ({ items: s.items.filter(i => i.productId !== id) })), clear: () => set({ items: [] }) }), { name: 'store-cart' }));
