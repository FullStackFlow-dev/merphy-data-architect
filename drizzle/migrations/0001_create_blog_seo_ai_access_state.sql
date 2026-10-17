CREATE TABLE public.blog_seo_ai_state (key text PRIMARY KEY, status integer NOT NULL, message text NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.blog_seo_ai_state TO service_role;
ALTER TABLE public.blog_seo_ai_state ENABLE ROW LEVEL SECURITY;