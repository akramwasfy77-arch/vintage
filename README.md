# Vintage — سوق التحف والمقتنيات النادرة في مصر

منصة إعلانات مبوّبة عربية (RTL) متخصصة في التحف والأنتيك والمقتنيات النادرة، مبنية للفهرسة في محركات البحث ومساعدات الذكاء الاصطناعي.

## التقنيات
- **Next.js 14 App Router** — SSR / SSG / ISR. كل المحتوى الأساسي يُرسَل في الـ HTML الأولي بدون اعتماد على JavaScript في المتصفح.
- **Tailwind CSS** — هوية بصرية داكنة فاخرة (أسود عميق + ذهب مصقول).
- **Supabase** — Auth + Postgres + Storage + RLS.
- **الخطوط** — Cairo (عربي) و Playfair Display (لاتيني) عبر `next/font` بتحميل ذاتي (self-hosted) بدون طلبات لجهات خارجية.

## النشر
Push على فرع `main` فقط — المستودع مربوط بـ Vercel و Railway والنشر تلقائي. لا يُستخدم Cloudflare Pages.

## متغيرات البيئة
| المتغير | الوصف |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | رابط مشروع Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | المفتاح العام (anon) |
| `NEXT_PUBLIC_SITE_URL` | نطاق الموقع النهائي — يُستخدم في canonical و sitemap و OG |

بدون هذه المتغيرات يعمل الموقع ببيانات نماذج توضيحية.

## قاعدة البيانات
شغّل `supabase/schema.sql` في SQL Editor: يُنشئ جدولي `users` و `ads`، سياسات RLS، تريجر إنشاء الملف الشخصي ومنح صلاحية الأدمن، دوال العداد وانتهاء الصلاحية، و bucket الصور.

الأدمن: سجّل بـ `akramwasfy77@gmail.com` من `/signup`، ثم الدخول من `/admin`.

## بنية SEO / AEO
انظر `docs/SEO.md`.
