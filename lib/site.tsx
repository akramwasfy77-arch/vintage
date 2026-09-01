export const SITE = {
  name: 'Vintage',
  nameAr: 'ﭬينتاج',
  tagline: 'سوق التحف والمقتنيات النادرة في مصر',
  description:
    'Vintage سوق إلكتروني مصري متخصص في بيع وشراء التحف والأنتيك والمقتنيات النادرة: أنتيك فرنسي وعثماني ومصري، ساعات كلاسيكية، مجوهرات عتيقة، عملات وطوابع، أثاث لويس، سجاد شرقي، جراموفون وراديوهات قديمة. إعلانات موثّقة يراجعها فريق المنصة قبل النشر، وتواصل مباشر بين البائع والمشتري.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vintage-eg.vercel.app',
  locale: 'ar_EG',
  email: 'akramwasfy77@gmail.com',
  phone: '01029397797',
};

export function canonical(path = '/') {
  return new URL(path, SITE.url).toString();
}

export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }) {
  const url = canonical(path);
  const full = `${title} | ${SITE.name}`;
  return {
    title: full,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: full, description, url, siteName: SITE.name, locale: SITE.locale, type: 'website',
      images: image ? [{ url: image }] : undefined,
    },
    twitter: { card: 'summary_large_image' as const, title: full, description, images: image ? [image] : undefined },
  };
}

export function JsonLd({ data }: { data: any }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: canonical(it.path) })),
  };
}
