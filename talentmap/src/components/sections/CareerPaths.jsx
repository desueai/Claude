'use client';

import { useTranslation } from 'react-i18next';
import { Users, Target, Zap, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

const PATH_CONFIG = {
  leadership: {
    icon: <Users size={28} />,
    color: '#6366F1',
    bg: '#EEF2FF',
    badge: 'leadership',
  },
  pm: {
    icon: <Target size={28} />,
    color: '#F59E0B',
    bg: '#FFFBEB',
    badge: 'pm',
  },
  specialist: {
    icon: <Zap size={28} />,
    color: '#10B981',
    bg: '#ECFDF5',
    badge: 'specialist',
  },
};

export function CareerPaths() {
  const { t } = useTranslation();

  const paths = ['leadership', 'pm', 'specialist'];

  return (
    <section id="paths" className="py-24" style={{ background: 'var(--color-gray-50)' }}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">{t('paths.label')}</span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
            {t('paths.title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
            {t('paths.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {paths.map((pathKey) => {
            const cfg = PATH_CONFIG[pathKey];
            const signals = t(`paths.${pathKey}.signals`, { returnObjects: true }) || [];
            const competencies = t(`paths.${pathKey}.competencies`, { returnObjects: true }) || [];
            const roles = t(`paths.${pathKey}.roles`, { returnObjects: true }) || [];

            return (
              <div
                key={pathKey}
                className="bg-white rounded-2xl overflow-hidden border border-[var(--color-gray-200)] transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col"
              >
                <div className="h-1.5" style={{ background: cfg.color }} />

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {cfg.icon}
                    </div>
                    <Badge variant={cfg.badge}>{t(`paths.${pathKey}.name`)}</Badge>
                  </div>

                  <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--color-gray-900)' }}>
                    {t(`paths.${pathKey}.name`)}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--color-gray-600)', lineHeight: 1.7 }}>
                    {t(`paths.${pathKey}.description`)}
                  </p>

                  <div className="mb-6">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: cfg.color }}>
                      {t('paths.youAreThisIf')}
                    </div>
                    <ul className="space-y-2">
                      {(Array.isArray(signals) ? signals : []).map((s, i) => (
                        <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--color-gray-700)' }}>
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: cfg.color }} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-gray-400)' }}>
                      {t('paths.keyCompetencies')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(competencies) ? competencies : []).map((c, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[var(--color-gray-100)]">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-gray-400)' }}>
                      {t('paths.typicalRoles')}
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-gray-600)' }}>
                      {(Array.isArray(roles) ? roles : []).join(' · ')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
