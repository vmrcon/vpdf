import { useState } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  onConvertClick?: () => void;
  isConvertUnlocked?: boolean;
  isConverting?: boolean;
}

export default function Navbar({ onConvertClick, isConvertUnlocked = false, isConverting = false }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLang = () => setIsLangOpen(!isLangOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-primary h-16 w-full shadow-md fixed top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          
          {/* COLUMN 1: Logo */}
          <div className="flex-shrink-0 w-32">
            <Link href="/" className="text-white text-3xl font-bold tracking-wide no-underline hover:opacity-90 transition-opacity">
              vpdf
            </Link>
          </div>

          {/* COLUMN 2: Central Links (Hidden on Tablet/Mobile) */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <a href="#features" className="text-white text-lg font-medium hover:opacity-80 transition-opacity duration-200">{t('characteristics')}</a>
            <button onClick={() => document.dispatchEvent(new CustomEvent('open-testimonials'))} className="text-white text-lg font-medium hover:opacity-80 transition-opacity duration-200 cursor-pointer bg-transparent border-none">{t('testimonials')}</button>
            <a href="#support" className="text-white text-lg font-medium hover:opacity-80 transition-opacity duration-200">{t('faq')}</a>
          </div>

          {/* COLUMN 3: Actions (Hidden on Mobile) */}
          <div className="hidden sm:flex items-center space-x-4 w-auto justify-end">
            
            {/* Language Selector */}
            <div className="relative group">
              <button 
                onClick={toggleLang}
                onBlur={() => setTimeout(() => setIsLangOpen(false), 200)}
                className="text-white text-xl p-2 hover:scale-110 transition-transform duration-200 focus:outline-none bg-transparent border-none cursor-pointer"
              >
                <i className="fa-solid fa-globe"></i>
              </button>

              {/* Floating Language Block */}
              <div className={cn(
                "absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg overflow-hidden transform transition-all duration-200 origin-top-right z-50",
                isLangOpen ? "opacity-100 visible scale-100" : "opacity-0 invisible scale-95"
              )}>
                <a href="#" onClick={() => changeLanguage('en')} className="block px-4 py-2 text-sm text-brand-text hover:bg-gray-100 transition-colors">{t('english')}</a>
                <a href="#" onClick={() => changeLanguage('zh')} className="block px-4 py-2 text-sm text-brand-text hover:bg-gray-100 transition-colors">{t('chinese')}</a>
              </div>
            </div>

            {/* Convert Button (Desktop) */}
            <button 
              onClick={onConvertClick}
              disabled={!isConvertUnlocked || isConverting}
              className={cn(
                "bg-white text-primary font-bold py-2 px-6 rounded-full shadow-sm transition-all duration-300 flex items-center gap-2",
                !isConvertUnlocked ? "cursor-not-allowed opacity-90" : "cursor-pointer hover:shadow-md hover:bg-gray-100"
              )}
            >
              {isConverting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span className="ml-2">{t('converting')}</span>
                </>
              ) : (
                <>
                  {!isConvertUnlocked && <i className="lock-icon fa-solid fa-lock text-sm"></i>}
                  <span>{t('convert')}</span>
                </>
              )}
            </button>
          </div>

          {/* Hamburger Icon (Mobile Only) */}
          <div className="flex sm:hidden">
            <button onClick={toggleMobileMenu} className="text-white text-2xl focus:outline-none bg-transparent border-none">
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-64 bg-primary shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col p-6 sm:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        
        {/* Header: Logo & Close */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white text-2xl font-bold">
            vpdf
          </div>
          <button onClick={toggleMobileMenu} className="text-white text-2xl bg-transparent border-none">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-4 mb-8">
          <a href="#features" onClick={toggleMobileMenu} className="text-white text-lg font-medium border-b border-red-400 pb-2">{t('characteristics')}</a>
          <button onClick={() => { document.dispatchEvent(new CustomEvent('open-testimonials')); toggleMobileMenu(); }} className="text-left text-white text-lg font-medium border-b border-red-400 pb-2 cursor-pointer bg-transparent">{t('testimonials')}</button>
          <a href="#support" onClick={toggleMobileMenu} className="text-white text-lg font-medium border-b border-red-400 pb-2">{t('support')}</a>
        </div>

        {/* Actions */}
        <div className="mt-auto flex flex-col space-y-4">
          {/* Mobile Language */}
          <div className="text-white">
            <div className="flex items-center gap-2 mb-2 font-bold"><i className="fa-solid fa-globe"></i> {t('language')}</div>
            <div className="pl-6 flex flex-col space-y-2">
              <a href="#" onClick={() => changeLanguage('en')} className="opacity-80 hover:opacity-100">{t('english')}</a>
              <a href="#" onClick={() => changeLanguage('zh')} className="opacity-80 hover:opacity-100">{t('chinese')}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}