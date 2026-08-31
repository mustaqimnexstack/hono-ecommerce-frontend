'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function Register() {
  const [error, setError] = useState('');
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);

    try {
      await api('/auth/register', { method: 'POST', body: JSON.stringify({ name: form.get('name'), email: form.get('email'), password: form.get('password') }) });
      router.push('/products');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Registration failed');
    }
  }

  return <main className="auth-page"><section className="auth-card"><p className="eyebrow">Join the store</p><h1>Create your account</h1><p className="auth-intro">Save time at checkout and keep your order history in one place.</p><form onSubmit={submit}><label>Your name<input name="name" autoComplete="name" required minLength={2} /></label><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="new-password" required minLength={8} /></label><p className="field-hint">Use at least 8 characters.</p>{error && <p className="error" role="alert">{error}</p>}<button type="submit">Create account</button></form><p className="auth-switch">Already have an account? <Link href="/login">Sign in</Link>.</p></section></main>;
}
