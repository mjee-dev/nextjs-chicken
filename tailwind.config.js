import daisyui from 'daisyui';

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',  // Next.js 페이지
    './components/**/*.{js,ts,jsx,tsx}',  // Next.js 컴포넌트
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
}
