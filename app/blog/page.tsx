import type { Metadata } from 'next';
import Link from 'next/link';
import { POSTS } from '@/lib/blog';
import { canonical, breadcrumb } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'دليل المقتنيات — مقالات عن التحف والأنتيك',
  description: 'مقالات إرشادية لهواة وجامعي التحف في مصر: تمييز الأنتيك الأصلي، تسعير القطع، تصوير التحف للبيع، وخريطة سوق التحف المصري.',
  alternates: { canonical: canonical('/blog') },
};

export default function Page() {
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'دليل المقتنيات', path: '/blog' }];
  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Blog', name: 'دليل المقتنيات — Vintage', url: canonical('/blog'), inLanguage: 'ar-EG',
        blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, description: p.excerpt, datePublished: p.date, url: canonical(`/blog/${p.slug}`) })),
      }) }} />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow">معرفة</p>
      <h1 className="h1 mt-2">دليل المقتنيات</h1>
      <p className="prose-ar mt-4 max-w-3xl text-muted">
        مقالات عملية لهواة جمع التحف والبائعين في مصر — من تمييز القطعة الأصلية وتسعيرها، إلى تصويرها واختيار قناة البيع المناسبة.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {POSTS.map((p) => (
          <article key={p.slug} className="card-lux p-6 transition hover:border-gold/45">
            <time dateTime={p.date} className="text-xs text-muted">{p.date} · قراءة {p.readMinutes} دقائق</time>
            <h2 className="mt-2 text-lg font-semibold leading-snug">
              <Link href={`/blog/${p.slug}`} className="hover:text-gold-light">{p.title}</Link>
            </h2>
            <p className="prose-ar mt-2 !text-[14.5px] text-muted">{p.excerpt}</p>
            <Link href={`/blog/${p.slug}`} className="link-gold mt-3 inline-block text-sm">اقرأ المقال ←</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
