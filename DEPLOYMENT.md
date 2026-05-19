# Deployment — `michaelgichamu.tech`

This portfolio is a Next.js 16 app. The cleanest production setup is
**Vercel for hosting + Hostinger for DNS** — that's the path this guide
walks you through.

> Why not host the Next.js app directly on Hostinger? Hostinger shared
> hosting doesn't run Node.js. You'd need a Hostinger VPS, manual PM2 +
> nginx setup, and you'd still rebuild what Vercel gives you for free.
> The professional move with a Hostinger-owned domain is to keep the
> domain on Hostinger and point DNS at Vercel.

---

## Architecture

```
GitHub ────────► CI (GitHub Actions)
                    │
                    ▼
                Tests pass ✓
                    │
                    ▼
GitHub ────────► Vercel (build + deploy)
                    │
                    ▼
            michaelgichamu.tech
                    ▲
Hostinger DNS ──────┘
```

- **GitHub Actions** runs lint, type-check, Vitest unit/integration, build,
  and Playwright E2E on every push.
- **Vercel** runs its own build and deploys. You configure Vercel to only
  promote to production after the GitHub CI status check passes.
- **Hostinger DNS** points `michaelgichamu.tech` and `www.michaelgichamu.tech`
  to Vercel.

---

## Step 1 — Push the project to GitHub

```bash
# From the project directory
git init
git add .
git commit -m "feat: initial portfolio commit"

# Create a new GitHub repo (UI or `gh` CLI), then:
git remote add origin git@github.com:<your-username>/michael-portfolio.git
git branch -M main
git push -u origin main
```

The CI workflow at `.github/workflows/ci.yml` will start running on the
first push. You can monitor it under the repo's **Actions** tab.

---

## Step 2 — Connect Vercel

1. Go to <https://vercel.com> and sign up with your GitHub account.
2. Click **Add New… → Project**.
3. Select the `michael-portfolio` repository.
4. Vercel auto-detects Next.js — leave the defaults:
   - Framework Preset: **Next.js**
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
5. Click **Deploy**.

Vercel gives you a preview URL like `michael-portfolio-xxx.vercel.app`
within a minute or two. Confirm it works.

### Make CI a required check before production deploys

In Vercel, open your project → **Settings → Git**:

- Under **Ignored Build Step**, leave default (always build).
- Under **Deployment Protection**, set **"Production deployments require
  successful checks"** if available, or rely on GitHub branch protection
  (see Step 4).

---

## Step 3 — Point `michaelgichamu.tech` from Hostinger to Vercel

### 3a. Add the domain in Vercel

1. Vercel project → **Settings → Domains**.
2. Add `michaelgichamu.tech` — click **Add**.
3. Vercel asks you to add DNS records. It typically shows two options:
   - **A record** for the apex (`michaelgichamu.tech` → `76.76.21.21`)
   - **CNAME** for `www` (`www.michaelgichamu.tech` → `cname.vercel-dns.com`)

   Copy these exactly as Vercel shows them.

### 3b. Add the records in Hostinger

1. Log in to Hostinger → **Domains → michaelgichamu.tech → DNS / Nameservers**.
2. If your domain is using Hostinger's default nameservers, you can edit
   the DNS Zone directly. If it's pointed somewhere else, change the
   nameservers back to Hostinger's first.
3. Remove any existing **A** record on `@` (apex) that points to Hostinger's
   shared hosting IP, and any **CNAME** on `www` pointing to Hostinger.
4. Add the records Vercel gave you:

   | Type  | Name | Points to             | TTL  |
   |-------|------|-----------------------|------|
   | A     | @    | `76.76.21.21`         | 3600 |
   | CNAME | www  | `cname.vercel-dns.com.` | 3600 |

5. Save.

### 3c. Wait for propagation + Vercel verification

- DNS propagation takes anywhere from a few minutes to ~30 minutes.
- In Vercel's Domains panel, the domain will go from **Invalid Configuration**
  → **Valid Configuration** → **Production**.
- Vercel automatically issues a free Let's Encrypt SSL certificate.

You can check propagation with:

```bash
dig michaelgichamu.tech +short
# Expect: 76.76.21.21
```

---

## Step 4 — Lock down production with branch protection (optional but recommended)

So nothing reaches `michaelgichamu.tech` without CI passing:

1. GitHub repo → **Settings → Branches → Add branch protection rule**.
2. Branch name pattern: `main`.
3. Enable:
   - **Require a pull request before merging**
   - **Require status checks to pass before merging**
     - Select the CI checks: `Lint · Typecheck · Unit`, `Production build`, `E2E (Playwright)`.
4. Save.

Now every change has to go via a pull request that passes the full test
suite before it can be merged to `main` — and only `main` deploys to
production via Vercel.

---

## Step 5 — Verify the live site

After DNS propagates:

- <https://michaelgichamu.tech> — main site
- <https://www.michaelgichamu.tech> — should redirect to apex (Vercel handles this)
- Favicon — the GeometricBrain icon at `app/icon.png`
- Open-graph share preview — check on <https://www.opengraph.xyz/url/https%3A%2F%2Fmichaelgichamu.tech>

---

## Development workflow from here

```bash
# Day-to-day
npm run dev                 # local dev server
npm run lint                # ESLint
npm run typecheck           # tsc --noEmit
npm run test:unit           # Vitest (unit + integration)
npm run test:e2e            # Playwright (builds + runs)
npm run test                # everything
```

Push to `main` → CI runs → Vercel deploys to production.
Push to a feature branch → CI runs → Vercel deploys a **preview** URL.

That's the loop.

---

## Troubleshooting

- **"Invalid Configuration" stays red in Vercel:** double-check the A record
  exact value `76.76.21.21` (a single A record, not multiple) and that the
  CNAME on `www` doesn't have a stray dot or wrong target.
- **Mixed-content warnings:** Vercel handles TLS automatically; if you see
  them, hard-refresh — the cert may still be issuing.
- **CI failing on Playwright timeouts:** Playwright in CI runs `npm run build`
  inside its `webServer.command`. If a build is slow on a free runner, bump
  `webServer.timeout` in `playwright.config.ts`.
- **DNS won't update:** Hostinger DNS Zone editor sometimes caches. Log out,
  log back in, or wait 30 min.
