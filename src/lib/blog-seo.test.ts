import { describe, it, expect } from 'vitest';
import { requireAuthor, seoInput, normalizeSeo } from './blog-seo';
describe('Author SEO suggestions', () => {
  it('rejects callers without the author role', () => { expect(() => requireAuthor(false)).toThrow(); expect(() => requireAuthor(true)).not.toThrow(); });
  it('requires draft text', () => { expect(seoInput.safeParse({ draft: '   ' }).success).toBe(false); expect(seoInput.parse({ draft: 'Un pipeline Python' }).draft).toBe('Un pipeline Python'); });
  it('returns title and meta description without empty output', () => { expect(normalizeSeo({ title: 'Pipeline Python', description: 'Créer un pipeline ETL avec Python.' })).toEqual({ title: 'Pipeline Python', description: 'Créer un pipeline ETL avec Python.' }); expect(() => normalizeSeo({ title: '', description: 'Description' })).toThrow(); });
});