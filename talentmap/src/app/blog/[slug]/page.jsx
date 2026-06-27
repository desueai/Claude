import { posts } from '@/data/posts';
import { notFound } from 'next/navigation';
import { BlogPost } from './BlogPost';

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.titulo} — Intentional Career Path`,
    description: post.extracto,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return <BlogPost post={post} allPosts={posts} />;
}
