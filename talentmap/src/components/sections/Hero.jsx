'use client';

import { useTranslation } from 'react-i18next';
import { ArrowRight, Users, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e1b4b 50%, #312e81 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-primary)' }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'var(--color-leadership)' }}
      />

      <div className="container relative z-10 pt-24 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-8">
            <span className="text-xs font-semibold text-white/80 tracking-wide">{t('hero.badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="mb-6" style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1 }}>
            <span className="block">{t('hero.headline1')}</span>
            <span style={{ color: 'var(--color-primary-muted)' }}>{t('hero.headline2')}</span>
            <span className="block mt-2">{t('hero.headline3')}</span>
            <span style={{ color: '#a5b4fc' }}>{t('hero.headline4')}</span>
          </h1>

          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '520px', lineHeight: 1.7 }}>
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#diagnostico">
              <Button size="lg">
                {t('hero.cta1')}
                <ArrowRight size={18} />
              </Button>
            </a>
            <a href="#paths">
              <Button variant="outline" size="lg">
                {t('hero.cta2')}
              </Button>
            </a>
          </div>
        </div>

        {/* Floating path cards */}
        <div className="hidden lg:flex gap-4 mt-20 flex-wrap">
          {[
            { icon: <Users size={20} />, label: 'Liderazgo', color: 'var(--color-leadership)', bg: 'var(--color-leadership-light)' },
            { icon: <Target size={20} />, label: 'Project Manager', color: 'var(--color-pm)', bg: 'var(--color-pm-light)' },
            { icon: <Zap size={20} />, label: 'Especialista', color: 'var(--color-specialist)', bg: 'var(--color-specialist-light)' },
          ].map((card) => (
            <div
              key={card.label}
              className="flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-sm border border-white/10"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              <div className="p-2 rounded-lg" style={{ background: card.bg, color: card.color }}>
                {card.icon}
              </div>
              <span className="text-sm font-semibold text-white">{card.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--color-gray-50))' }}
      />
    </section>
  );
}
