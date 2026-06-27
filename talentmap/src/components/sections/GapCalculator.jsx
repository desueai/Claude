'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { competencies, pathMatrix, roleCurrentLevels, currentRoles, targetPaths } from '@/data/competencyMatrix';

export function GapCalculator() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [currentRole, setCurrentRole] = useState('');
  const [targetPath, setTargetPath] = useState('');
  const [gapResult, setGapResult] = useState(null);

  const calculate = () => {
    if (!currentRole || !targetPath) return;
    const currentLevels = roleCurrentLevels[currentRole];
    const targetLevels = pathMatrix[targetPath];
    let totalGap = 0;
    let maxPossibleGap = 0;

    const items = competencies.map((c) => {
      const current = currentLevels[c.id];
      const required = targetLevels[c.id];
      const gap = required - current;
      totalGap += Math.max(0, gap);
      maxPossibleGap += required;
      return { competency: c, current, required, gap };
    });

    const completeness = maxPossibleGap > 0 ? Math.round(((maxPossibleGap - totalGap) / maxPossibleGap) * 100) : 100;
    setGapResult({ items, completeness, targetPath });
  };

  const getGapStatus = (gap) => {
    if (gap <= 0) return 'have';
    if (gap === 1) return 'developing';
    return 'develop';
  };

  const gapConfig = {
    have: { icon: <CheckCircle2 size={16} />, color: 'var(--color-success)', label: t('gap.alreadyHave') },
    developing: { icon: <AlertCircle size={16} />, color: 'var(--color-warning)', label: t('gap.developing') },
    develop: { icon: <XCircle size={16} />, color: 'var(--color-error)', label: t('gap.toDevelop') },
  };

  return (
    <section id="brecha" className="py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">{t('gap.label')}</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
              {t('gap.title')}
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
              {t('gap.subtitle')}
            </p>
          </div>

          {!gapResult ? (
            <div className="bg-white border border-[var(--color-gray-200)] rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-gray-700)' }}>
                    1. {t('gap.step1')}
                  </label>
                  <div className="space-y-2">
                    {currentRoles.map((role) => (
                      <button
                        key={role.id}
                        onClick={() => setCurrentRole(role.id)}
                        className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-sm"
                        style={{
                          borderColor: currentRole === role.id ? 'var(--color-primary)' : 'var(--color-gray-200)',
                          background: currentRole === role.id ? 'var(--color-primary-light)' : 'white',
                          color: currentRole === role.id ? 'var(--color-primary)' : 'var(--color-gray-700)',
                          fontWeight: currentRole === role.id ? 600 : 400,
                        }}
                      >
                        {isEn ? role.labelEn : role.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--color-gray-700)' }}>
                    2. {t('gap.step2')}
                  </label>
                  <div className="space-y-2">
                    {targetPaths.map((path) => (
                      <button
                        key={path.id}
                        onClick={() => setTargetPath(path.id)}
                        className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 cursor-pointer text-sm"
                        style={{
                          borderColor: targetPath === path.id ? path.color : 'var(--color-gray-200)',
                          background: targetPath === path.id ? path.bg : 'white',
                          color: targetPath === path.id ? path.color : 'var(--color-gray-700)',
                          fontWeight: targetPath === path.id ? 600 : 400,
                        }}
                      >
                        {isEn ? path.labelEn : path.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <Button onClick={calculate} disabled={!currentRole || !targetPath} className="w-full">
                {t('gap.calculate')}
                <ArrowRight size={18} />
              </Button>
            </div>
          ) : (
            <div className="bg-white border border-[var(--color-gray-200)] rounded-2xl overflow-hidden">
              {/* Progress summary */}
              <div className="px-8 py-6 border-b border-[var(--color-gray-100)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-gray-700)' }}>
                    {t('gap.distance')} {gapResult.completeness}% {t('gap.distanceFrom')}
                  </span>
                  <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {gapResult.completeness}%
                  </span>
                </div>
                <ProgressBar
                  value={gapResult.completeness}
                  max={100}
                  color={targetPaths.find((p) => p.id === gapResult.targetPath)?.color || 'var(--color-primary)'}
                />
              </div>

              {/* Gap items */}
              <div className="p-8">
                {['have', 'developing', 'develop'].map((status) => {
                  const items = gapResult.items.filter((item) => getGapStatus(item.gap) === status);
                  if (!items.length) return null;
                  const cfg = gapConfig[status];
                  return (
                    <div key={status} className="mb-8 last:mb-0">
                      <div className="flex items-center gap-2 mb-4">
                        <span style={{ color: cfg.color }}>{cfg.icon}</span>
                        <span className="text-sm font-semibold" style={{ color: cfg.color }}>
                          {cfg.label} ({items.length})
                        </span>
                      </div>
                      <div className="space-y-3">
                        {items.map(({ competency, current, required }) => (
                          <div key={competency.id} className="flex items-center justify-between p-3 rounded-xl"
                            style={{ background: 'var(--color-gray-50)' }}>
                            <span className="text-sm" style={{ color: 'var(--color-gray-700)' }}>
                              {isEn ? competency.labelEn : competency.label}
                            </span>
                            <div className="flex gap-1">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="w-6 h-2 rounded-full transition-colors duration-300"
                                  style={{ background: i < current ? cfg.color : 'var(--color-gray-200)' }} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="flex gap-3 mt-8 flex-wrap">
                  <a href="#recursos">
                    <Button>
                      {t('gap.seeResources')}
                      <ArrowRight size={18} />
                    </Button>
                  </a>
                  <Button variant="secondary" onClick={() => setGapResult(null)}>
                    <RotateCcw size={16} />
                    {t('gap.recalculate')}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
