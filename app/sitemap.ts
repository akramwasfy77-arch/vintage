import type { MetadataRoute } from 'next';
import { CATEGORIES } from '@/lib/data';
import { POSTS } from '@/lib/blog';
import { getAdIds } from '@/lib/server-db';
import { canonical } from '@/lib/site';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const statics: MetadataRoute.Sitemap = [
    { url: canonical('/'), lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: canonical('/search'), lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: canonical('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/how-it-works'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: canonical('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: canonical('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: canonical('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: canonical('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: canonical('/signup'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: canonical('/login'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
  const cats: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: canonical(`/category/${c.slug}`), lastModified: now, changeFrequency: 'daily', priority: 0.9,
  }));
  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: canonical(`/blog/${p.slug}`), lastModified: new Date(p.date), changeFrequency: 'monthly', priority: 0.7,
  }));
  let ads: MetadataRoute.Sitemap = [];
  try {
    const ids = await getAdIds();
    ads = ids.map((id) => ({ url: canonical(`/ad/${id}`), lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 }));
  } catch {}
  return [...statics, ...cats, ...posts, ...ads];
}
