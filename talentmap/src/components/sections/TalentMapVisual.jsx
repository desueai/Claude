'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ZONES = [
  {
    id: 'leadership',
    label: 'Liderazgo',
    labelEn: 'Leadership',
    x: 20, y: 10, w: 35, h: 40,
    color: '#6366F1',
    bg: '#EEF2FF',
    desc: 'Alto impacto · Amplio alcance',
    descEn: 'High impact · Wide reach',
  },
  {
    id: 'pm',
    label: 'Project Manager',
    labelEn: 'Project Manager',
    x: 55, y: 10, w: 35, h: 40,
    color: '#F59E0B',
    bg: '#FFFBEB',
    desc: 'Alto impacto · Alcance enfocado',
    descEn: 'High impact · Focused reach',
  },
  {
    id: 'specialist',
    label: 'Especialista',
    labelEn: 'Specialist',
    x: 55, y: 50, w: 35, h: 40,
    color: '#10B981',
    bg: '#ECFDF5',
    desc: 'Impacto profundo · Alcance experto',
    descEn: 'Deep impact · Expert reach',
  },
];

export function TalentMapVisual() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [hoveredZone, setHoveredZone] = useState(null);
  const [selectedPos, setSelectedPos] = useState(null);

  const handleMapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSelectedPos({ x, y });
  };

  return (
    <section id="mapa" className="py-24" style={{ background: 'var(--color-gray-50)' }}>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">{t('talentMapVisual.label')}</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
              {t('talentMapVisual.title')}
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
              {t('talentMapVisual.subtitle')}
            </p>
          </div>

          <div className="bg-white border border-[var(--color-gray-200)] rounded-2xl p-8">
            {/* Axes labels */}
            <div className="relative">
              <div className="text-center mb-3 text-sm font-semibold" style={{ color: 'var(--color-gray-500)' }}>
                {t('talentMapVisual.yAxis')}
              </div>
              <div className="flex items-center gap-4">
                <div
                  className="writing-mode-vertical text-xs font-semibold shrink-0"
                  style={{
                    writingMode: 'vertical-rl',
                    transform: 'rotate(180deg)',
                    color: 'var(--color-gray-400)',
                    letterSpacing: '0.05em',
                  }}
                >
                  Impacto
                </div>

                {/* Map area */}
                <div
                  className="relative flex-1 rounded-xl overflow-hidden cursor-crosshair border border-[var(--color-gray-100)]"
                  style={{ paddingTop: '60%' }}
                  onClick={handleMapClick}
                >
                  <div className="absolute inset-0">
                    {ZONES.map((zone) => {
                      const hovered = hoveredZone === zone.id;
                      return (
                        <div
                          key={zone.id}
                          className="absolute rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center p-4 text-center cursor-default"
                          style={{
                            left: `${zone.x}%`,
                            top: `${zone.y}%`,
                            width: `${zone.w}%`,
                            height: `${zone.h}%`,
                            background: hovered ? zone.bg : `${zone.bg}80`,
                            borderColor: hovered ? zone.color : `${zone.color}40`,
                            transform: hovered ? 'scale(1.02)' : 'scale(1)',
                            zIndex: hovered ? 2 : 1,
                          }}
                          onMouseEnter={() => setHoveredZone(zone.id)}
                          onMouseLeave={() => setHoveredZone(null)}
                        >
                          <div className="font-bold text-sm" style={{ color: zone.color }}>
                            {isEn ? zone.labelEn : zone.label}
                          </div>
                          <div className="text-xs mt-1" style={{ color: `${zone.color}90` }}>
                            {isEn ? zone.descEn : zone.desc}
                          </div>
                        </div>
                      );
                    })}

                    {/* User position marker */}
                    {selectedPos && (
                      <div
                        className="absolute z-10 pointer-events-none"
                        style={{ left: `${selectedPos.x}%`, top: `${selectedPos.y}%`, transform: 'translate(-50%, -50%)' }}
                      >
                        <div className="w-5 h-5 rounded-full border-4 border-white shadow-lg" style={{ background: 'var(--color-primary)' }} />
                        <div
                          className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold px-2 py-1 rounded-full"
                          style={{ background: 'var(--color-primary)', color: 'white' }}
                        >
                          {t('talentMapVisual.yourPosition')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-center mt-3 text-sm font-semibold" style={{ color: 'var(--color-gray-500)' }}>
                {t('talentMapVisual.xAxis')}
              </div>
            </div>

            <p className="text-center text-xs mt-6" style={{ color: 'var(--color-gray-400)', fontStyle: 'italic' }}>
              {t('talentMapVisual.selectPosition')} · {t('talentMapVisual.note')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
