import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { POSTS, getPost } from '@/lib/blog';
import { SITE, canonical, breadcrumb } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export function generateStaticParams() { return POSTS.map((p) => ({ slug: p.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title, description: post.excerpt,
    alternates: { canonical: canonical(`/blog/${post.slug}`) },
    openGraph: { title: `${post.title} | ${SITE.name}`, description: post.excerpt, type: 'article', publishedTime: post.date, url: canonical(`/blog/${post.slug}`) },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'دليل المقتنيات', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }];
  const article = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: post.title, description: post.excerpt, inLanguage: 'ar-EG',
    datePublished: post.date, dateModified: post.date,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical(`/blog/${post.slug}`) },
    articleSection: 'التحف والمقتنيات',
  };
  return (
    <article className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      {post.faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: post.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      }) }} />}
      <Breadcrumbs items={crumbs} />
      <header className="max-w-3xl">
        <time dateTime={post.date} className="text-xs text-muted">{post.date} · قراءة {post.readMinutes} دقائق</time>
        <h1 className="h1 mt-2">{post.title}</h1>
        <p className="prose-ar mt-4 text-muted">{post.excerpt}</p>
      </header>
      <div className="rule my-8 max-w-3xl" />
      <div className="max-w-3xl">
        {post.sections.map((s) => (
          <section key={s.h} className="mb-8">
            <h2 className="h2">{s.h}</h2>
            {s.p.map((t, i) => <p key={i} className="prose-ar mt-3">{t}</p>)}
          </section>
        ))}
        {post.faq && (
          <section className="mb-8">
            <h2 className="h2">أسئلة شائعة</h2>
            <div className="mt-4 grid gap-3">
              {post.faq.map((f) => (
                <div key={f.q} className="card-lux p-5">
                  <h3 className="font-semibold">{f.q}</h3>
                  <p className="prose-ar mt-2 !text-[14.5px] text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        <div className="card-lux flex flex-wrap items-center justify-between gap-4 p-6">
          <p className="prose-ar !text-[15px]">عندك قطعة جاهزة للبيع؟ اعرضها أمام هواة الجمع في مصر.</p>
          <Link href="/add-ad" className="btn-gold">أضف إعلانك</Link>
        </div>
      </div>
    </article>
  );
}
