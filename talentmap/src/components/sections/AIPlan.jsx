'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { roadmaps } from '@/data/roadmaps';

const PATH_COLORS = {
  leadership: { color: '#6366F1', bg: '#EEF2FF', badge: 'leadership' },
  pm: { color: '#F59E0B', bg: '#FFFBEB', badge: 'pm' },
  specialist: { color: '#10B981', bg: '#ECFDF5', badge: 'specialist' },
};

export function AIPlan() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const [quizResult, setQuizResult] = useState(null);
  const [context, setContext] = useState('');
  const [status, setStatus] = useState('idle');
  const [aiPlan, setAiPlan] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('quizResult');
    if (saved) {
      try { setQuizResult(JSON.parse(saved)); } catch {}
    }
  }, []);

  const getPathLabel = (key) => {
    if (!key) return '';
    const labels = { leadership: isEn ? 'Leadership' : 'Liderazgo', pm: 'Project Manager', specialist: isEn ? 'Specialist' : 'Especialista' };
    return labels[key] || key;
  };

  const handleGenerate = async () => {
    setStatus('loading');
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pathDominante: getPathLabel(quizResult?.dominant),
          segundoPath: getPathLabel(quizResult?.second),
          contextoUsuario: context,
        }),
      });
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      setAiPlan(data);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const fallbackPlan = quizResult?.dominant ? roadmaps[quizResult.dominant] : null;
  const cfg = quizResult ? PATH_COLORS[quizResult.dominant] : PATH_COLORS.leadership;

  return (
    <section id="plan-ia" className="py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">{t('aiPlan.label')}</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
              {t('aiPlan.title')}
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
              {t('aiPlan.subtitle')}
            </p>
          </div>

          {!quizResult ? (
            <div className="text-center py-12 bg-[var(--color-gray-50)] rounded-2xl border border-[var(--color-gray-200)]">
              <Sparkles size={40} className="mx-auto mb-4" style={{ color: 'var(--color-primary-muted)' }} />
              <p className="text-[var(--color-gray-600)] mb-6">{t('aiPlan.completeQuizFirst')}</p>
              <a href="#diagnostico">
                <Button>{t('aiPlan.goToQuiz')} <ArrowRight size={16} /></Button>
              </a>
            </div>
          ) : status === 'idle' ? (
            <div className="bg-white border border-[var(--color-gray-200)] rounded-2xl p-8">
              {/* Profile summary */}
              <div className="p-4 rounded-xl mb-6" style={{ background: cfg.bg }}>
                <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: cfg.color }}>
                  {t('aiPlan.profileSummary')}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <div>
                    <span className="text-xs text-[var(--color-gray-500)] mr-2">{t('aiPlan.dominantPath')}:</span>
                    <Badge variant={cfg.badge}>{getPathLabel(quizResult.dominant)}</Badge>
                  </div>
                </div>
              </div>

              {/* Context textarea */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-gray-700)' }}>
                  {t('aiPlan.additionalContext')}
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder={t('aiPlan.contextPlaceholder')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border text-sm resize-none outline-none transition-all duration-200"
                  style={{
                    borderColor: 'var(--color-gray-200)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-gray-800)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-gray-200)')}
                />
              </div>

              <Button onClick={handleGenerate} className="w-full" size="lg">
                <Sparkles size={18} />
                {t('aiPlan.generate')}
              </Button>
            </div>
          ) : status === 'loading' ? (
            <div className="text-center py-16 bg-[var(--color-gray-50)] rounded-2xl border border-[var(--color-gray-200)]">
              <Loader2 size={40} className="mx-auto mb-4 animate-spin" style={{ color: 'var(--color-primary)' }} />
              <p className="text-[var(--color-gray-600)] font-medium">{t('aiPlan.generating')}</p>
            </div>
          ) : status === 'success' && aiPlan ? (
            <div className="bg-white border border-[var(--color-gray-200)] rounded-2xl overflow-hidden">
              <div className="px-8 py-6 border-b" style={{ background: cfg.bg, borderColor: `${cfg.color}20` }}>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} style={{ color: cfg.color }} />
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: cfg.color }}>
                    Plan generado con IA
                  </span>
                </div>
              </div>
              <div className="p-8">
                {[aiPlan.mes1, aiPlan.mes2, aiPlan.mes3].map((mes, idx) => mes && (
                  <div key={idx} className="mb-8 last:mb-0">
                    <div className="font-bold text-lg mb-2" style={{ color: cfg.color }}>
                      {t('aiPlan.month')} {idx + 1} — {mes.enfoque}
                    </div>
                    <ul className="space-y-1 mb-3">
                      {(mes.acciones || []).map((a, i) => (
                        <li key={i} className="text-sm flex gap-2" style={{ color: 'var(--color-gray-700)' }}>
                          <span style={{ color: cfg.color }}>•</span>{a}
                        </li>
                      ))}
                    </ul>
                    {mes.recurso && (
                      <p className="text-xs" style={{ color: 'var(--color-gray-500)' }}>📖 {mes.recurso}</p>
                    )}
                  </div>
                ))}
                {aiPlan.consejo_final && (
                  <div className="mt-8 p-4 rounded-xl" style={{ background: cfg.bg }}>
                    <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: cfg.color }}>
                      {t('aiPlan.finalAdvice')}
                    </div>
                    <p className="text-sm italic" style={{ color: 'var(--color-gray-700)' }}>{aiPlan.consejo_final}</p>
                  </div>
                )}
                <div className="flex gap-3 mt-8 flex-wrap">
                  <Button variant="secondary"><Download size={16} />{t('aiPlan.downloadPlan')}</Button>
                  <a href="#recursos"><Button variant="ghost">{t('aiPlan.goToResources')}</Button></a>
                </div>
              </div>
            </div>
          ) : (
            /* Error fallback */
            <div className="bg-white border border-[var(--color-gray-200)] rounded-2xl p-8">
              <p className="text-sm mb-6" style={{ color: 'var(--color-gray-600)' }}>{t('aiPlan.error')}</p>
              {fallbackPlan && (
                <div>
                  {fallbackPlan.months.map((month) => (
                    <div key={month.month} className="mb-6">
                      <div className="font-bold mb-2" style={{ color: cfg.color }}>
                        {t('aiPlan.month')} {month.month} — {isEn ? month.focusEn : month.focus}
                      </div>
                      <ul className="space-y-1">
                        {(isEn ? month.actionsEn : month.actions).map((a, i) => (
                          <li key={i} className="text-sm" style={{ color: 'var(--color-gray-700)' }}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              <Button onClick={() => setStatus('idle')} variant="secondary">
                Intentar de nuevo
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
