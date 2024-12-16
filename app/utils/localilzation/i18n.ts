import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        common: require('../localilzation/locales/en/common.json')
    },
    ko: {
        common: require('../localilzation/locales/ko/common.json')
    },
    jp: {
        common: require('../localilzation/locales/jp/common.json')
    }
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',  //기본 언어
    fallbackLng: 'en',  //언어 감지 실패시 기본 언어
    interpolation: {
        escapeValue: false, // React에서는 XSS 방지가 기본적으로 되어 있음
    },
    defaultNS: 'common' //기본 namespace
});

export default i18n;