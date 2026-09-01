/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  images: { remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }] },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Content-Type-Options', value: 'nosniff' }] }];
  },
};
export default nextConfig;
