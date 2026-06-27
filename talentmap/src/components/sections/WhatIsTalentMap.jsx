'use client';

import { useTranslation } from 'react-i18next';
import { User, Users, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function WhatIsTalentMap() {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <User size={24} />,
      title: t('talentmap.benefit1Title'),
      desc: t('talentmap.benefit1Desc'),
    },
    {
      icon: <Users size={24} />,
      title: t('talentmap.benefit2Title'),
      desc: t('talentmap.benefit2Desc'),
    },
    {
      icon: <Building2 size={24} />,
      title: t('talentmap.benefit3Title'),
      desc: t('talentmap.benefit3Desc'),
    },
  ];

  return (
    <section id="talent-map" className="py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">{t('talentmap.label')}</span>
          <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-gray-900)' }}>
            {t('talentmap.title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-gray-600)', lineHeight: 1.7 }}>
            {t('talentmap.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((b, i) => (
            <Card key={i} accent accentColor="var(--color-primary)">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
              >
                {b.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: 'var(--color-gray-900)' }}>
                {b.title}
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
                {b.desc}
              </p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-medium"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
          >
            ✦ {t('talentmap.stat')}
          </div>
        </div>
      </div>
    </section>
  );
}
