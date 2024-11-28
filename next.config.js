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
    ],
    dangerouslyAllowSVG: true, // SVG 이미지 허용
  },
}

/* @type {import('next').NextConfig} */
module.exports = nextConfig;
