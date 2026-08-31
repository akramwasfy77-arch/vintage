# كراكيب وتحف

المنصة الأولى في مصر لبيع التحف والمقتنيات النادرة.

## Stack
- Next.js 14 (App Router, static export) + Tailwind CSS, Arabic RTL
- Supabase: Auth + Postgres + Storage + RLS
- Cloudflare Pages (auto-deploy from `main`)

## Setup
1. Create a Supabase project, run `supabase/schema.sql` in the SQL editor.
2. Set env vars in Cloudflare Pages:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Build command: `npm run build` — output directory: `out`.

Admin: sign up with `akramwasfy77@gmail.com`, the DB trigger grants the admin role; login at `/admin`.

Payments: manual Vodafone Cash (01029397797) verification from the admin panel.
