# نشر كراكيب وتحف على Cloudflare Pages

## 1. Supabase
- أنشئ مشروع `KarakibWaTuhaf`.
- SQL Editor → الصق محتوى `supabase/schema.sql` → Run. (ينشئ الجدولين + RLS + تريجر الأدمن + bucket الصور)
- Authentication → Providers → Email مفعّل.
- خُد من Settings → API: `Project URL` و `anon public key`.

## 2. Cloudflare Pages
- Workers & Pages → Create → Pages → Connect to Git → اختر repo `karakib-wa-tuhaf`.
- Framework preset: Next.js (Static HTML Export)
- Build command: `npm run build`
- Output directory: `out`
- Environment variables (Production + Preview):
  - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = anon public key
- Save and Deploy. كل push على `main` بينشر أوتوماتيك.

## 3. الأدمن
سجّل من `/signup` بإيميل `akramwasfy77@gmail.com` — التريجر بيديك role=admin. الدخول من `/admin`.
