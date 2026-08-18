# Portfolio

A static security portfolio built with [Astro](https://astro.build) + Tailwind CSS.
No backend, no analytics, nothing that talks to your home infrastructure — safe to
hand a link to anyone.

## Before you publish

Everything identity-related lives in one file: **`src/data/site.ts`**.

- [ ] `handle` — replace `KESTREL` with your actual handle/alias
- [ ] `bio` — replace with your real bio
- [ ] `email`, `github`, `linkedin` — replace the placeholder links
- [ ] `resumeHref` — drop a real `resume.pdf` into `public/` (the button links to
      `/resume.pdf`; until you add the file, it 404s)
- [ ] `capabilities` — adjust the skills grid to match what you actually want to lead
      with

Case studies live in `src/content/projects/*.md` and are written from what's in your
memory notes about the detection lab, recon pipeline, Argus, and homelab — read
through each one and correct anything that's inaccurate or that you'd rather not
disclose publicly. They're deliberately written **without** real IPs, hostnames, or
your homelab's actual domain — keep it that way if you edit them.

The one post in `src/content/writing/` is real, generalized technical content (no
identifying infra details) — add more the same way, one `.md` file per post.

## Local development

```bash
npm install
npm run dev
```

## Deploying to GitHub Pages

1. Create a new **public** GitHub repo (keeping this decoupled from your homelab
   means it should *not* live in any repo tied to your existing infrastructure).
2. In `astro.config.mjs`, set `site` to `https://<your-github-username>.github.io`.
   If the repo is not named `<your-github-username>.github.io` (i.e. it's a project
   site, not a user site), also uncomment `base` and set it to `/<repo-name>`.
3. Push this project to the repo's `main` branch.
4. In the repo's Settings → Pages, set **Source** to "GitHub Actions" (the workflow
   at `.github/workflows/deploy.yml` handles the rest — it builds and deploys on
   every push to `main`).
5. Your site will be live at the URL from step 2 within a minute or two of pushing.

## Structure

- `src/data/site.ts` — identity, contact info, skills (single source of truth)
- `src/content/projects/` — case studies (Astro content collection)
- `src/content/writing/` — blog-style posts (Astro content collection)
- `src/components/` — Hero, About, CaseFile card, Writing list, Header, Footer,
  DotField (the ambient signal-grid background)
- `src/layouts/` — page shells, including the case-file and writing detail layouts
- `src/pages/` — home page + dynamic `[...slug]` routes for projects/writing
