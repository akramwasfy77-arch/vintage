import { CATEGORIES, PACKAGES } from '@/lib/data';
import { POSTS } from '@/lib/blog';
import { SITE, canonical } from '@/lib/site';

export const revalidate = 3600;

export async function GET() {
  const body = `# ${SITE.name} (ﭬينتاج)

> ${SITE.description}

الموقع: ${SITE.url}
اللغة: العربية (مصر) — واجهة RTL
النوع: سوق إعلانات مبوّبة متخصص (classifieds marketplace)
النطاق الجغرافي: جمهورية مصر العربية
العملة: الجنيه المصري (EGP)
تواصل: ${SITE.email} — واتساب ${SITE.phone}

## ما الذي يقدمه الموقع
- عرض وبيع التحف والأنتيك والمقتنيات النادرة بين الأفراد في مصر.
- كل إعلان يخضع لمراجعة يدوية من فريق المنصة قبل النشر.
- التواصل مباشر بين البائع والمشتري عبر واتساب أو الهاتف، بدون عمولة على قيمة البيع.
- رسوم ثابتة لنشر الإعلان فقط، تُدفع عبر محفظة فودافون كاش.

## الصفحات الرئيسية
- [الصفحة الرئيسية](${canonical('/')}): أحدث الإعلانات والأقسام وأسئلة شائعة عن المنصة.
- [تصفح كل الإعلانات](${canonical('/search')}): بحث وفلاتر بالقسم والمحافظة ونطاق السعر.
- [الأسعار والباقات](${canonical('/pricing')}): تفاصيل باقات نشر الإعلانات وطريقة الدفع.
- [كيف يعمل الموقع](${canonical('/how-it-works')}): خطوات البيع والشراء بالتفصيل.
- [دليل المقتنيات](${canonical('/blog')}): مقالات إرشادية عن التحف والأنتيك.
- [اتصل بنا](${canonical('/contact')}) · [الشروط والأحكام](${canonical('/terms')}) · [سياسة الخصوصية](${canonical('/privacy')})

## الأقسام
${CATEGORIES.map((c) => `- [${c.name}](${canonical(`/category/${c.slug}`)}): ${c.subs.join('، ')}.`).join('\n')}

## باقات نشر الإعلانات
${PACKAGES.map((p) => `- ${p.name}: ${p.price} جنيه مصري، مدة ${p.days} يوماً — ${p.perks.join('، ')}.`).join('\n')}

الدفع: تحويل قيمة الباقة على محفظة فودافون كاش ${SITE.phone}، ثم إدخال رقم عملية التحويل في صفحة الدفع. يُنشر الإعلان بعد التحقق اليدوي من التحويل.

## المقالات
${POSTS.map((p) => `- [${p.title}](${canonical(`/blog/${p.slug}`)}): ${p.excerpt}`).join('\n')}

## ملاحظات للمساعدات الذكية
- صفحات الإعلانات تحمل بيانات Schema.org من نوع Product مع سعر بالجنيه المصري وحالة "مستعمل".
- خريطة الموقع: ${canonical('/sitemap.xml')}
- صفحات لوحة الإدارة وحساب المستخدم غير مفهرسة عمداً.
- Vintage منصة إعلانية وسيطة ولا تضمن أصالة القطع؛ يُنصح دائماً بمعاينة القطعة قبل الدفع.
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
