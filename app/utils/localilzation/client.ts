'use client';

import i18next, {i18n} from 'i18next';
import resourcesToBackend from "i18next-resources-to-backend";
import {initReactI18next, useTranslation as useTransAlias} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { getOptions, locales, type LocaleTypes } from "./setting";
import { useEffect } from 'react';

const runOnServerSide = typeof window === 'undefined';

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
        resourcesToBackend(
        (language: LocaleTypes, namespace: string) => {
            return import(`./locales/${language}/${namespace}.json`);
        },
    ),
).init({
   ...getOptions(),
   lng: undefined,
   detection: {
        order: ['path']
   },
   preload: runOnServerSide ? locales : [],
});

export function useTranslation(lng: LocaleTypes, ns: string) {
    const translator = useTransAlias(ns);
    const {i18n} = translator;
    
    if (runOnServerSide && lng) {
        i18n.changeLanguage(lng);
    } else {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useCustomTranslationImplem(i18n, lng);
    }
    return translator;
}

function useCustomTranslationImplem(i18n: i18n, lng: LocaleTypes) {
    useEffect(() => {
        if (!lng) return;
        i18n.changeLanguage(lng);
    }, [lng, i18n]);
}