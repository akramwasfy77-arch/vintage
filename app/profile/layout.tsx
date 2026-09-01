import type { Metadata } from 'next';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'حسابي',
  description: 'إدارة بيانات حسابك على Vintage.',
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
