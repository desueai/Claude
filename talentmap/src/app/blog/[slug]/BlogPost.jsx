'use client';

import { useTranslation } from 'react-i18next';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import '@/lib/i18n';

export function BlogPost({ post, allPosts }) {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const related = allPosts.filter((p) =>
    p.slug !== post.slug && p.etiquetas.some((t) => post.etiquetas.includes(t))
  ).slice(0, 2);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(isEn ? 'en-US' : 'es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

  const renderContent = (text) => {
    if (!text) return null;
    return text.split('\n\n').map((block, i) => {
      if (block.startsWith('## ')) {
        return <h2 key={i}>{block.replace('## ', '')}</h2>;
      }
      // Parse **bold**
      const parts = block.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      if (block.startsWith('- ') || block.startsWith('1. ')) {
        const items = block.split('\n').filter(Boolean);
        return (
          <ul key={i}>
            {items.map((item, j) => (
              <li key={j}>{item.replace(/^[-\d.]\s+/, '')}</li>
            ))}
          </ul>
        );
      }
      return <p key={i}>{parts}</p>;
    });
  };

  return (
    <div className="min-h-screen" style={{ fontFamily: 'var(--font-sans)', background: 'var(--color-gray-50)' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e1b4b 100%)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <a href="/#blog" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            <ArrowLeft size={14} /> Volver al blog
          </a>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            {post.etiquetas.map((tag) => (
              <span key={tag} style={{ padding: '4px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: 600 }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px' }}>
            {isEn ? post.tituloEn : post.titulo}
          </h1>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
            <span>{post.autor}</span>
            <span>·</span>
            <span>{formatDate(post.fecha)}</span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> {post.tiempoLectura} min
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <article style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 80px' }}>
        <div className="prose-content">
          {renderContent(isEn && post.contenidoEn ? post.contenidoEn : post.contenido)}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: '64px', paddingTop: '40px', borderTop: '1px solid var(--color-gray-200)' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '24px', color: 'var(--color-gray-900)' }}>
              Artículos relacionados
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {related.map((r) => (
                <a key={r.slug} href={`/blog/${r.slug}`} style={{ display: 'block', padding: '20px', background: 'white', border: '1px solid var(--color-gray-200)', borderRadius: '12px', textDecoration: 'none' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-gray-900)', marginBottom: '6px', lineHeight: 1.4 }}>
                    {isEn ? r.tituloEn : r.titulo}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Leer más <ArrowRight size={11} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
