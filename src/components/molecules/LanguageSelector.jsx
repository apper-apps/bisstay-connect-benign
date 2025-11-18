import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ApperIcon from '@/components/ApperIcon';

const LanguageSelector = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = {
    sv: { name: 'Svenska', flag: '🇸🇪' },
    en: { name: 'English', flag: '🇬🇧' }
  };

  const handleLanguageSelect = (lang) => {
    if (lang !== language) {
      toggleLanguage();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
      >
        <span className="text-lg">{languages[language].flag}</span>
        <span className="hidden sm:block">{languages[language].name}</span>
        <ApperIcon name="ChevronDown" className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => handleLanguageSelect(code)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  code === language ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
                {code === language && (
                  <ApperIcon name="Check" className="h-4 w-4 ml-auto text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;