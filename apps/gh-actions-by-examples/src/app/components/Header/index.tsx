import { LanguageSelector } from '@devops-gaming/shared-components';
import { m } from '../../../paraglide/messages';
import {
  getLocale,
  setLocale,
  locales as paraglideLocales,
} from '../../../paraglide/runtime';
import { locales } from '../../../constants/locales';

export function Header() {
  return (
    <header className="mb-10 px-6 flex justify-between">
      <h1 className="text-3xl font-bold">{m.title()}</h1>
      <div>
        <LanguageSelector
          languages={locales}
          selectedLanguage={getLocale()}
          onLanguageChange={(languageCode: string) => {
            setLocale(languageCode as (typeof paraglideLocales)[number]);
          }}
        />
      </div>
    </header>
  );
}
