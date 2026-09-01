import type { MetadataRoute } from 'next';
import { canonical, SITE } from '@/lib/site';

const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'CCBot', 'Applebot-Extended', 'Bytespider', 'Amazonbot', 'cohere-ai', 'Meta-ExternalAgent', 'DuckAssistBot', 'YouBot'];
const SEARCH_BOTS = ['Googlebot', 'Googlebot-Image', 'Bingbot', 'Slurp', 'DuckDuckBot', 'Applebot', 'YandexBot', 'Baiduspider', 'facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'WhatsApp', 'TelegramBot'];

export default function robots(): MetadataRoute.Robots {
  const disallow = ['/admin', '/admin/', '/my-ads', '/profile', '/add-ad'];
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...[...SEARCH_BOTS, ...AI_BOTS].map((ua) => ({ userAgent: ua, allow: '/', disallow })),
    ],
    sitemap: canonical('/sitemap.xml'),
    host: SITE.url,
  };
}
