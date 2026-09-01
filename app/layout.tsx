import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Cairo, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE, canonical } from '@/lib/site';

const body = Cairo({ subsets: ['arabic', 'latin'], display: 'swap', variable: '--font-body', weight: ['300', '400', '600', '700'] });
const display = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-display', weight: ['600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['Vintage', 'تحف مصر', 'أنتيك للبيع', 'مقتنيات نادرة', 'أنتيك مصري', 'أنتيك عثماني', 'ساعات كلاسيكية', 'عملات قديمة', 'أثاث لويس', 'سجاد شرقي', 'جراموفون'],
  alternates: { canonical: canonical('/') },
  authors: [{ name: SITE.name }],
  category: 'shopping',
  openGraph: {
    type: 'website', siteName: SITE.name, locale: SITE.locale, url: canonical('/'),
    title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description,
  },
  twitter: { card: 'summary_large_image', title: `${SITE.name} — ${SITE.tagline}`, description: SITE.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport: Viewport = { themeColor: '#0B0B0F', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': canonical('/#organization'),
        name: SITE.name,
        alternateName: 'ﭬينتاج',
        url: SITE.url,
        email: SITE.email,
        telephone: `+20${SITE.phone.replace(/^0/, '')}`,
        description: SITE.description,
        areaServed: { '@type': 'Country', name: 'Egypt' },
        logo: { '@type': 'ImageObject', url: canonical('/icon.svg') },
      },
      {
        '@type': 'WebSite',
        '@id': canonical('/#website'),
        url: SITE.url,
        name: SITE.name,
        inLanguage: 'ar-EG',
        description: SITE.description,
        publisher: { '@id': canonical('/#organization') },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/search?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" className={`${body.variable} ${display.variable}`}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:rounded-lg focus:bg-gold focus:px-3 focus:py-2 focus:text-black">تخطي إلى المحتوى</a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
