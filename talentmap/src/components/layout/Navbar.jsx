'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BRAND_NAME, AUTHOR_NAME } from '@/config/brand';

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#inicio" className="flex flex-col leading-none">
            <span
              className="font-bold text-sm tracking-tight"
              style={{ color: scrolled ? 'var(--color-gray-900)' : 'white' }}
            >
              {BRAND_NAME}
            </span>
            <span
              className="text-xs"
              style={{ color: scrolled ? 'var(--color-gray-400)' : 'rgba(255,255,255,0.7)' }}
            >
              by {AUTHOR_NAME}
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: scrolled ? 'var(--color-gray-600)' : 'rgba(255,255,255,0.8)' }}
                onMouseEnter={(e) => (e.target.style.color = scrolled ? 'var(--color-gray-900)' : 'white')}
                onMouseLeave={(e) => (e.target.style.color = scrolled ? 'var(--color-gray-600)' : 'rgba(255,255,255,0.8)')}
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="hidden md:block text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer"
              style={{ color: scrolled ? 'var(--color-gray-600)' : 'rgba(255,255,255,0.8)' }}
            >
              {i18n.language === 'es' ? 'ES | EN' : 'EN | ES'}
            </button>
            <a href="#diagnostico" className="hidden md:block">
              <Button size="sm">{t('nav.cta')}</Button>
            </a>
            <button
              className="md:hidden p-2 cursor-pointer"
              style={{ color: scrolled ? 'var(--color-gray-800)' : 'white' }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--color-gray-100)] shadow-lg">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-[var(--color-gray-700)] py-2"
                onClick={() => setMenuOpen(false)}
              >
                {t(link.key)}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-gray-100)]">
              <button
                onClick={toggleLang}
                className="text-xs font-semibold tracking-wider text-[var(--color-gray-600)] cursor-pointer"
              >
                {i18n.language === 'es' ? 'ES | EN' : 'EN | ES'}
              </button>
              <a href="#diagnostico" onClick={() => setMenuOpen(false)}>
                <Button size="sm">{t('nav.cta')}</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
