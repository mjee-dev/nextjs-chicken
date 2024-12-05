import { NextRequest, NextResponse } from "next/server";
import { fallbackLng, locales } from "./app/utils/localilzation/setting";

export function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    if (pathName.startsWith(`/${fallbackLng}`) || pathName === `/${fallbackLng}`) {
        return NextResponse.redirect(
            new URL(
                pathName.replace(
                    `/${fallbackLng}`,
                    pathName === `/${fallbackLng}` ? '/' : '',
                ),
                request.url,
            ),
        );
    }

    const pathNameIsMissingLocale = locales.every(
      locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`,
    );

    if (pathNameIsMissingLocale) {
        return NextResponse.rewrite(
            new URL(`/${fallbackLng}`, request.url)
        );
    }
}

export const config = {
    matcher:
    ['/((?!api|.*\\..*|_next/static|_next/image|manifest.json|assets|favicon.ico).*)']
};