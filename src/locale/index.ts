import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import languageEN from './enlish/en.json';
import languageErrorEN from './enlish/error.json';

export enum LanguageType {
  EN = 'en',
}

export enum LanguageResources {
  Common = 'common',
  ERROR = 'error',
}

const resources = {
  [LanguageType.EN]: {
    [LanguageResources.Common]: languageEN,
    [LanguageResources.ERROR]: languageErrorEN,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: [LanguageType.EN],
    resources,
    defaultNS: LanguageResources.Common,
    ns: LanguageResources.Common,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
