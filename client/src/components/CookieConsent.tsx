import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie('cookie_consent');
    if (!consent) {
      setIsVisible(true);
      document.body.classList.add('overflow-hidden');
    }
  }, []);

  const handleAccept = () => {
    setCookie('cookie_consent', 'all', 365);
    closeBanner();
  };

  const handleDecline = () => {
    setCookie('cookie_consent', 'necessary', 365);
    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    document.body.classList.remove('overflow-hidden');
  };

  // Helper functions
  function setCookie(name: string, value: string, days: number) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  }

  function getCookie(name: string) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  if (!isVisible) return null;

  return (
    <div id="cookie-consent-banner" className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl p-6 z-[100] flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="text-brand-text text-sm md:text-base text-center md:text-left">
        <p className="font-semibold text-brand-dark mb-1">We value your privacy</p>
        <p>We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.</p>
      </div>
      <div className="flex gap-3 shrink-0">
        <button 
          onClick={handleDecline}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Necessary Only
        </button>
        <button 
          onClick={handleAccept}
          className="px-4 py-2 rounded-lg bg-brand-main text-white hover:bg-red-500 transition-colors text-sm font-medium shadow-sm"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
