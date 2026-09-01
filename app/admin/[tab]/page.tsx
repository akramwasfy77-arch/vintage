import type { Metadata } from 'next';
import AdminPanel from '@/components/AdminPanel';

export const metadata: Metadata = { title: 'لوحة الإدارة', robots: { index: false, follow: false } };
const TABS = ['dashboard', 'pending', 'ads', 'users', 'payments', 'revenue'];
export function generateStaticParams() { return TABS.map((tab) => ({ tab })); }
export const dynamicParams = false;

export default function Page({ params }: { params: { tab: string } }) {
  return <AdminPanel tab={params.tab} />;
}
