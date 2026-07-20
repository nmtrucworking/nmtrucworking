# JIN — Systems in Motion (Bilingual Portfolio)

> **Information Systems × Data × Product**  
> A high-performance, bilingual (EN/VI) personal portfolio website designed for evidence-driven showcase across Data Analysis, Data Science, Business Analysis, System Architecture, and Product Management roles.

---

## 🌟 Brand & Visual Principles

- **Visual Concept:** *Systems in Motion* — Editorial typography, controlled asymmetry, and high-contrast color fields.
- **Color Tokens:**
  - **Canvas:** `#F2F0E9` (Primary light background)
  - **Ink:** `#121310` (Primary text)
  - **Signal:** `#C8FF36` (Brand active accent)
  - **Graphite:** `#191B18` (Dark sections)
- **Typography:** `Bricolage Grotesque` (Headings), `Inter` (Body & UI), `IBM Plex Mono` (System & Technical Labels).
- **Motif:** `01. INPUT → 02. INTERPRET → 03. STRUCTURE → 04. BUILD → 05. EVALUATE`

---

## 🚀 Target Role Lenses

The portfolio provides dedicated filters and evidence-based case studies across 5 target roles:

1. **SA (System Analyst):** *Operations Hub* — Tenant-first multi-organization SaaS architecture, domain service boundaries, and RBAC data isolation.
2. **DS (Data Scientist):** *Customer Churn Intelligence* — End-to-end XGBoost predictive modeling with SHAP explainability and retention targeting.
3. **DA (Data Analyst):** *Supply Chain Analytics* — Inventory velocity control, dbt Star-Schema data models, and Power BI dashboards.
4. **PRODUCT (Product Manager):** *E-Commerce Growth Platform* — Funnel telemetry mapping, checkout conversion optimization, and RICE backlog prioritization.
5. **BA (Business Analyst):** Requirements baseline, process modeling, and business rule validation.

---

## 🏗️ Tech Stack & Architecture

- **Framework:** Next.js 14+ (App Router, Static Site Generation)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom CSS Variables (`tokens.css`, `globals.css`)
- **Motion & Icons:** Framer Motion, Lucide React
- **Content Engine:** JSON Content Model + AJV Draft 2020-12 Schema Validation
- **SEO & i18n:** Dynamic locale routing (`/en`, `/vi`), localized metadata, `sitemap.xml`, `robots.txt`

---

## 📂 Directory Structure

```text
jin-portfolio/
├── scripts/
│   └── validate-data.mjs          # AJV Schema validator script
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with font configuration
│   │   ├── page.tsx               # Root redirect to /[locale]
│   │   ├── sitemap.ts             # Localized sitemap generator
│   │   ├── robots.ts              # Robots.txt generator
│   │   └── [locale]/
│   │       ├── layout.tsx         # Locale layout (Header & Footer)
│   │       ├── page.tsx           # Home Page
│   │       ├── work/
│   │       │   ├── page.tsx       # Work Index (Filterable matrix)
│   │       │   └── [slug]/
│   │       │       └── page.tsx   # Project Case Study Page
│   │       ├── about/page.tsx     # About & Methodology
│   │       ├── contact/page.tsx   # Direct Channels & Inquiry Form
│   │       ├── cv/page.tsx        # Online CV & PDF Download
│   │       ├── privacy/page.tsx   # Privacy Notice
│   │       ├── not-found.tsx      # Localized 404
│   │       └── error.tsx          # Error Boundary
│   ├── components/
│   │   ├── brand/
│   │   │   └── SignalFlow.tsx     # Brand visual grammar component
│   │   └── layout/
│   │       ├── Header.tsx         # Navigation & Language switcher
│   │       └── Footer.tsx         # Availability badge & Links
│   ├── content/
│   │   ├── data/                  # Profile, Projects, Site & i18n dictionaries
│   │   ├── schemas/               # JSON Schemas (profile, projects, site)
│   │   ├── load.ts                # Data loader & TypeScript interfaces
│   │   └── selectors.ts           # Access selectors & filters
│   └── styles/
│       ├── tokens.css             # Design tokens
│       └── globals.css            # Typography clamps & utilities
```

---

## ⚙️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Validate JSON Data Schemas
```bash
npm run validate-data
```

### 4. Build Production Static Bundle
```bash
npm run build
```

---

## 📜 License & Attribution

Built for **JIN / Systems in Motion**. Designed and implemented following `JIN_Portfolio_Implementation_Docs`.
