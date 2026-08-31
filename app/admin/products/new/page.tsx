'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '@/components/AdminShell';
import { api } from '@/lib/api';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787/api';

function NewProductContent() {
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSaving(true);
    const form = new FormData(event.currentTarget);
    try {
      const product = await api<{ id: string }>('/admin/products', { method: 'POST', body: JSON.stringify({ name: form.get('name'), description: form.get('description'), priceCents: Number(form.get('priceCents')), stock: Number(form.get('stock')) }) });
      const image = form.get('image');
      if (image instanceof File && image.size) {
        const imageForm = new FormData();
        imageForm.set('file', image);
        imageForm.set('altText', String(form.get('altText') || ''));
        const response = await fetch(`${API}/admin/products/${product.id}/images`, { method: 'POST', credentials: 'include', body: imageForm });
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || 'The product was created, but its image could not be uploaded.');
        }
      }
      router.push('/admin/products');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not create product.');
      setSaving(false);
    }
  }

  return <main className="page"><div className="page-heading"><div><p className="eyebrow">Catalog</p><h1>Add product</h1><p>Create a new item and optionally upload its catalog image.</p></div><Link href="/admin/products">Back to products</Link></div><form onSubmit={create} className="card product-create-form"><label>Product name<input name="name" required minLength={2} /></label><label>Description<textarea name="description" required minLength={5} /></label><div className="form-grid"><label>Price in cents<input name="priceCents" type="number" min="1" required /></label><label>Available stock<input name="stock" type="number" min="0" required /></label></div><fieldset className="image-fieldset"><legend>Product image <span>(optional)</span></legend><label>Image file<input name="image" type="file" accept="image/png,image/jpeg,image/webp,image/gif" /></label><label>Image description<input name="altText" placeholder="Describe the image for accessibility" /></label></fieldset>{error && <p className="error" role="alert">{error}</p>}<button disabled={saving}>{saving ? 'Creating product…' : 'Create product'}</button></form></main>;
}

export default function NewProduct() {
  return <AdminShell><NewProductContent /></AdminShell>;
}
