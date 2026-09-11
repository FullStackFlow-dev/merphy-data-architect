import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download } from "lucide-react";
import { SiteLayout, LINKEDIN_URL, EMAIL } from "../components/SiteLayout";
import cvAsset from "../assets/cv.pdf.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Portfolio" },
      { name: "description", content: "Prenez contact pour un projet Python, data analyse ou data engineering." },
      { property: "og:title", content: "Contact — Portfolio" },
      { property: "og:description", content: "Prenez contact pour un projet Python, data analyse ou data engineering." },
    ],
  }),
  component: ContactPage,
});

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdadyejk";

function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

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
          <a href={`mailto:${EMAIL}`} className="rounded-lg border border-border bg-card p-4 hover:border-primary/40">
            <div className="text-muted-foreground text-xs">Email</div>
            <div className="mt-1 font-medium break-all">{EMAIL}</div>
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-border bg-card p-4 hover:border-primary/40"
          >
            <div className="text-muted-foreground text-xs">LinkedIn</div>
            <div className="mt-1 font-medium">/in/merph-dev</div>
          </a>
          <a
            href={cvAsset.url}
            download="CV-Merphy.pdf"
            className="rounded-lg border border-border bg-card p-4 hover:border-primary/40"
          >
            <div className="text-muted-foreground text-xs">CV</div>
            <div className="mt-1 font-medium inline-flex items-center gap-1.5">
              <Download className="h-4 w-4" /> Télécharger
            </div>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="name">Nom</label>
              <input
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="subject">Sujet</label>
            <input
              id="subject"
              name="subject"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              className="mt-1 w-full min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Envoi…" : "Envoyer"}
          </button>
          {status === "sent" && (
            <p className="text-sm text-muted-foreground">
              Merci — votre message a bien été envoyé.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-destructive">
              Une erreur est survenue. Réessayez ou écrivez-moi directement par email.
            </p>
          )}
        </form>
      </section>
    </SiteLayout>
  );
}
