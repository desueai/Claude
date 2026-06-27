'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Download, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';

export function Newsletter() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !consent) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('newsletter_subscribers').insert({ email });
      // Ignore duplicate email error — treat as success
      if (error && error.code !== '23505') throw error;
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="newsletter" className="py-24" style={{ background: 'linear-gradient(135deg, #F5EAEC 0%, #F9F9F9 100%)' }}>
      <div className="container">
        <div className="max-w-lg mx-auto text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
          >
            <Mail size={28} />
          </div>

          <span className="section-label">{t('newsletter.label')}</span>
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
            {t('newsletter.title')}
          </h2>
          <p className="text-base mb-3" style={{ color: 'var(--color-gray-600)' }}>
            {t('newsletter.subtitle')}
          </p>

          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8"
            style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
          >
            <Download size={14} />
            {t('newsletter.leadMagnet')}
          </div>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <CheckCircle2 size={48} style={{ color: 'var(--color-success)' }} />
              <p className="font-semibold" style={{ color: 'var(--color-success)' }}>
                {t('newsletter.success')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-left">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={t('newsletter.namePlaceholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-lg border text-sm outline-none transition-all duration-200"
                  style={{
                    borderColor: 'var(--color-gray-200)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-gray-800)',
                    background: 'white',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-gray-200)')}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder={t('newsletter.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 px-4 rounded-lg border text-sm outline-none transition-all duration-200"
                  style={{
                    borderColor: 'var(--color-gray-200)',
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--color-gray-800)',
                    background: 'white',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--color-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--color-gray-200)')}
                />
              </div>
              <label className="flex items-start gap-3 mb-6 cursor-pointer text-sm" style={{ color: 'var(--color-gray-600)' }}>
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-[var(--color-primary)] cursor-pointer shrink-0"
                  required
                />
                {t('newsletter.consent')}
              </label>
              <Button type="submit" className="w-full" size="lg" disabled={status === 'loading'}>
                <Download size={18} />
                {t('newsletter.cta')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
