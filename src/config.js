import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('./locales/en/translation.json')
    },
    lt: {
      translations: require('./locales/lt/translation.json')
    }
  },
  ns: ['translations'],
  defaultNS: 'translations'
});
i18n.languages = ['en', 'lt'];
export default i18n;