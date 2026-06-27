'use client';

import { useTranslation } from 'react-i18next';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import { competencies, pathMatrix } from '@/data/competencyMatrix';

export function CompetenciesComparison() {
  const { t } = useTranslation();

  const data = competencies.map((c) => ({
    subject: t(`comparison.dimensions.${c.id}`),
    Liderazgo: pathMatrix.leadership[c.id],
    PM: pathMatrix.pm[c.id],
    Especialista: pathMatrix.specialist[c.id],
    fullMark: 3,
  }));

  return (
    <section id="comparativa" className="py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">{t('comparison.label')}</span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
            {t('comparison.title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
            {t('comparison.subtitle')}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={data}>
              <PolarGrid stroke="var(--color-gray-200)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 12, fill: 'var(--color-gray-600)', fontFamily: 'var(--font-sans)' }}
              />
              <Radar name="Liderazgo" dataKey="Liderazgo" stroke="#6366F1" fill="#6366F1" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="PM" dataKey="PM" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Especialista" dataKey="Especialista" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={2} />
              <Legend
                wrapperStyle={{ fontFamily: 'var(--font-sans)', fontSize: 13 }}
              />
            </RadarChart>
          </ResponsiveContainer>

          <p className="text-center text-sm mt-6 px-4" style={{ color: 'var(--color-gray-500)', fontStyle: 'italic' }}>
            {t('comparison.note')}
          </p>
        </div>
      </div>
    </section>
  );
}
