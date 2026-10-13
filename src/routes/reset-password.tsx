import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { SiteLayout } from '@/components/SiteLayout';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/reset-password')({
  head: () => ({ meta: [{ title: 'Mot de passe — Blog Merphy Mademba' }, { name: 'description', content: 'Récupérez votre accès à l’espace de rédaction.' }, { property: 'og:title', content: 'Mot de passe — Blog Merphy Mademba' }, { property: 'og:description', content: 'Récupération de votre accès auteur.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' }, { name: 'robots', content: 'noindex' }] }),
  component: ResetPassword,
});
function ResetPassword() {
  const [recovery, setRecovery] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { setRecovery(new URLSearchParams(window.location.hash.slice(1)).get('type') === 'recovery'); }, []);
  return <SiteLayout><section className="mx-auto max-w-md px-6 py-16"><h1 className="mb-8 text-3xl font-semibold">{recovery ? 'Nouveau mot de passe' : 'Mot de passe oublié'}</h1><form className="space-y-5" onSubmit={async e => { e.preventDefault(); setBusy(true); try {
    const { error } = recovery ? await supabase.auth.updateUser({ password }) : await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
    setMessage(error ? 'Demande impossible. Réessayez.' : recovery ? 'Mot de passe mis à jour.' : 'Si ce compte existe, un lien de récupération vous sera envoyé.');
  } catch { setMessage('Service indisponible. Réessayez.'); } finally { setBusy(false); } }}>
    {recovery ? <label className="block">Nouveau mot de passe<input type="password" minLength={8} required autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label> : <label className="block">Email<input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-md border border-input bg-background p-3" /></label>}
    <Button type="submit" disabled={busy}>{recovery ? 'Enregistrer' : 'Envoyer le lien'}</Button>{message && <p role="status">{message}</p>}<Button variant="link" asChild><Link to="/blog-admin">Retour à la connexion</Link></Button>
  </form></section></SiteLayout>;
}