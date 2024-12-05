import {InitOptions} from 'i18next';

export const fallbackLng = 'en';
export const locales = [fallbackLng, 'ko', 'ja'] as const;
export type LocaleTypes = (typeof locales)[number];
export const defaultNS = 'common';

export function getOptions(lang = fallbackLng, ns = defaultNS): InitOptions {
    return {
        supportedLngs: locales,
        fallbackLng,
        lng: lang,
        fallbackNS: defaultNS,
        defaultNS,
        ns,
    };
}