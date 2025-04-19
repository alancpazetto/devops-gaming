import { m } from '../paraglide/messages';
import { locales as paraglideLocales } from '../paraglide/runtime';

type LocalesProps = {
  code: (typeof paraglideLocales)[number];
  name: string;
  flag: string;
};

export const locales: LocalesProps[] = [
  { code: 'pt-br', flag: '🇧🇷', name: m['locale-pt-br']() },
  { code: 'en', flag: '🇺🇸', name: m['locale-en']() },
];
