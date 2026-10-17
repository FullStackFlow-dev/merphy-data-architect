import { z } from 'zod';

export const seoInput = z.object({ draft: z.string().trim().min(1, 'Ajoutez le texte de votre brouillon.').max(40000, 'Le brouillon dépasse 40 000 caractères. Sélectionnez un passage plus court.') });
export type SeoSuggestion = { title: string; description: string };
export function requireAuthor(isAuthor: boolean) {
  if (!isAuthor) throw new Error('Seuls les auteurs autorisés peuvent générer des suggestions SEO.');
}
export function normalizeSeo(value: SeoSuggestion): SeoSuggestion {
  const title = value.title.replace(/\s+/g, ' ').trim();
  const description = value.description.replace(/\s+/g, ' ').trim();
  if (!title || !description || title.length > 180 || description.length > 300) throw new Error('Suggestion SEO invalide. Relancez la génération.');
  return { title, description };
}