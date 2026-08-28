'use client'; import Link from 'next/link'; import { useSearchParams } from 'next/navigation';
export default function Success(){const query=useSearchParams();return <section><h1>Order received</h1><p>Your test order <strong>{query.get('id')}</strong> was created.</p><Link href="/account/orders"><button>View orders</button></Link></section>}
