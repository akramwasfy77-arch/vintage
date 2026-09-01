import type { Metadata } from 'next';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'إنشاء حساب',
  description: 'أنشئ حساباً مجانياً على Vintage لتبدأ عرض قطعك للبيع.',
  alternates: { canonical: canonical('/signup') },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
