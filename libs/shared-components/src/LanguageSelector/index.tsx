import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';

type Language = {
  code: string;
  name: string;
  flag: string;
};

type LanguageSelectorProps = {
  languages: Language[];
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
};

export function LanguageSelector({
  languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ],
  selectedLanguage = 'en',
  onLanguageChange,
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage =
    languages.find((lang) => lang.code === selectedLanguage) || languages[0];

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <span className="mr-2 text-lg">{currentLanguage.flag}</span>
          <span>{currentLanguage.name}</span>
        </span>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700 dark:ring-gray-700"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`flex items-center w-full px-4 py-2 text-sm text-left ${
                  language.code === selectedLanguage
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                    : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
                role="menuitem"
                onClick={() => {
                  onLanguageChange(language.code);
                  setIsOpen(false);
                }}
              >
                <span className="mr-2 text-lg">{language.flag}</span>
                <span className="flex-grow">{language.name}</span>
                {language.code === selectedLanguage && (
                  <Check className="w-4 h-4 text-gray-500 dark:text-gray-300" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
