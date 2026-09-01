import type { Metadata } from 'next';
import { SITE, canonical, breadcrumb } from '@/lib/site';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'اتصل بنا',
  description: 'تواصل مع فريق Vintage للاستفسار عن نشر الإعلانات، التحقق من الدفع، أو الإبلاغ عن إعلان مخالف. الرد خلال 24 ساعة.',
  alternates: { canonical: canonical('/contact') },
};

export default function Page() {
  const crumbs = [{ name: 'الرئيسية', path: '/' }, { name: 'اتصل بنا', path: '/contact' }];
  return (
    <div className="container-p py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb(crumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'ContactPage', url: canonical('/contact'),
        mainEntity: { '@type': 'Organization', name: SITE.name, email: SITE.email, telephone: `+20${SITE.phone.replace(/^0/, '')}` },
      }) }} />
      <Breadcrumbs items={crumbs} />
      <h1 className="h1">اتصل بنا</h1>
      <p className="prose-ar mt-4 max-w-2xl text-muted">
        لأي استفسار عن نشر إعلان، أو تأخر في التحقق من تحويل فودافون كاش، أو للإبلاغ عن إعلان مخالف، تواصل معنا عبر القنوات التالية. نرد عادة خلال 24 ساعة.
      </p>
      <div className="card-lux mt-6 grid gap-4 p-6 text-sm sm:max-w-lg">
        <div><span className="label">البريد الإلكتروني</span><a className="link-gold" href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
        <div className="rule" />
        <div><span className="label">واتساب</span><a className="link-gold" href={`https://wa.me/2${SITE.phone}`} rel="nofollow">{SITE.phone}</a></div>
        <div className="rule" />
        <div><span className="label">محفظة فودافون كاش لرسوم الإعلانات</span><span className="font-semibold text-gold-light">{SITE.phone}</span></div>
      </div>
    </div>
  );
}
