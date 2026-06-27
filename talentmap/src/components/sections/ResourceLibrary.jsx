'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen, Play, FileText, Mic, Star, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { resources, resourceTypes, resourcePaths } from '@/data/resources';

const TYPE_ICONS = {
  book: <BookOpen size={18} />,
  course: <Play size={18} />,
  template: <FileText size={18} />,
  podcast: <Mic size={18} />,
  article: <FileText size={18} />,
};

const LEVEL_COLORS = {
  basic: 'success',
  intermediate: 'warning',
  advanced: 'error',
};

const PATH_BADGE = {
  leadership: 'leadership',
  pm: 'pm',
  specialist: 'specialist',
};

export function ResourceLibrary() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [activePath, setActivePath] = useState('all');
  const [activeType, setActiveType] = useState('all');

  const filtered = resources.filter((r) => {
    const pathMatch = activePath === 'all' || r.path === activePath;
    const typeMatch = activeType === 'all' || r.type === activeType;
    return pathMatch && typeMatch;
  });

  return (
    <section id="recursos" className="py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="section-label">{t('resources.label')}</span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
            {t('resources.title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
            {t('resources.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {resourcePaths.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePath(p.id)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: activePath === p.id ? 'var(--color-primary)' : 'var(--color-gray-100)',
                  color: activePath === p.id ? 'white' : 'var(--color-gray-600)',
                }}
              >
                {isEn ? p.labelEn : p.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {resourceTypes.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveType(r.id)}
                className="px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border"
                style={{
                  borderColor: activeType === r.id ? 'var(--color-primary)' : 'var(--color-gray-200)',
                  background: activeType === r.id ? 'var(--color-primary-light)' : 'white',
                  color: activeType === r.id ? 'var(--color-primary)' : 'var(--color-gray-600)',
                }}
              >
                {isEn ? r.labelEn : r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-[var(--color-gray-400)]">{t('resources.noResults')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="bg-white border border-[var(--color-gray-200)] rounded-xl p-6 flex flex-col transition-all duration-200 hover:shadow-md relative"
              >
                {r.susanaRecommends && (
                  <div
                    className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full"
                    style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                  >
                    <Star size={10} fill="currentColor" />
                    {t('resources.susanaRecommends')}
                  </div>
                )}

                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'var(--color-gray-100)', color: 'var(--color-gray-600)' }}
                  >
                    {TYPE_ICONS[r.type] || <FileText size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-gray-400)' }}>
                      {t(`resources.types.${r.type}`)}
                    </div>
                    <h4 className="font-semibold text-sm leading-snug" style={{ color: 'var(--color-gray-900)' }}>
                      {isEn ? r.titleEn : r.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs flex-1 mb-4" style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
                  {isEn ? r.descriptionEn : r.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-gray-100)]">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant={PATH_BADGE[r.path] || 'neutral'}>
                      {r.path === 'leadership' ? (isEn ? 'Leadership' : 'Liderazgo') :
                       r.path === 'pm' ? 'PM' :
                       r.path === 'specialist' ? (isEn ? 'Specialist' : 'Especialista') : r.path}
                    </Badge>
                    <Badge variant={LEVEL_COLORS[r.level] || 'neutral'}>
                      {t(`resources.levels.${r.level}`)}
                    </Badge>
                  </div>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-colors duration-200 hover:bg-[var(--color-gray-100)]"
                    style={{ color: 'var(--color-gray-400)' }}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
