'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { roadmaps } from '@/data/roadmaps';

const PATH_COLORS = {
  leadership: { color: '#6366F1', bg: '#EEF2FF' },
  pm: { color: '#F59E0B', bg: '#FFFBEB' },
  specialist: { color: '#10B981', bg: '#ECFDF5' },
};

export function DevelopmentPlan() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [selectedPath, setSelectedPath] = useState('leadership');

  useEffect(() => {
    const saved = sessionStorage.getItem('quizResult');
    if (saved) {
      try {
        const { dominant } = JSON.parse(saved);
        if (dominant) setSelectedPath(dominant);
      } catch {}
    }
  }, []);

  const plan = roadmaps[selectedPath];
  const cfg = PATH_COLORS[selectedPath];

  const pathOptions = [
    { key: 'leadership', label: isEn ? 'Leadership' : 'Liderazgo' },
    { key: 'pm', label: 'Project Manager' },
    { key: 'specialist', label: isEn ? 'Specialist' : 'Especialista' },
  ];

  return (
    <section id="plan" className="py-24" style={{ background: 'var(--color-gray-50)' }}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">{t('plan.label')}</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
              {t('plan.title')}
            </h2>
            <p className="text-lg mb-8" style={{ color: 'var(--color-gray-600)' }}>
              {t('plan.subtitle')}
            </p>

            {/* Path selector */}
            <div className="inline-flex gap-2 p-1 rounded-xl bg-[var(--color-gray-100)]">
              {pathOptions.map((p) => (
                <button
                  key={p.key}
                  onClick={() => setSelectedPath(p.key)}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={{
                    background: selectedPath === p.key ? 'white' : 'transparent',
                    color: selectedPath === p.key ? PATH_COLORS[p.key].color : 'var(--color-gray-600)',
                    boxShadow: selectedPath === p.key ? 'var(--shadow-sm)' : 'none',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Plan title */}
          <h3 className="text-2xl font-bold text-center mb-10" style={{ color: cfg.color }}>
            {isEn ? plan.titleEn : plan.title}
          </h3>

          {/* Month cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {plan.months.map((month) => (
              <div key={month.month} className="bg-white rounded-2xl border border-[var(--color-gray-200)] overflow-hidden">
                <div className="px-6 py-4 border-b border-[var(--color-gray-100)]" style={{ background: cfg.bg }}>
                  <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: cfg.color }}>
                    {t('plan.month')} {month.month}
                  </div>
                  <h4 className="font-bold" style={{ color: 'var(--color-gray-900)', fontSize: 'var(--text-base)' }}>
                    {isEn ? month.focusEn : month.focus}
                  </h4>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-gray-400)' }}>
                    {t('plan.actions')}
                  </div>
                  <ul className="space-y-2 mb-6">
                    {(isEn ? month.actionsEn : month.actions).map((action, i) => (
                      <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--color-gray-700)', lineHeight: 1.5 }}>
                        <span className="font-bold shrink-0" style={{ color: cfg.color }}>{i + 1}.</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-[var(--color-gray-100)]">
                    <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-gray-500)' }}>
                      <BookOpen size={14} className="shrink-0 mt-0.5" />
                      <span style={{ lineHeight: 1.5 }}>{isEn ? month.resourceEn : month.resource}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="secondary">
              <Download size={16} />
              {t('plan.download')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
