'use client';

import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { BRAND_NAME, AUTHOR_NAME, LINKEDIN_URL, INSTAGRAM_URL, HANDLE } from '@/config/brand';

export function Footer() {
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    const next = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(next);
    if (typeof window !== 'undefined') localStorage.setItem('lang', next);
  };

  const navLinks = [
    { key: 'nav.home', href: '#inicio' },
    { key: 'nav.paths', href: '#paths' },
    { key: 'nav.diagnostic', href: '#diagnostico' },
    { key: 'nav.resources', href: '#recursos' },
    { key: 'nav.blog', href: '#blog' },
    { key: 'nav.contact', href: '#contacto' },
  ];

  return (
    <footer className="bg-[var(--color-gray-900)] text-[var(--color-gray-400)]">
      <div className="container py-16">
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {/* Brand */}
          <div className="col-span-full md:col-span-2">
            <div className="font-bold text-white text-base mb-1">{BRAND_NAME}</div>
            <div className="text-sm mb-3">by {AUTHOR_NAME}</div>
            <div className="text-sm italic text-[var(--color-gray-400)]">{t('footer.tagline')}</div>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-white font-semibold text-sm mb-4">{t('footer.quickLinks')}</div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors duration-200"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="text-white font-semibold text-sm mb-4">{t('footer.followUs')}</div>
            <div className="flex flex-col gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-gray-400)] hover:text-white transition-colors duration-200"
              >
                <ExternalLink size={16} />
                LinkedIn
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-gray-400)] hover:text-white transition-colors duration-200"
              >
                <ExternalLink size={16} />
                {HANDLE}
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="text-white font-semibold text-sm mb-4">{t('footer.legal')}</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors duration-200">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[var(--color-gray-400)] hover:text-white transition-colors duration-200">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
            <button
              onClick={toggleLang}
              className="mt-4 text-xs font-semibold tracking-wider text-[var(--color-gray-400)] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {i18n.language === 'es' ? 'ES | EN' : 'EN | ES'}
            </button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-[var(--color-gray-400)]">
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}
