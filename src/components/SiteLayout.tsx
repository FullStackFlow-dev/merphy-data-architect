import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, Download } from "lucide-react";
import cvAsset from "../assets/cv.pdf.asset.json";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/projects", label: "Projets" },
  { to: "/demos", label: "Démos IA" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "À propos" },
  { to: "/contact", label: "Contact" },
] as const;

export const LINKEDIN_URL = "https://www.linkedin.com/in/merph-dev";
export const EMAIL = "merphy.softwareengineer@gmail.com";

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 h-16 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
          <Link to="/" className="font-semibold tracking-tight text-lg truncate">
            <span className="text-primary">◆</span> Merphy Mademba
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a
              href={cvAsset.url}
              download="CV-Merphy.pdf"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-accent"
            >
              <Download className="h-4 w-4" /> CV
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Me contacter
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-accent"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border/60 bg-background">
            <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1 text-sm">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2.5 text-muted-foreground hover:bg-accent hover:text-foreground"
                  activeProps={{ className: "text-foreground font-medium bg-accent/50 rounded-md px-2 py-2.5" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={cvAsset.url}
                download="CV-Merphy.pdf"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-border px-4 py-2.5 font-medium hover:bg-accent"
              >
                <Download className="h-4 w-4" /> Télécharger le CV
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 font-medium text-primary-foreground hover:opacity-90"
              >
                Me contacter
              </Link>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 mt-24">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row gap-4 justify-between text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} — Merphy Mademba.</div>
          <div className="flex flex-wrap gap-5">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
            <a href={`mailto:${EMAIL}`} className="hover:text-foreground">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
