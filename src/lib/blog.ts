import { createIsomorphicFn } from '@tanstack/react-start';
import { queryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { posts, type Post } from '@/data/posts';
import type { Database } from '@/integrations/supabase/types';

export type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
export const toPost = (row: BlogPost): Post => ({ slug: row.slug, title: row.title, excerpt: row.excerpt, content: row.content, tags: row.tags, date: row.published_at ?? row.created_at });
// Static hosts have no RPC server: refresh public articles directly through RLS after hydration.
const listPosts = createIsomorphicFn().server(() => posts).client(async () => {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('status', 'published').order('published_at', { ascending: false });
  if (error) throw new Error('Impossible de charger les articles. Réessayez.');
  const live = (data ?? []).map(toPost);
  return [...live, ...posts.filter(p => !live.some(r => r.slug === p.slug))].sort((a, b) => b.date.localeCompare(a.date));
});
export const blogQuery = queryOptions({ queryKey: ['blog-public'], queryFn: () => listPosts(), staleTime: 0 });

export function articleSlug(title: string) {
  return title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}