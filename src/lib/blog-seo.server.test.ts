import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PermissionDeniedError } from '@lovable.dev/ai-gateway';

const mocks = vi.hoisted(() => ({ generate: vi.fn(), state: vi.fn(), persist: vi.fn() }));
vi.mock('@lovable.dev/ai-gateway', async importOriginal => ({ ...await importOriginal<typeof import('@lovable.dev/ai-gateway')>(), generateResponse: mocks.generate }));
vi.mock('@/integrations/supabase/client.server', () => ({ supabaseAdmin: { from: () => ({ select: () => ({ eq: () => ({ maybeSingle: mocks.state }) }), upsert: mocks.persist }) } }));
import { generateSeo } from './blog-seo.server';

describe('SEO Gateway safety', () => {
  beforeEach(() => { vi.clearAllMocks(); mocks.state.mockResolvedValue({ data: null, error: null }); mocks.persist.mockResolvedValue({ error: null }); });
  it('does not call AI again when a provider denial is stored', async () => {
    mocks.state.mockResolvedValue({ data: { message: 'Accès refusé' }, error: null });
    expect(await generateSeo('Un pipeline Python', new Request('http://localhost'))).toEqual({ error: 'Accès refusé' });
    expect(mocks.generate).not.toHaveBeenCalled();
  });
  it('persists provider access denials without replaying generation', async () => {
    mocks.generate.mockRejectedValue(new PermissionDeniedError('Accès fournisseur refusé', { httpStatus: 403, outcome: 'not_started', remote: { type: 'provider_access_denied' } }));
    expect(await generateSeo('Un pipeline Python', new Request('http://localhost'))).toEqual({ error: 'Accès fournisseur refusé' });
    expect(mocks.persist).toHaveBeenCalledWith(expect.objectContaining({ key: 'provider-denied', status: 403, message: 'Accès fournisseur refusé' }));
    expect(mocks.generate).toHaveBeenCalledTimes(1);
  });
  it('returns a validated suggestion from structured model output', async () => {
    mocks.generate.mockResolvedValue({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify({ title: ' Pipeline Python ', description: 'Construire un pipeline ETL.' }) }] }] });
    expect(await generateSeo('Un pipeline Python', new Request('http://localhost'))).toEqual({ suggestion: { title: 'Pipeline Python', description: 'Construire un pipeline ETL.' } });
    expect(mocks.generate).toHaveBeenCalledWith(expect.objectContaining({ model: 'openai/gpt-6-astra' }), expect.objectContaining({ signal: expect.any(AbortSignal) }));
  });
});