import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "../components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Portfolio" },
      { name: "description", content: "Prenez contact pour un projet dev, data ou IA." },
      { property: "og:title", content: "Contact — Portfolio" },
      { property: "og:description", content: "Prenez contact pour un projet." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-6 pt-20 pb-24">
        <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
          Contact
        </p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Discutons de votre projet
        </h1>
        <p className="mt-4 text-muted-foreground">
          Envoyez-moi un message ou contactez-moi directement.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3 text-sm">
          <a href="mailto:hello@example.com" className="rounded-lg border border-border bg-card p-4 hover:border-primary/40">
            <div className="text-muted-foreground text-xs">Email</div>
            <div className="mt-1 font-medium">hello@example.com</div>
          </a>
          <a href="#" className="rounded-lg border border-border bg-card p-4 hover:border-primary/40">
            <div className="text-muted-foreground text-xs">LinkedIn</div>
            <div className="mt-1 font-medium">/in/votre-profil</div>
          </a>
          <a href="#" className="rounded-lg border border-border bg-card p-4 hover:border-primary/40">
            <div className="text-muted-foreground text-xs">GitHub</div>
            <div className="mt-1 font-medium">@votre-handle</div>
          </a>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="mt-10 space-y-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Nom</label>
              <input
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Sujet</label>
            <input
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message</label>
            <textarea
              required
              className="mt-1 w-full min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Envoyer
          </button>
          {sent && (
            <p className="text-sm text-muted-foreground">
              Merci — message envoyé (démo, non branché sur un backend).
            </p>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}
