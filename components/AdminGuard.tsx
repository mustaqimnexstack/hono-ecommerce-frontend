'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { User } from '@store/types';

type SessionResponse = { user: User | null };

export function AdminGuard({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let active = true;

    api<SessionResponse>('/auth/me')
      .then(({ user }) => {
        if (!active) return;
        if (user?.role === 'ADMIN') {
          setAllowed(true);
          return;
        }
        router.replace(user ? '/products' : '/login');
      })
      .catch(() => {
        if (active) router.replace('/login');
      });

    return () => { active = false; };
  }, [router]);

  if (!allowed) return <main className="route-loading"><p>Checking access…</p></main>;
  return <>{children}</>;
}
