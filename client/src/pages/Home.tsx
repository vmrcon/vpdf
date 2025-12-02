import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import * as mammoth from 'mammoth';
import Navbar from '@/components/Navbar';
import Editor from '@/components/QuillEditor';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import Testimonials from '@/components/Testimonials';
import Notification, { NotificationType } from '@/components/Notification';
import CookieConsent from '@/components/CookieConsent';
import { useSpotlight } from '@/hooks/useSpotlight';
import { useTranslation } from 'react-i18next';

export default function Home() {
  useSpotlight();
  const { t } = useTranslation();

  const [content, setContent] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  
  // Notification State
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const showNotification = (message: string, type: NotificationType = 'info', duration = 5000) => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, duration);
  };

  const handleUnlock = () => {
    if (!isUnlocked) {
      setIsUnlocked(true);
    }
  };

  const handleFileUpload = async (file: File) => {
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (fileExtension !== 'txt' && fileExtension !== 'md' && fileExtension !== 'docx') {
      showNotification('Invalid file type. Please upload a .txt, .md, or .docx file.', 'error', 7000);
      return;
    }

    if (fileExtension === 'docx') {
      showNotification(`Document uploaded: ${fileName}`, 'info', 3000);
      
      setTimeout(() => {
        showNotification('Extracting data...', 'info', 4000);
      }, 3100);

      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;
        
        setTimeout(() => {
          setContent(text);
          handleUnlock();
        }, 4100);
      } catch (error) {
        console.error('Error extracting docx:', error);
        showNotification('Failed to extract document content.', 'error', 5000);
      }
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setContent(text);
        handleUnlock();
      };
      reader.readAsText(file);
    }
  };

  const convertToPdf = async () => {
    if (!content.trim()) {
      showNotification("There's no content to convert.", 'warning');
      return;
    }

    setIsConverting(true);

    try {
      // The Quill editor content is inside a div with class 'ql-editor'
      const element = document.querySelector('.ql-editor');
      if (!element) throw new Error('Editor element not found');

      const doc = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4'
      });

      await doc.html(element, {
        callback: function (doc) {
          setIsConverting(false);
          showNotification('PDF generated! Download will start in 5 seconds...', 'info', 6000);
          
          setTimeout(() => {
            doc.save('vpdf-document.pdf');
            showNotification('Download complete!', 'success', 3000);
          }, 5000);
        },
        x: 40,
        y: 40,
        width: 515, // a4 width (595pt) - 2 * margin (40pt)
        windowWidth: 650,
        autoPaging: 'slice',
        html2canvas: {
          scale: 0.8, 
          logging: false,
          useCORS: true
        }
      });
    } catch (error) {
      console.error(error);
      setIsConverting(false);
      showNotification('An error occurred during conversion.', 'error');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-text">
      <Navbar 
        onConvertClick={convertToPdf} 
        isConvertUnlocked={isUnlocked}
        isConverting={isConverting}
      />
      
      <Notification 
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />

      {/* Main Content: Headline Section */}
      <main className="pt-28 pb-16 px-4 md:px-8 flex-grow">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Column 1: Text Content & Testimonials Trigger */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="font-bold text-brand-dark leading-tight" style={{ fontSize: 'clamp(36px, 4vw, 48px)' }}>
              {t('headlineTitle')}
            </h1>
            <p className="font-normal text-brand-text leading-relaxed" style={{ fontSize: 'clamp(16px, 2vw, 20px)' }}>
              {t('headlineSubtitle')}
            </p>

            {/* Testimonials Trigger Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 mt-8">
              <button 
                onClick={() => document.dispatchEvent(new CustomEvent('open-testimonials'))}
                className="testimonial-trigger bg-brand-main text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-red-500 hover:scale-105 transition-all duration-300 border-none cursor-pointer"
              >
                {t('seeTestimonials')}
              </button>

              <div className="hidden sm:block w-px h-12 bg-gray-300"></div>

              {/* Avatars */}
              <div className="avatar-group flex -space-x-3 overflow-hidden p-2">
                {[32, 12, 5, 9, 20, 1].map((imgId, i) => (
                  <img 
                    key={i}
                    className="avatar inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                    style={{ animation: `wave 0.6s ease-in-out infinite`, animationDelay: `${i * 0.1}s` }}
                    src={`https://i.pravatar.cc/150?img=${imgId}`} 
                    alt={`User ${i + 1}`} 
                  />
                ))}
              </div>
            </div>
          </div>

	          {/* Column 2: Editor & Input Area */}
	          <Editor 
	            content={content}
	            onChange={setContent}
	            onUnlock={handleUnlock}
	            onFileUpload={handleFileUpload}
	            isUnlocked={isUnlocked}
	            isConverting={isConverting}
	            onConvertClick={convertToPdf}
	            onNotification={showNotification}
	          />

        </div>
      </main>

      <Features />
      <FAQ />
      
      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold">vpdf</span>
              <p className="text-gray-400 text-sm mt-1">{t('footerRights')}</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://x.com/vmrcon" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-twitter text-xl"></i></a>
              <a href="https://github.com/vmrcon/vpdf" className="text-gray-400 hover:text-white transition-colors"><i className="fab fa-github text-xl"></i></a>
            </div>
          </div>
        </div>
      </footer>

      <Testimonials />
      <CookieConsent />
    </div>
  );
}