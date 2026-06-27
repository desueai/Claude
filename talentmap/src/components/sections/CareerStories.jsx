'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Quote } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { careerStories } from '@/data/careerStories';

const PATH_CONFIG = {
  leadership: { color: '#6366F1', bg: '#EEF2FF', badge: 'leadership', label: 'Liderazgo' },
  pm: { color: '#F59E0B', bg: '#FFFBEB', badge: 'pm', label: 'Project Manager' },
  specialist: { color: '#10B981', bg: '#ECFDF5', badge: 'specialist', label: 'Especialista' },
};

export function CareerStories() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [expanded, setExpanded] = useState(false);

  const visibleStories = expanded ? careerStories : careerStories.slice(0, 3);

  return (
    <section id="historias" className="py-24" style={{ background: 'var(--color-gray-50)' }}>
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">{t('stories.label')}</span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
            {t('stories.title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
            {t('stories.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleStories.map((story) => {
            const cfg = PATH_CONFIG[story.pathDestino] || PATH_CONFIG.leadership;
            return (
              <div key={story.id} className="bg-white border border-[var(--color-gray-200)] rounded-2xl overflow-hidden">
                <div className="h-1.5" style={{ background: cfg.color }} />
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0"
                      style={{ background: cfg.color }}
                    >
                      {story.initials}
                    </div>
                    <div>
                      <div className="font-bold text-lg" style={{ color: 'var(--color-gray-900)' }}>
                        {story.nombre}
                      </div>
                      <div className="text-sm flex items-center gap-2 mt-1" style={{ color: 'var(--color-gray-500)' }}>
                        <span>{t('stories.origin')} {story.rolOrigen}</span>
                        <span>→</span>
                        <Badge variant={cfg.badge}>{story.pathDestinoLabel}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="relative mb-6">
                    <div className="absolute top-3 left-0 right-0 h-0.5" style={{ background: 'var(--color-gray-200)' }} />
                    <div className="flex justify-between relative">
                      {story.hitos.map((hito, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1">
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center z-10"
                            style={{
                              background: i === story.hitos.length - 1 ? cfg.color : 'var(--color-gray-300)',
                            }}
                          >
                            {i === story.hitos.length - 1 && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <div className="text-center">
                            <div className="text-xs font-bold" style={{ color: cfg.color }}>{hito.year}</div>
                            <div className="text-xs text-center leading-tight mt-0.5 hidden sm:block" style={{ color: 'var(--color-gray-500)', maxWidth: '60px' }}>
                              {hito.event.slice(0, 25)}…
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="p-4 rounded-xl mb-4" style={{ background: cfg.bg }}>
                    <Quote size={16} className="mb-2" style={{ color: cfg.color }} />
                    <p className="text-sm italic" style={{ color: 'var(--color-gray-700)', lineHeight: 1.7 }}>
                      {isEn ? story.citaEn : story.cita}
                    </p>
                  </div>

                  {/* Key competency */}
                  <div className="text-xs" style={{ color: 'var(--color-gray-500)' }}>
                    <span className="font-semibold">{t('stories.keyCompetency')}: </span>
                    <span>{isEn ? story.competenciaClaveEn : story.competenciaClave}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {careerStories.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-semibold transition-colors duration-200 cursor-pointer"
              style={{ color: 'var(--color-primary)' }}
            >
              {expanded ? '↑ Mostrar menos' : t('stories.viewAll')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
