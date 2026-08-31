'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function Login() {
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);

    try {
      await api('/auth/login', { method: 'POST', body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) });
      const next = searchParams.get('next');
      router.push(next?.startsWith('/') && !next.startsWith('//') ? next : '/products');
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Login failed');
    }
  }

  return <main className="auth-page"><section className="auth-card"><p className="eyebrow">Welcome back</p><h1>Sign in to Field Store</h1><p className="auth-intro">Pick up where you left off, review orders, and check out with ease.</p><form onSubmit={submit}><label>Email address<input name="email" type="email" autoComplete="email" required /></label><label>Password<input name="password" type="password" autoComplete="current-password" required /></label>{error && <p className="error" role="alert">{error}</p>}<button type="submit">Sign in</button></form><p className="auth-switch">New here? <Link href="/register">Create an account</Link>.</p></section></main>;
}
