'use client';

import { useTranslation } from 'react-i18next';
import { ArrowRight, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { posts } from '@/data/posts';

const TAG_BADGES = {
  Liderazgo: 'leadership',
  PM: 'pm',
  Especialista: 'specialist',
  Carrera: 'neutral',
  Equipos: 'neutral',
};

export function Blog() {
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(isEn ? 'en-US' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="section-label">{t('blog.label')}</span>
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-gray-900)' }}>
            {t('blog.title')}
          </h2>
          <p className="text-lg" style={{ color: 'var(--color-gray-600)' }}>
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-[var(--color-gray-200)] rounded-2xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:-translate-y-1"
            >
              {/* Image placeholder */}
              <div
                className="h-44 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-gray-100))' }}
              >
                <span className="text-4xl">✦</span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Tags */}
                <div className="flex gap-2 flex-wrap mb-3">
                  {post.etiquetas.map((tag) => (
                    <Badge key={tag} variant={TAG_BADGES[tag] || 'neutral'}>{tag}</Badge>
                  ))}
                </div>

                <h3 className="font-bold text-base mb-2 leading-snug" style={{ color: 'var(--color-gray-900)' }}>
                  {isEn ? post.tituloEn : post.titulo}
                </h3>

                <p className="text-sm flex-1 mb-4" style={{ color: 'var(--color-gray-600)', lineHeight: 1.6 }}>
                  {isEn ? post.extractoEn : post.extracto}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--color-gray-100)]">
                  <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-gray-400)' }}>
                    <span>{formatDate(post.fecha)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.tiempoLectura} {t('blog.readTime')}
                    </span>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    className="flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {t('blog.readMore')}
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
