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
Route Group
- (group-name)/: 경로를 그룹화하여 레이아웃, 기능 등을 그룹별로 관리. (URL 영향X)
Private Folder (_folder)
- _internal/: 내부적으로만 사용되는 파일들을 모아둔 폴더.
외부 접근이 필요 없는 유틸리티, 데이터베이스 설정, 인증 로직 등을 저장.

## 스퀘어[] 브래킷 사용
스퀘어 브래킷 사용으로 시작하는 폴더명은 Next.js에서 다이내믹 라우팅으로 간주됩니다.

그리고 스퀘어 브래킷 안에 있는 단어가 바로 동적인 라우팅 주소 즉, 파라미터가 됩니다.

## routing
app
    (auth)
        signup
            -page.tsx
        login
            -page.tsx
        layout.tsx
    (dashboard)
        list
            -page.tsx
        map
            -page.tsx
        layout.tsx
    -components
        -BoardList.tsx
        -PostDetail.tsx
        -Footer.tsx
        -Header.tsx

----------------------
📄 정적인 페이지는 Server Component
📄 동적인 페이지는 Client Component
app
    -[locale] (Navigation bar, [locale]/layout.tsx에 추가)
        -(main)
            -(policy)
                -payment-policy
                -terms
            -account
            -about  (/about)
                page.tsx
            -download
            -news
                -[...news]  (동적 라우팅. https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes 참고)
                -
        -(sign)
        -reject-email
        layout.tsx
        page.tsx    (Home페이지)
        not-found.ts

        -(auth)
            -join (client)
                page.tsx
            -login (client)
                page.tsx
            layout.tsx

        -(main)  (서버 + 클라이언트)
            -board
                page.tsx    (server)
                -[id]
                    page.tsx    (server, /board/:id)
            -create-post    (client)
                page.tsx
                
            -map
                page.tsx
            -myInfo
                -[userId]
                    page.tsx
                page.tsx
            layout.tsx
    -api    (API Endpoint, Endpoint: API가 서버에서 리소스에 접근할 수 있도록 가능하게 하는 URL)
        -posts  (게시글 관련 API)
            route.ts    (server, POST 요청 처리)
       
        -models
            board.ts
            list.ts
    -public     (코드에서 base URL(/)로 접근 가능)
        -icons  (아이콘 같은 svg파일들)
        -images (jpn, png)
        -fonts  (ttf형식 권장)

    -containers (component > containers > pages 흐름)
        -board
            BoardList.tsx
            PostDetail.tsx
        -account
            -profile
            -subscription
            Account.tsx
        -download
        -main
            Feature.tsx
            FeatureDetail.tsx
            Faq.tsx

    -[locale]

    -components     (UI 기본)
        -article

        -button
            Button.tsx
            LoginButton.tsx
            PasswordButton.tsx
            SubmitButton.tsx
        -inputField
        -modal
            Modal.tsx
        AccountMenu.tsx
        Container.tsx
        Footer.tsx
        Header.tsx
        Nav.tsx
        
    -styles
        -component
            button.css
        -pages
            header.css
            board.css...

        global.css  src/app/layout.tsx에서 임포트하여 전체에 적용하도록 함, 웹폰트 선언 파일, 주로 쓰는 컬러값, CSS 리셋이나 각종 상수 값들을 넣음
        📄levels.css: 각종 z-index 값을 모아둔 파일로, 이렇게 따로 묶어서 관리하는 것이 좋음
        animations.css: animation에서 사용하는 키프레임을 모아둔 파일


    -_internal  (Private Folder, 서버 전용)
        mongodb.ts  (server)
        auth.ts    (server)

    -data   (여러 컴포넌트에서 사용되는 공통된 데이터를 관리)
        -links    (외부로 연결되는 링크(인스타그램, 유튜브 등)를 관리)
        metaData.ts

    -hooks
    -utils  (전반적으로 사용되는 기능 및 규칙과 코드)
        -Timer.ts
        -localization
            -setting.ts
            -server.ts
            -client.tsx

    -middleware.ts  (무조건 root 바로 아래에 있어야함 -> 인증 및 리다이렉트 처리, 요청/응답 수정, 글로벌 로직 실행)


- (auth)
> signup
> login

- (service)
> map

- (board)
> write
> list