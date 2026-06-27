'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { FORMSPREE_ENDPOINT } from '@/config/brand';

export function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '', consent: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t('contact.validation.nameRequired');
    if (!form.email.trim()) errs.email = t('contact.validation.emailRequired');
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = t('contact.validation.emailInvalid');
    if (!form.message.trim()) errs.message = t('contact.validation.messageRequired');
    else if (form.message.length < 20) errs.message = t('contact.validation.messageMin');
    if (!form.consent) errs.consent = t('contact.validation.consentRequired');
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('loading');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, type: form.type, message: form.message }),
      });
      if (res.ok) { setStatus('success'); }
      else { setStatus('error'); }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = (field) => ({
    width: '100%',
    padding: '10px 16px',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${errors[field] ? 'var(--color-error)' : 'var(--color-gray-200)'}`,
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-base)',
    color: 'var(--color-gray-900)',
    background: 'white',
    outline: 'none',
  });

  const contactTypes = ['consulting', 'workshop', 'collaboration', 'other'];

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">{t('contact.label')}</span>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
              {t('contact.title')}
            </h2>
            <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
              {t('contact.subtitle')}
            </p>
          </div>

          {status === 'success' ? (
            <div className="text-center py-16 bg-[var(--color-success-light)] rounded-2xl">
              <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: 'var(--color-success)' }} />
              <p className="font-semibold text-lg" style={{ color: 'var(--color-success)' }}>
                {t('contact.success')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="bg-white border border-[var(--color-gray-200)] rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-gray-700)' }}>
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    style={inputStyle('name')}
                    onFocus={(e) => { if (!errors.name) e.target.style.borderColor = 'var(--color-primary)'; }}
                    onBlur={(e) => { if (!errors.name) e.target.style.borderColor = 'var(--color-gray-200)'; }}
                  />
                  {errors.name && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-gray-700)' }}>
                    {t('contact.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle('email')}
                    onFocus={(e) => { if (!errors.email) e.target.style.borderColor = 'var(--color-primary)'; }}
                    onBlur={(e) => { if (!errors.email) e.target.style.borderColor = 'var(--color-gray-200)'; }}
                  />
                  {errors.email && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.email}</p>}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-gray-700)' }}>
                  {t('contact.type')}
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  style={{ ...inputStyle('type'), height: '44px', cursor: 'pointer' }}
                >
                  <option value="">— Selecciona —</option>
                  {contactTypes.map((ct) => (
                    <option key={ct} value={ct}>{t(`contact.types.${ct}`)}</option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-gray-700)' }}>
                  {t('contact.message')} *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  style={{ ...inputStyle('message'), padding: '12px 16px', resize: 'vertical' }}
                  onFocus={(e) => { if (!errors.message) e.target.style.borderColor = 'var(--color-primary)'; }}
                  onBlur={(e) => { if (!errors.message) e.target.style.borderColor = 'var(--color-gray-200)'; }}
                />
                {errors.message && <p className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{errors.message}</p>}
              </div>

              <label className="flex items-start gap-3 mb-6 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 cursor-pointer shrink-0"
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                <span className="text-sm" style={{ color: 'var(--color-gray-600)' }}>{t('contact.consent')}</span>
              </label>
              {errors.consent && <p className="text-xs mb-4" style={{ color: 'var(--color-error)' }}>{errors.consent}</p>}

              {status === 'error' && (
                <div className="flex items-start gap-2 p-4 rounded-xl mb-5" style={{ background: 'var(--color-error-light)' }}>
                  <AlertCircle size={16} className="shrink-0 mt-0.5" style={{ color: 'var(--color-error)' }} />
                  <p className="text-sm" style={{ color: 'var(--color-error)' }}>{t('contact.error')}</p>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
                <Send size={18} />
                {status === 'loading' ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
