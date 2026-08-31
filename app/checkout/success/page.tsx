'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return (
    <main className="page">
      <section className="auth-card">
        <p className="eyebrow">Order confirmed</p>
        <h1>Thanks for your order.</h1>
        <p className="auth-intro">
          Your test order
          {id ? (
            <>
              {' '}
              <strong>#{id.slice(-8).toUpperCase()}</strong>
            </>
          ) : (
            ''
          )}{' '}
          has been created. We’ll use the shipping address you provided.
        </p>
        <Link className="button" href="/products">
          Continue shopping
        </Link>
      </section>
    </main>
  );
}

export default function Success() {
  return (
    <Suspense
      fallback={
        <main className="route-loading">
          <p>Loading your order…</p>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
