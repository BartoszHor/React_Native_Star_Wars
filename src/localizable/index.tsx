/* eslint-disable global-require */
import { Localizable } from '../../packages/i18n';

Localizable.fallbacks = true;
Localizable.defaultLocale = 'en';

Localizable.translations = {
  en: require('./languages/en.json'),
};
