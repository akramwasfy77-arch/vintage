import type { Metadata } from 'next';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'دخول الإدارة',
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
