import type { Metadata } from 'next';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'أضف إعلانك',
  description: 'إضافة إعلان جديد لبيع قطعة تحف أو أنتيك على Vintage.',
  alternates: { canonical: canonical('/add-ad') },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
