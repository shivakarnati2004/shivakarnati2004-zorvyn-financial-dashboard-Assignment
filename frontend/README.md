# Zorvyn — Finance Dashboard (Frontend)

The React single-page application powering the Zorvyn Financial Dashboard.

---

## 🚀 Getting Started

> **Note:** This frontend is part of a full-stack monorepo. Run from the **root** directory for the best experience.

```bash
# From root:
npm run install:all
npm run dev
```

Or run the frontend standalone (API calls will fail without the backend):

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
npm run build     # production build
npm run preview   # preview production build
```

---

## 🧠 Architecture

| Layer | Responsibility |
|---|---|
| **Pages** | Route-level containers (`Dashboard`, `Transactions`, `Insights`, `Landing`) |
| **Components** | Modular, single-responsibility UI components grouped by domain |
| **Store** | Zustand store with `persist` middleware — manages app state + async API calls |
| **Services** | `api.js` — centralized fetch wrapper for all REST endpoints |
| **Utils** | `helpers.js` (formatting, export), `dataHelpers.js` (chart data transforms) |
| **Constants** | `categories.js` — category lists, icons, and color mappings |

---

## ✨ Features

### Core Dashboard
- Animated summary cards (Balance, Income, Expenses) with month-over-month % change
- Area chart: Income vs Expenses / Net Balance toggle (Recharts)
- Interactive donut chart with hover-to-highlight active shape
- Recent activity feed with "View all" navigation

### Transaction Management
- Full CRUD via REST API (`GET`, `POST`, `PUT`, `DELETE`)
- Search by description, category, or note
- Multi-filter: type (income/expense), category, date range (1m/3m/6m/all)
- Sort by date, amount, or category (ascending/descending)
- Export filtered results as CSV or JSON

### Insights
- Top spending category analysis
- Savings rate calculation
- Month-over-month expense trend
- Category ranking with progress bars
- Smart contextual observations

### UX Enhancements
- Dark / Light mode (persisted via localStorage)
- Role-Based UI: Admin (full CRUD) / Viewer (read-only)
- 60fps staggered entry animations
- Animated number counters with `requestAnimationFrame`
- Fully responsive with mobile sidebar drawer
- Graceful empty states with contextual CTAs
- Two-click delete confirmation with 3s timeout

### Landing Page
- Premium scrollytelling hero with 152-frame canvas animation
- Sections: Trusted Logos, Numbers, Solutions, Features, Process, Testimonials, About, CTA
- Full responsive layout with media queries

---

## 🏗️ Project Structure

```
frontend/src/
├── components/
│   ├── layout/           # Sidebar, Header
│   ├── dashboard/        # SummaryCards, BalanceTrend, SpendingBreakdown, RecentTransactions
│   ├── transactions/     # TransactionList, TransactionModal
│   ├── insights/         # InsightsPanel
│   └── ScrollCanvas.jsx  # Scroll-linked canvas animation for landing page
├── pages/                # Dashboard, Transactions, Insights, Landing
├── store/useStore.js     # Zustand store (state + async actions + selectors)
├── services/api.js       # REST API client
├── utils/                # Formatting, data transforms, export utilities
├── constants/            # Category definitions, icons, colors
├── App.jsx               # Root router + DashboardLayout
├── main.jsx              # Entry point (React 18 + BrowserRouter)
└── index.css             # Global styles + CSS variables + landing page styles
```

---

## 🔐 Role-Based UI

| Role   | Permissions                            |
|--------|----------------------------------------|
| Admin  | View + Add / Edit / Delete + Export    |
| Viewer | View only — all write actions hidden   |

Switch roles using the sidebar panel toggle (no login required for demo).

---

## 📦 Tech Stack

React 18 · Vite · Tailwind CSS · Zustand · Recharts · Framer Motion · Three.js · date-fns · Lucide React
