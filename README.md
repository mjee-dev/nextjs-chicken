This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## mje memo
npm run format 명령으로 프로젝트 전체를 자동으로 포맷팅 할 수 있음 (pritter 플러그인 기능)

## Link컴포넌트
Link 컴포넌트는 Next.js의 내장 컴포넌트로 클라이언트 사이드 라우팅을 제공합니다.
<Link>의 href 속성에는 URL 경로를 작성하며, 이는 pages 폴더의 파일 구조와 매핑됩니다.
내부 링크에는 <Link>를 사용하여 성능을 최적화하세요.

## 라우트 규칙
- pages 폴더 규칙
pages 폴더 안의 파일과 폴더 구조가 URL 경로와 매핑됩니다.

파일명:
파일 이름은 소문자로 작성하는 것이 일반적이지만, 대소문자 혼합도 가능함. 예: about.tsx → /about, ContactUs.tsx → /contact-us
확장자:
지원되는 확장자: .js, .jsx, .ts, .tsx
동적 라우팅:
파일 이름을 대괄호([])로 감싸면 동적 라우팅을 생성. 예: [id].tsx → /123 또는 /post-title
캐치올 라우팅:
파일 이름에 **[...slug]**를 사용하면 다중 경로를 처리. 예: [...slug].tsx → /, /path, /path/to/page
특수 파일:
_app.tsx: 앱 전체의 공통 레이아웃 또는 상태를 정의.
_document.tsx: HTML <head>나 <body>의 커스텀 구조를 설정.
_error.tsx: 404 또는 500 오류 페이지를 커스터마이징.

- API 라우트 규칙 (pages/api)
pages/api 폴더 안의 파일은 API 엔드포인트로 사용.
파일 이름이 URL 경로로 매핑됨.
예: pages/api/hello.ts → /api/hello

- 컴포넌트 파일 규칙
components 폴더: 재사용 가능한 UI 컴포넌트를 보관하는 데 사용.
파일 및 폴더 이름은 일반적으로 PascalCase를 따름.
예: Header.tsx, Footer.tsx

## Route Group (()), Private Folder (_) 사용

## 스퀘어[] 브래킷 사용
스퀘어 브래킷 사용으로 시작하는 폴더명은 Next.js에서 다이내믹 라우팅으로 간주됩니다.

그리고 스퀘어 브래킷 안에 있는 단어가 바로 동적인 라우팅 주소 즉, 파라미터가 됩니다.