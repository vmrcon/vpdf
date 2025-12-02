import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  since: string;
  comment: string;
  img: string;
}

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials: Testimonial[] = [
    { id: 1, name: "Sarah Mallevick", since: `${t('since')} 11/2025`, comment: t('testimonial1'), img: "https://i.pravatar.cc/150?img=32" },
    { id: 2, name: "James Honckick", since: `${t('since')} 10/2025`, comment: t('testimonial2'), img: "https://i.pravatar.cc/150?img=12" },
    { id: 3, name: "Roberta Farecyl", since: `${t('since')} 09/2025`, comment: t('testimonial3'), img: "https://i.pravatar.cc/150?img=5" },
    { id: 4, name: "Michael Chen", since: `${t('since')} 12/2025`, comment: t('testimonial4'), img: "https://i.pravatar.cc/150?img=9" }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      // Small delay for animation
      setTimeout(() => setIsAnimating(true), 10);
    };

    document.addEventListener('open-testimonials', handleOpen);
    return () => document.removeEventListener('open-testimonials', handleOpen);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  const currentTestimonial = testimonials.find(t => t.id === currentId) || testimonials[0];

  if (!isOpen) return null;

  return (
    <div id="testimonial-modal" className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div 
        id="modal-card" 
        className={cn(
          "bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden transform transition-all duration-300",
          isAnimating ? "scale-100 opacity-100" : "scale-95 opacity-0"
        )}
      >
        {/* Header with Close Button */}
        <div className="bg-brand-main p-4 flex justify-end">
          <button onClick={handleClose} className="text-white hover:text-gray-200 transition-colors focus:outline-none">
            <i className="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Avatar */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
              <img id="t-image" src={currentTestimonial.img} alt="User" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* User Info */}
          <h3 id="t-name" className="text-2xl font-bold text-brand-dark mb-1">{currentTestimonial.name}</h3>
          <p id="t-since" className="text-sm text-gray-400 mb-6">{currentTestimonial.since}</p>

          {/* Quote */}
          <blockquote className="relative">
            <i className="fa-solid fa-quote-left text-red-100 text-4xl absolute -top-4 -left-2 z-0"></i>
            <p id="t-comment" className="text-brand-text text-lg italic relative z-10 leading-relaxed">
              "{currentTestimonial.comment}"
            </p>
          </blockquote>

          {/* Selector Dots/Avatars */}
          <div id="testimonial-selector" className="flex justify-center gap-3 mt-8">
            {testimonials.map(t => (
              <button 
                key={t.id}
                onClick={() => setCurrentId(t.id)}
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all duration-200 overflow-hidden",
                  t.id === currentId ? "border-brand-main scale-110 shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img src={t.img} className="w-full h-full object-cover" alt={t.name} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}