const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
console.log("### MongoDB URI:", process.env.MONGODB_URI);

const path = require('path');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";   //로컬 환경에서 자체 서명된 인증서를 허용, TODO: 올바른 인증서를 설정하거나 테스트 환경에서 HTTPS를 비활성화

const nextConfig = {
  reactStrictMode: true,
  // 기타 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        pathname: '/plus/img/logos/mark.svg',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // 여기에 Google 이미지 추가
        pathname: '/a/*',
      },
      {
        protocol: 'https',
        hostname: 'chicken-map.s3.ap-northeast-2.amazonaws.com'   // ✅ S3 버킷 도메인 추가
      }
    ],
    dangerouslyAllowSVG: true, // SVG 이미지 허용
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  webpack: (config) => {  // 동적 로딩 문제 해결
    config.module.rules.push({
      test: /\.json$/,
      include: path.resolve(__dirname, './app/utils/localization/locales'),
      type: 'asset/resource',
    });
    return config;
  },
}

/* @type {import('next').NextConfig} */
module.exports = nextConfig;
