import { createI18n } from 'vue-i18n';
import enUS from './en-US.json';
import zhTW from './zh-TW.json';

export default createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  globalInjection: true,
  legacy: false,
  messages: {
    'en-US': enUS,
    'zh-TW': zhTW,
  },
});
