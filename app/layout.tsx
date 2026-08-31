import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'كراكيب وتحف | المنصة الأولى في مصر لبيع التحف والمقتنيات النادرة',
  description:
    'كراكيب وتحف — بيع واشترِ التحف والأنتيك والمقتنيات النادرة في مصر. تحف مصر، أنتيك للبيع، مقتنيات نادرة، ساعات كلاسيكية، أثاث لويس، عملات وطوابع.',
  keywords: ['تحف مصر', 'أنتيك للبيع', 'مقتنيات نادرة', 'كراكيب وتحف', 'أنتيك مصري', 'ساعات كلاسيكية', 'عملات قديمة'],
  openGraph: {
    title: 'كراكيب وتحف',
    description: 'المنصة الأولى في مصر لبيع التحف والمقتنيات النادرة',
    locale: 'ar_EG',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#0F0F14', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
