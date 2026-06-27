'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronLeft, RotateCcw, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { quizQuestions, pathProfiles } from '@/data/quizQuestions';
import { competencies, pathMatrix } from '@/data/competencyMatrix';

const PATH_COLORS = {
  leadership: '#6366F1',
  pm: '#F59E0B',
  specialist: '#10B981',
};

export function DiagnosticTools() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('quiz');
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [checklistState, setChecklistState] = useState({});
  const isEn = i18n.language === 'en';

  useEffect(() => {
    const saved = sessionStorage.getItem('quizResult');
    if (saved) {
      try { setResult(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleAnswer = (questionId, path) => {
    setAnswers((prev) => ({ ...prev, [questionId]: path }));
  };

  const goNext = () => {
    if (step < quizQuestions.length - 1) setStep((s) => s + 1);
  };

  const goPrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const finishQuiz = () => {
    const counts = { leadership: 0, pm: 0, specialist: 0 };
    Object.values(answers).forEach((path) => { if (path) counts[path]++; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0][0];
    const second = sorted[1][0];
    const res = { dominant, second, counts };
    setResult(res);
    sessionStorage.setItem('quizResult', JSON.stringify(res));
  };

  const resetQuiz = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    sessionStorage.removeItem('quizResult');
  };

  const currentQ = quizQuestions[step];
  const allAnswered = quizQuestions.every((q) => answers[q.id]);
  const currentAnswered = answers[currentQ?.id];

  const getPathLabel = (key) => {
    const labels = { leadership: isEn ? 'Leadership' : 'Liderazgo', pm: 'Project Manager', specialist: isEn ? 'Specialist' : 'Especialista' };
    return labels[key] || key;
  };

  const getCompetenciesToDevelop = (dominant) => {
    const targetMatrix = pathMatrix[dominant];
    return competencies
      .sort((a, b) => targetMatrix[b.id] - targetMatrix[a.id])
      .slice(0, 3)
      .map((c) => isEn ? c.labelEn : c.label);
  };

  return (
    <section id="diagnostico" className="py-24" style={{ background: 'var(--color-gray-50)' }}>
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">{t('diagnostic.label')}</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
              {t('diagnostic.title')}
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
              {t('diagnostic.subtitle')}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 p-1 rounded-xl bg-[var(--color-gray-100)]">
            {['quiz', 'checklist'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
                style={{
                  background: activeTab === tab ? 'white' : 'transparent',
                  color: activeTab === tab ? 'var(--color-gray-900)' : 'var(--color-gray-600)',
                  boxShadow: activeTab === tab ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {t(`diagnostic.${tab}Tab`)}
              </button>
            ))}
          </div>

          {/* Quiz Tab */}
          {activeTab === 'quiz' && (
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-gray-200)] overflow-hidden">
              {!result ? (
                <>
                  {/* Progress */}
                  <div className="px-8 pt-8 pb-4">
                    <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--color-gray-500)' }}>
                      <span>{t('diagnostic.quiz.question')} {step + 1} {t('diagnostic.quiz.of')} {quizQuestions.length}</span>
                      <span>{Math.round(((step + 1) / quizQuestions.length) * 100)}%</span>
                    </div>
                    <ProgressBar value={step + 1} max={quizQuestions.length} color="var(--color-primary)" />
                  </div>

                  {/* Question */}
                  <div className="px-8 pb-4">
                    <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-gray-900)' }}>
                      {isEn ? currentQ.questionEn : currentQ.question}
                    </h3>
                    <div className="space-y-3">
                      {currentQ.options.map((opt) => {
                        const selected = answers[currentQ.id] === opt.path;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => handleAnswer(currentQ.id, opt.path)}
                            className="w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer"
                            style={{
                              borderColor: selected ? PATH_COLORS[opt.path] : 'var(--color-gray-200)',
                              background: selected ? `${PATH_COLORS[opt.path]}10` : 'white',
                              color: 'var(--color-gray-800)',
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className="w-6 h-6 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center"
                                style={{
                                  borderColor: selected ? PATH_COLORS[opt.path] : 'var(--color-gray-300)',
                                  background: selected ? PATH_COLORS[opt.path] : 'transparent',
                                }}
                              >
                                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                              </div>
                              <span className="text-sm" style={{ lineHeight: 1.6 }}>
                                {isEn ? opt.textEn : opt.text}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="px-8 py-6 border-t border-[var(--color-gray-100)] flex justify-between items-center">
                    <Button variant="secondary" onClick={goPrev} disabled={step === 0}>
                      <ChevronLeft size={18} />
                      {t('diagnostic.quiz.previous')}
                    </Button>
                    {step < quizQuestions.length - 1 ? (
                      <Button onClick={goNext} disabled={!currentAnswered}>
                        {t('diagnostic.quiz.next')}
                        <ChevronRight size={18} />
                      </Button>
                    ) : (
                      <Button onClick={finishQuiz} disabled={!allAnswered}>
                        {t('diagnostic.quiz.finish')}
                        <ArrowRight size={18} />
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                /* Result */
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="text-4xl mb-4">✦</div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-gray-900)' }}>
                      {t('diagnostic.quiz.yourResult')}
                    </h3>
                  </div>

                  {/* Dominant path */}
                  <div
                    className="rounded-2xl p-6 mb-6 border-2"
                    style={{
                      borderColor: PATH_COLORS[result.dominant],
                      background: `${PATH_COLORS[result.dominant]}08`,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant={result.dominant}>{getPathLabel(result.dominant)}</Badge>
                      <span className="text-xs text-[var(--color-gray-500)]">{t('diagnostic.quiz.dominantPath')}</span>
                    </div>
                    <h4 className="text-xl font-bold mb-2" style={{ color: 'var(--color-gray-900)' }}>
                      {isEn
                        ? pathProfiles[result.dominant]?.profiles[result.second]?.titleEn
                        : pathProfiles[result.dominant]?.profiles[result.second]?.title}
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--color-gray-600)', lineHeight: 1.7 }}>
                      {isEn
                        ? pathProfiles[result.dominant]?.profiles[result.second]?.descriptionEn
                        : pathProfiles[result.dominant]?.profiles[result.second]?.description}
                    </p>
                  </div>

                  {/* Second path */}
                  <div className="rounded-xl p-4 mb-6" style={{ background: 'var(--color-gray-50)' }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-gray-600)' }}>
                      <span>{t('diagnostic.quiz.secondPath')}:</span>
                      <Badge variant={result.second}>{getPathLabel(result.second)}</Badge>
                    </div>
                  </div>

                  {/* Competencies to develop */}
                  <div className="mb-8">
                    <div className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-gray-400)' }}>
                      {t('diagnostic.quiz.competenciesToDevelop')}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getCompetenciesToDevelop(result.dominant).map((c, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 rounded-full font-medium"
                          style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <a href="#plan">
                      <Button>
                        {t('diagnostic.quiz.seeMyPlan')}
                        <ArrowRight size={18} />
                      </Button>
                    </a>
                    <Button variant="secondary" onClick={resetQuiz}>
                      <RotateCcw size={16} />
                      {t('diagnostic.quiz.restart')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-gray-200)] p-8">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-gray-900)' }}>
                {t('diagnostic.checklist.title')}
              </h3>
              <p className="text-sm mb-8" style={{ color: 'var(--color-gray-600)' }}>
                {t('diagnostic.checklist.description')}
              </p>

              {['leadership', 'pm', 'specialist'].map((pathKey) => {
                const colors = {
                  leadership: { color: '#6366F1', bg: '#EEF2FF' },
                  pm: { color: '#F59E0B', bg: '#FFFBEB' },
                  specialist: { color: '#10B981', bg: '#ECFDF5' },
                };
                const cfg = colors[pathKey];
                return (
                  <div key={pathKey} className="mb-8 last:mb-0">
                    <div
                      className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {getPathLabel(pathKey)}
                    </div>
                    <div className="space-y-3">
                      {competencies.map((c) => {
                        const level = pathMatrix[pathKey][c.id];
                        const key = `${pathKey}-${c.id}`;
                        return (
                          <label
                            key={c.id}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded accent-[var(--color-primary)] cursor-pointer"
                              checked={!!checklistState[key]}
                              onChange={(e) =>
                                setChecklistState((prev) => ({ ...prev, [key]: e.target.checked }))
                              }
                            />
                            <div className="flex-1 flex items-center justify-between">
                              <span className="text-sm" style={{ color: 'var(--color-gray-700)' }}>
                                {isEn ? c.labelEn : c.label}
                              </span>
                              <div className="flex gap-1 ml-3">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-5 h-1.5 rounded-full"
                                    style={{
                                      background: i < level ? cfg.color : 'var(--color-gray-200)',
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="mt-8 pt-6 border-t border-[var(--color-gray-100)]">
                <Button variant="secondary">
                  <Download size={16} />
                  {t('diagnostic.checklist.download')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
