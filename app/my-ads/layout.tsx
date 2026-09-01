import type { Metadata } from 'next';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'إعلاناتي',
  description: 'متابعة حالة إعلاناتك على Vintage.',
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
