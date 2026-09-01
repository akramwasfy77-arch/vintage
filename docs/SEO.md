# بنية SEO / AEO في Vintage

## 1. الرندرينج
- `app/**` كلها Server Components افتراضياً. مكونات العميل محصورة في التفاعل فقط (`Gallery`, `AccountLink`, نماذج الحساب).
- الصفحات العامة تستخدم ISR: الرئيسية `revalidate = 300`، الأقسام `300`، صفحة الإعلان `120`، الخريطة `3600`.
- صفحات الأقسام والمقالات والإعلانات مولّدة مسبقاً عبر `generateStaticParams`، مع `dynamicParams` للإعلانات الجديدة.
- **كل نص أساسي موجود في HTML الأولي** — لا محتوى يعتمد على JS في المتصفح.

## 2. HTML دلالي
- `h1` واحد فقط لكل صفحة، ثم `h2`/`h3` بتدرّج منطقي.
- `<header>`, `<nav aria-label>`, `<main id="main">`, `<article>`, `<aside>`, `<footer>`, `<dl>`, `<ol>`, `<time datetime>`.
- `alt` وصفي لكل صورة يتضمن اسم القطعة والقسم والمحافظة.
- روابط نصية وصفية (لا "اضغط هنا")، ورابط "تخطي إلى المحتوى".
- `lang="ar"` و `dir="rtl"` على `<html>`.

## 3. Metadata
- `metadataBase` + قالب عنوان `%s | Vintage` في `app/layout.tsx`.
- كل صفحة لها `title` فريد و `meta description` و `canonical` عبر `alternates.canonical`.
- Open Graph + Twitter Card على كل الصفحات العامة، وصورة الإعلان كـ OG image في صفحة الإعلان.
- `robots: noindex` على صفحات الحساب ولوحة الإدارة، وعلى نتائج البحث ذات الاستعلام (لتجنّب المحتوى المكرر).

## 4. Structured Data (JSON-LD)
| النوع | الموضع | الملف |
|---|---|---|
| `Organization` + `WebSite` + `SearchAction` | كل الصفحات | `app/layout.tsx` |
| `FAQPage` | الرئيسية، مقالات بها أسئلة | `app/page.tsx`, `app/blog/[slug]/page.tsx` |
| `ItemList` | الرئيسية، الأقسام | `app/page.tsx`, `app/category/[slug]/page.tsx` |
| `CollectionPage` | صفحات الأقسام | `app/category/[slug]/page.tsx` |
| `Product` + `Offer` (EGP, UsedCondition) | صفحة الإعلان | `app/ad/[id]/page.tsx` |
| `BreadcrumbList` | كل الصفحات الداخلية | `lib/site.tsx` → `breadcrumb()` |
| `HowTo` | كيف يعمل | `app/how-it-works/page.tsx` |
| `Article` | المقالات | `app/blog/[slug]/page.tsx` |
| `Blog` | فهرس المقالات | `app/blog/page.tsx` |
| `ContactPage` | اتصل بنا | `app/contact/page.tsx` |
| `Service` + `Offer` | الأسعار | `app/pricing/page.tsx` |

## 5. Crawlers
`app/robots.ts` يولّد `/robots.txt` ديناميكياً ويسمح صراحة بـ:
- **محركات البحث**: Googlebot, Googlebot-Image, Bingbot, Slurp, DuckDuckBot, Applebot, YandexBot, Baiduspider, facebookexternalhit, Twitterbot, LinkedInBot, WhatsApp, TelegramBot.
- **زواحف الذكاء الاصطناعي**: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, CCBot, Applebot-Extended, Bytespider, Amazonbot, cohere-ai, Meta-ExternalAgent, DuckAssistBot, YouBot.
- محظور للجميع: `/admin`, `/my-ads`, `/profile`, `/add-ad`.

## 6. sitemap و llms.txt
- `app/sitemap.ts` → `/sitemap.xml` ديناميكي: الصفحات الثابتة + الأقسام الثمانية + المقالات + كل الإعلانات المنشورة من قاعدة البيانات، مع `lastModified` و `changeFrequency` و `priority`.
- `app/llms.txt/route.ts` → `/llms.txt` بصيغة Markdown: ملخّص المنصة، الصفحات الرئيسية، الأقسام، الباقات والأسعار، المقالات، وملاحظات للمساعدات الذكية. يُولَّد من نفس مصادر البيانات فيبقى متزامناً تلقائياً.

## 7. الأداء (Core Web Vitals)
- الخطوط عبر `next/font/google` = self-hosted مع `display: swap` و preload، بدون طلب خارجي لـ Google Fonts (كان استيراد CSS خارجي سابقاً — أُزيل).
- JS في المتصفح أقل ما يمكن: الصفحات المحتوائية تحمّل ~94 kB فقط (الصفحات التفاعلية وحدها تحمّل أكثر).
- الصور: `loading="lazy"` افتراضياً و `eager` للقطع المميزة في الطية الأولى، وضغط تلقائي في المتصفح قبل الرفع.
- `compress: true`، `poweredByHeader: false`، `X-Content-Type-Options: nosniff`.
- روابط نظيفة وثابتة: `/category/<slug>`, `/ad/<id>`, `/blog/<slug>` — لا معاملات استعلام في الروابط المفهرسة.

## 8. المحتوى
- كل صفحة قسم لها فقرة تعريفية أصلية (60–90 كلمة) + روابط الأقسام الفرعية.
- صفحات الأسعار والشروط والخصوصية وكيف يعمل نصوص كاملة مكتوبة، لا قوائم فارغة.
- قسم مقالات (`/blog`) بأربعة مقالات إرشادية طويلة لبناء السلطة الموضوعية وتغذية الاقتباس في مساعدات الذكاء الاصطناعي.
- الرئيسية بها قسم أسئلة شائعة مربوط بـ `FAQPage`.
