'use client';

import { useTranslation } from 'react-i18next';
import { ExternalLink, Mail, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LINKEDIN_URL, AUTHOR_NAME } from '@/config/brand';

export function AboutSusana() {
  const { t } = useTranslation();

  const credentials = t('about.credentials', { returnObjects: true }) || [];
  const philosophy = t('about.philosophy', { returnObjects: true }) || [];

  return (
    <section id="sobre" className="py-24" style={{ background: 'var(--color-gray-50)' }}>
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: Photo + credentials */}
            <div>
              {/* Photo placeholder */}
              <div
                className="w-full aspect-[4/5] rounded-2xl flex items-center justify-center mb-8 max-w-sm mx-auto lg:mx-0"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-light) 0%, var(--color-gray-100) 100%)' }}
              >
                <div className="text-center">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-3"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    SJ
                  </div>
                  <span className="text-sm" style={{ color: 'var(--color-gray-500)' }}>{AUTHOR_NAME}</span>
                </div>
              </div>

              {/* Credentials */}
              <div className="space-y-3">
                {(Array.isArray(credentials) ? credentials : []).map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Award size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--color-primary)' }} />
                    <span className="text-sm" style={{ color: 'var(--color-gray-700)' }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <span className="section-label">{t('about.label')}</span>
              <h2 className="text-4xl font-bold mb-2" style={{ color: 'var(--color-gray-900)' }}>
                {t('about.title')}
              </h2>
              <p className="text-xl font-semibold mb-8" style={{ color: 'var(--color-primary)', lineHeight: 1.4 }}>
                "{t('about.headline')}"
              </p>

              <div className="space-y-4 mb-10">
                {['bio1', 'bio2', 'bio3'].map((key) => (
                  <p key={key} className="text-base" style={{ color: 'var(--color-gray-700)', lineHeight: 1.8 }}>
                    {t(`about.${key}`)}
                  </p>
                ))}
              </div>

              {/* Philosophy */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--color-gray-900)' }}>
                  Mi filosofía
                </h3>
                <div className="space-y-4">
                  {(Array.isArray(philosophy) ? philosophy : []).map((p, i) => (
                    <div key={i} className="p-4 rounded-xl border border-[var(--color-gray-200)] bg-white">
                      <div className="font-semibold text-sm mb-1" style={{ color: 'var(--color-gray-900)' }}>
                        {p.title}
                      </div>
                      <p className="text-sm" style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 flex-wrap">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                  <Button>
                    <ExternalLink size={18} />
                    {t('about.ctaLinkedIn')}
                  </Button>
                </a>
                <a href="#contacto">
                  <Button variant="secondary">
                    <Mail size={18} />
                    {t('about.ctaContact')}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
