import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="faq-item bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
      <button 
        onClick={onClick}
        className="faq-question w-full text-left p-6 flex justify-between items-center focus:outline-none"
      >
        <span className="text-lg font-semibold text-brand-dark">{question}</span>
        <i className={cn("fas fa-chevron-down transition-transform duration-300", isOpen && "rotate-180")}></i>
      </button>
      <div 
        className={cn(
          "faq-answer overflow-hidden transition-all duration-500 ease-in-out",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="p-6 pt-0 text-brand-text" dangerouslySetInnerHTML={{ __html: answer }}></p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer')
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer')
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer')
    }
  ];

  return (
    <section id="support" className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-dark">{t('faqTitle')}</h2>
          <p className="mt-4 text-lg text-brand-text">{t('faqSubtitle')}</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleItem(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}