# R Land Development Inc. Website

Official website for **R Land Development Inc.**, a Philippine property developer and subsidiary of RMR Capital Inc. Built with Next.js 15 and TypeScript, the platform covers property listings, a buyer's guide, promo pages, a loan calculator.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (^16.1.6 / App Router) |
| Language | TypeScript (^5) |
| Styling | Tailwind CSS (^4) |
| ORM | Drizzle ORM (^0.45.1) |
| Database | PostgreSQL via Neon Serverless |
| Caching | Redis (^5.11.0) |
| UI Components | Radix UI, shadcn/ui, Lucide React |
| Animation | Motion (^12.36.0), Embla Carousel |
| Forms / CAPTCHA | hCaptcha (`@hcaptcha/react-hcaptcha`) |
| Data Fetching | TanStack React Query (^5) |
| Testing | Jest, Playwright |
| Linting / Formatting | ESLint, Prettier, Husky, lint-staged |

---

## Prerequisites

- **Node.js** >= 20
- **npm** >= 10
- A **PostgreSQL** database (Neon recommended)
- A **Redis** instance
- An **hCaptcha** account (site key + secret key)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dazedmind/rland.git
cd rland
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file at the project root. The following variables are required:

```env
# --- Deployment & Analytics ---
# Google Tag Manager / GA4 Measurement ID
GA_MEASUREMENT_ID=GTM-XXXXXXXX

# --- Database (PostgreSQL) ---
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# --- Authentication (Better-Auth) ---
BETTER_AUTH_SECRET=your_super_secret_random_string
BETTER_AUTH_URL=http://localhost:3000

# --- External APIs ---
# IMPORTANT: API Key for RLINK integration
RLINK_API_KEY=your_rlink_api_key_here

# --- Security & Bot Protection (hCaptcha) ---
HCAPTCHA_SITE_KEY=your_hcaptcha_site_key
HCAPTCHA_SECRET_KEY=your_hcaptcha_secret_key

# --- Cache & Rate Limiting (Redis) ---
REDIS_URL=redis://localhost:6379
REDIS_USERNAME=default
REDIS_PASSWORD=your_redis_password
REDIS_HOST=your_redis_host_address
REDIS_PORT=6379
```

> **Note:** Exact variable names not confirmed beyond `DATABASE_URL`. Check your team's secret management or ask a maintainer for the full `.env.example`. [Unverified — additional variables may exist]

### 4. Set up the database

Generate and run migrations using Drizzle Kit:

```bash
# Generate migration files from schema
npx drizzle-kit generate

# Push schema to the database
npx drizzle-kit push
```

Drizzle reads from two schema files:
- `db/schema.ts` — main tables and enums
- `db/auth-schema.ts` — auth-related tables

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format all files with Prettier |
| `npm run prettier:check` | Check formatting without writing |
| `npm run test` | Run Jest unit tests |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run test:coverage` | Run Jest with coverage report |
| `npm run clear-cache` | Clear Redis cache via script |

---

## Database Schema Overview

The schema (`db/schema.ts`) defines the following enums and tables:

**Enums include:** `user_status`, `user_access`, `lead_status`, `lead_stage`, `inquiry_subject`, `inquiry_source`, `inventory_status`, `inventory_stage`, `inventory_type`, `broker_status`, `article_type`, `media_format`, `career_status`, `reservation_status`

> [Unverified] Full table definitions are in `db/schema.ts` and `db/auth-schema.ts`. Refer to those files for column-level detail.

---

## Caching Strategy

API routes use Redis for response caching. The pattern used:

1. On GET request, check Redis for a cached response.
2. If cache hit, return immediately.
3. If cache miss, query the database, store result in Redis with a 1-hour TTL (`EX: 3600`), then return.
4. Redis errors are caught and logged — the app falls back to the database without crashing.

To clear the cache manually:

```bash
npm run clear-cache
```

---

## hCaptcha Integration

hCaptcha is used on the contact form and other user-facing forms. For local development:

1. Log in to your hCaptcha dashboard.
2. Add `localhost` to the **Allowed Domains** list for your site key.
3. Set the difficulty to something other than **Always Pass** if you need to test real verification flow.
4. Set `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` and `HCAPTCHA_SECRET_KEY` in your `.env`.

---

## Testing

### Unit Tests (Jest)

```bash
npm run test
npm run test:watch
npm run test:coverage
```

Jest is configured with `jest-environment-jsdom` and `@testing-library/react` for component testing.

### End-to-End Tests (Playwright)

```bash
npx playwright install --with-deps
npx playwright test
```

Playwright runs tests against Chromium, Firefox, and WebKit (Desktop). Test files live in the `./tests` directory. An HTML report is generated after each run.

---

## CI / CD

### GitHub Actions

Two workflows are configured under `.github/workflows/`:

**`prettier.yaml`** — Runs on push/PR to `main` or `master`. Formats code with Prettier and auto-commits changes.

**`playwright.yml`** — Runs on push/PR to `main` or `master`. Installs Playwright browsers and runs E2E tests. Uploads the Playwright HTML report as an artifact (retained 30 days).

---

## Code Quality

- **Husky** runs pre-commit hooks via `lint-staged`.
- **Prettier** is used for consistent formatting across the project.
- **ESLint** with `eslint-config-next` for Next.js-aware linting rules.

---

## Project Structure (High-Level)

```
rland/
├── app/                  # Next.js App Router (pages, API routes)
│   └── api/              # API route handlers
├── components/           # Shared UI components
│   ├── layout/           # Layout-level components (Navbar, Footer, ContactForm)
│   └── ui/               # Base UI primitives
├── db/                   # Drizzle schema files
│   ├── schema.ts
│   └── auth-schema.ts
├── drizzle/              # Generated migration files
├── lib/                  # Utility modules (db client, Redis client, API auth)
├── scripts/              # Utility scripts (e.g., clear-cache.ts)
├── tests/                # Playwright E2E tests
├── drizzle.config.ts     # Drizzle Kit config
├── playwright.config.ts  # Playwright config
└── .github/workflows/    # CI/CD pipelines
```

> [Unverified] Directory structure is inferred from project files found in the repository. Exact structure may differ.

---

## Contributing

1. Branch off `main` for all feature work.
2. Run `npm run lint` and `npm run prettier:check` before pushing.
3. Husky will enforce lint-staged checks on commit.
4. Open a pull request — CI will run Prettier and Playwright checks automatically.

---

## License

Private repository — R Land Development Inc. / RMR Capital Inc. All rights reserved.