# Stories by Foot - Tour & Travel Company | Domestic & International Tour Packages

**Walk the Road. Live the Story.**

Stories by Foot is a tour and travel company offering guided domestic and international tour packages, group trips, bike trips, and road trips. Travelers can browse upcoming trip departures, compare packages and itineraries, book tours online with multi-currency pricing, and get dedicated travel support.

**Website:** https://www.storiesbyfoot.com

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [SEO & Build Pipeline](#seo--build-pipeline)
- [Backend & API](#backend--api)
- [Deployment](#deployment)

---

## Features

### Public Features
- **Homepage (`Index.tsx`)**: Editorial hero carousel, featured category cards, Popular Destinations, Explore Categories (`ExploreCategories`), Hot Tours with budget/destination filters, Services, Vibe travel stories, and Nature Reimagined CTA.
- **Upcoming Community Trips (`Destinations.tsx`)**: Sticky filter sidebar (Domestic/International, price presets + dual-thumb price slider, departure month, multi-select duration & country checkboxes), custom sort dropdown, Grid/List view toggle, and FAQs.
- **Package Detail (`DestinationDetail.tsx`)**: Day-by-day itineraries, bike/seating options, inclusions/exclusions, gallery, and booking triggers.
- **Multi-Currency & Regional Pricing**: Automatic region detection (`/api/region`) and currency switching via `CurrencyContext`.
- **Help Centre & Support (`Support.tsx`, `SupportDetail.tsx`)**: Searchable support categories, subcategory FAQs, feedback voting, and support ticket submission.
- **Blog, About, Careers, Testimonials, Contact & Legal Pages**: Full informational and SEO-ready static/dynamic routes.

### User Features
- **Authentication**: Email/password signup & login, Google OAuth 2.0, and OTP verification.
- **Booking Workflow (`BookingPage.tsx`)**: Multi-step trip booking with coupon code validation and email notifications.
- **User Dashboard (`Dashboard.tsx`)**: View bookings, manage profile details, and store travel documents.

### Admin Features (`AdminDashboard.tsx`)
- **Overview & Reports**: Operational metrics and Recharts analytics.
- **Customer & User Management**: Search/filter customers, inspect user details/documents, reset passwords, suspend/reactivate or delete accounts, and export data to Excel (XLSX), with a horizontally scrollable Users List and sticky `Actions` column.
- **Bookings Management**: Track booking statuses (`confirmed`, `pending`, `cancelled`, `completed`).
- **Customer Feedback & Complaints**: Moderate reviews, testimonials, and complaints.
- **Coupons Management**: Create, edit, copy, and delete discount coupons with package-level applicability.
- **OTP Management & Settings**: Manage OTPs and notification preferences.

---

## Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite (`@vitejs/plugin-react-swc`)
- **Routing**: React Router DOM v6
- **Styling & UI**: Tailwind CSS, Radix UI, shadcn/ui, Lucide React
- **State & Data**: React Context API (`AuthContext`, `CurrencyContext`), TanStack React Query (`@tanstack/react-query`)
- **Forms & Validation**: React Hook Form + Zod
- **Charts, Export & Notifications**: Recharts, `xlsx`, Sonner, `date-fns`, `libphonenumber-js`
- **Analytics**: `@vercel/analytics`, `@vercel/speed-insights`

### Backend & Services
- **Runtime & Server**: Node.js + Express (`server.js`, `api/index.ts`, `api/region.ts`)
- **Database**: `sql.js` (SQLite for local development) / PostgreSQL (`pg`) for production
- **Auth & Security**: `bcryptjs`, Google OAuth (`@react-oauth/google`)
- **Email**: EmailJS, Nodemailer, Resend

---

## Project Structure

```text
storyyadmin/
├── api/                              # Vercel serverless API entry points
│   ├── index.ts                      # Express app handler
│   └── region.ts                     # User region detection endpoint
├── backend/
│   ├── db/                           # Database abstraction (SQLite / PostgreSQL + schema)
│   ├── middleware/                   # Auth & request middleware
│   └── routes/                       # Express route handlers
│       ├── admin.js
│       ├── auth.js
│       ├── bookings.js
│       ├── coupons.js
│       └── testimonials.js
├── public/                           # Static assets (images, favicons, robots/sitemap output)
├── scripts/                          # Build-time SEO & prerender scripts
│   ├── generate-sitemap.cjs          # Generates XML sitemap
│   ├── prerender.cjs                 # Prerenders static HTML routes
│   ├── seo-data.cjs                  # Route SEO metadata definitions
│   └── indexnow.cjs                  # IndexNow search engine ping script
├── src/
│   ├── components/                   # Reusable UI, navigation, modals & dashboard views
│   │   ├── booking/                  # Booking flow components
│   │   ├── dashboardViews/           # Admin & user dashboard views
│   │   ├── destinationDetail/        # Package detail subcomponents
│   │   └── ui/                       # shadcn/ui primitives
│   ├── context/                      # AuthContext, CurrencyContext
│   ├── data/                         # Destinations, support topics & static data
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # API client, SEO helpers, currency & blog utilities
│   ├── pages/                        # Route-level page components
│   ├── App.tsx                       # Router & app shell
│   ├── main.tsx                      # React entry point
│   └── index.css                     # Global Tailwind styles
├── index.html                        # Vite HTML entry point
├── package.json                      # Dependencies & npm/pnpm scripts
├── server.js                         # Local Express API server
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
└── vite.config.ts                    # Vite configuration
```

---

## Getting Started

### Prerequisites
- **Node.js** 18+
- **pnpm** (or npm)

### Installation

```bash
pnpm install
```

### Environment Variables

Configure your `.env` file with the required keys (as applicable to your environment):
- `VITE_GOOGLE_CLIENT_ID` — Google OAuth client ID
- `DATABASE_URL` — PostgreSQL connection string (optional for local dev; falls back to SQLite)
- Email provider credentials (EmailJS / Nodemailer / Resend)

### Running Locally

Start both the Express backend server and Vite frontend concurrently:

```bash
pnpm dev
```

Or run them separately:

```bash
pnpm dev:server
pnpm dev:frontend
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Runs Express server (`node server.js`) and Vite dev server concurrently |
| `pnpm dev:frontend` | Runs only the Vite frontend dev server |
| `pnpm dev:server` | Runs only the Node/Express backend (`server.js`) |
| `pnpm build` | Generates sitemap (`scripts/generate-sitemap.cjs`), builds Vite bundle, and runs `scripts/prerender.cjs` |
| `pnpm build:dev` | Same build pipeline with `--mode development` |
| `pnpm preview` | Previews the production build locally |
| `pnpm lint` | Runs ESLint across the repository |

---

## SEO & Build Pipeline

Production builds automatically run:
1. `node scripts/generate-sitemap.cjs` — Updates the sitemap from destination, blog, and static routes.
2. `vite build` — Bundles the React application.
3. `node scripts/prerender.cjs` — Prerenders SEO-critical routes with matching meta tags and structured data (`src/lib/seoShared.ts`).

---

## Backend & API

- **Local Development**: `server.js` serves the Express API routes (`admin`, `auth`, `bookings`, `coupons`, `testimonials`).
- **Production (Vercel)**: `api/index.ts` and `api/region.ts` handle serverless API requests.

---

## Deployment

The project is configured for **Vercel** (`vercel.json`) with static Vite build output, prerendered HTML routes, and serverless `/api/*` functions. Run `pnpm build` to verify the full production build locally before deploying.
