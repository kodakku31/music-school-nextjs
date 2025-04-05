import type { NextConfig } from "next";
import withPWA from 'next-pwa';

const nextConfig: NextConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})({
  /* config options here */
  images: {
    domains: ['source.unsplash.com', 'picsum.photos', 'qienwjmatpqhirlibvws.supabase.co'],
    unoptimized: true,
  },
  // Turbopackの設定
  experimental: {
    turbo: {
      rules: {
        // Turbopackのルール設定
      },
    },
  },
  // 開発オリジンの許可設定
  allowedDevOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    'http://127.0.0.1:*',
  ],
  async headers() {
    return [
      {
        // すべてのルートに対するヘッダー設定
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
      {
        // すべてのAPIルートに対するCORSヘッダー
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'https://qienwjmatpqhirlibvws.supabase.co/:path*',
      },
      // ログインページのリダイレクト
      {
        source: '/login',
        destination: '/auth/login',
      },
    ];
  },
});

export default nextConfig;
