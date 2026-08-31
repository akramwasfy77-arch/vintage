-- كراكيب وتحف — Supabase schema
create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  phone text,
  full_name text,
  role text default 'user',
  created_at timestamp default now()
);

create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  subcategory text,
  price_egp decimal(15,2) not null,
  location text,
  seller_phone text not null,
  seller_whatsapp text,
  photos jsonb default '[]',
  package text not null,
  package_price_egp decimal(10,2) not null,
  vodafone_transaction_id text not null,
  status text default 'pending',
  approved_at timestamp,
  approved_by uuid,
  expires_at timestamp,
  rejection_reason text,
  view_count int default 0,
  created_at timestamp default now()
);

create index if not exists ads_status_idx on public.ads(status);
create index if not exists ads_category_idx on public.ads(category);
create index if not exists ads_created_idx on public.ads(created_at desc);

alter table public.users enable row level security;
alter table public.ads   enable row level security;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select role = 'admin' from public.users where id = auth.uid()), false)
      or coalesce(auth.jwt() ->> 'email' = 'akramwasfy77@gmail.com', false);
$$;

-- users policies
drop policy if exists users_self_read on public.users;
create policy users_self_read on public.users for select using (auth.uid() = id or public.is_admin());
drop policy if exists users_self_update on public.users;
create policy users_self_update on public.users for update using (auth.uid() = id or public.is_admin());
drop policy if exists users_self_insert on public.users;
create policy users_self_insert on public.users for insert with check (auth.uid() = id);

-- ads policies
drop policy if exists ads_public_read on public.ads;
create policy ads_public_read on public.ads for select
  using (status = 'approved' or auth.uid() = user_id or public.is_admin());
drop policy if exists ads_owner_insert on public.ads;
create policy ads_owner_insert on public.ads for insert with check (auth.uid() = user_id and status = 'pending');
drop policy if exists ads_owner_update on public.ads;
create policy ads_owner_update on public.ads for update using (auth.uid() = user_id or public.is_admin());
drop policy if exists ads_owner_delete on public.ads;
create policy ads_owner_delete on public.ads for delete using (auth.uid() = user_id or public.is_admin());

-- auto-create profile row on signup
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, phone, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data ->> 'phone', new.raw_user_meta_data ->> 'full_name',
          case when new.email = 'akramwasfy77@gmail.com' then 'admin' else 'user' end)
  on conflict (id) do nothing;
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- view counter
create or replace function public.increment_view(ad_id uuid) returns void
language sql security definer set search_path = public as $$
  update public.ads set view_count = coalesce(view_count,0) + 1 where id = ad_id;
$$;

-- expire old ads (call from a cron job)
create or replace function public.expire_ads() returns void
language sql security definer set search_path = public as $$
  update public.ads set status = 'expired' where status = 'approved' and expires_at < now();
$$;

-- storage bucket for photos
insert into storage.buckets (id, name, public) values ('ad-photos','ad-photos', true)
  on conflict (id) do nothing;

drop policy if exists ad_photos_read on storage.objects;
create policy ad_photos_read on storage.objects for select using (bucket_id = 'ad-photos');
drop policy if exists ad_photos_write on storage.objects;
create policy ad_photos_write on storage.objects for insert to authenticated
  with check (bucket_id = 'ad-photos' and (storage.foldername(name))[1] = auth.uid()::text);
