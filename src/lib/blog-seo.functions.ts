import { createServerFn } from '@tanstack/react-start';
import { getRequest } from '@tanstack/react-start/server';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { seoInput, requireAuthor } from './blog-seo';

export const generateBlogSeo = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .inputValidator(input => seoInput.parse(input))
  .handler(async ({ data, context }) => {
    const { data: author, error } = await context.supabase.rpc('is_blog_author');
    if (error) throw new Error('Vérification de votre accès auteur impossible.');
    requireAuthor(author === true);
    const { generateSeo } = await import('./blog-seo.server');
    return generateSeo(data.draft, getRequest());
  });