import { useTranslation } from 'react-i18next';

export default function Features() {
  const { t } = useTranslation();

  return (
    <section id="features" className="bg-brand-light py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-dark">{t('powerfulFeatures')}</h2>
          <p className="mt-4 text-lg text-brand-text max-w-2xl mx-auto">{t('discoverTools')}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Feature 1: Markdown Support */}
          <div className="feature-card bg-white p-8 rounded-xl shadow-sm border border-transparent hover:border-brand-main hover:shadow-lg transition-all duration-300">
            <div className="flex-shrink-0 mb-4">
              <div className="h-12 w-12 rounded-full bg-brand-main text-white flex items-center justify-center text-2xl">
                <i className="fab fa-markdown"></i>
              </div>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">{t('localFirst')}</h3>
            <p className="text-brand-text">{t('localFirstDescription')}</p>
          </div>

          {/* Feature 2: Real-Time Preview */}
          <div className="feature-card bg-white p-8 rounded-xl shadow-sm border border-transparent hover:border-brand-main hover:shadow-lg transition-all duration-300">
            <div className="flex-shrink-0 mb-4">
              <div className="h-12 w-12 rounded-full bg-brand-main text-white flex items-center justify-center text-2xl">
                <i className="fas fa-eye"></i>
              </div>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">{t('openSource')}</h3>
            <p className="text-brand-text">{t('openSourceDescription')}</p>
          </div>

          {/* Feature 3: Privacy Focused */}
          <div className="feature-card bg-white p-8 rounded-xl shadow-sm border border-transparent hover:border-brand-main hover:shadow-lg transition-all duration-300">
            <div className="flex-shrink-0 mb-4">
              <div className="h-12 w-12 rounded-full bg-brand-main text-white flex items-center justify-center text-2xl">
                <i className="fas fa-shield-alt"></i>
              </div>
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">{t('privacyFocused')}</h3>
            <p className="text-brand-text">{t('privacyFocusedDescription')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}