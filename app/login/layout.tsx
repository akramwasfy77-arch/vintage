import type { Metadata } from 'next';
import { canonical } from '@/lib/site';

export const metadata: Metadata = {
  title: 'تسجيل الدخول',
  description: 'تسجيل الدخول إلى حسابك على Vintage لنشر ومتابعة إعلاناتك.',
  alternates: { canonical: canonical('/login') },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) { return children; }
