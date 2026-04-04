# Zorvyn — Finance Dashboard

A clean, interactive, production-grade finance dashboard built with React, Tailwind CSS, Recharts, and Zustand.

---

## 🚀 Getting Started

```bash
cd finance-dashboard
npm install
npm run dev
```
Open http://localhost:5173

```bash
npm run build   # production build
npm run preview # preview prod build
```

---

## 🧠 Approach

Broke the problem into self-contained layers:
1. **Data layer** — 52 mock transactions (6 months, INR, realistic Indian finance context)
2. **State layer** — Zustand with localStorage persistence; computed getters keep components clean
3. **Component layer** — Modular, single-responsibility components; no prop drilling
4. **Design layer** — CSS custom properties for theming, Sora + DM Sans fonts, responsive grid

---

## ✨ Features

### Core
- Dashboard with animated summary cards (Balance, Income, Expenses) + MoM % change
- Area chart: Income vs Expenses / Net Balance toggle
- Interactive donut chart with hover-to-highlight
- Transactions table: search, multi-filter, sort, date range
- Insights: top category, savings rate, expense trend, category ranking
- Role-Based UI: Admin (full CRUD) / Viewer (read-only), switchable from sidebar

### Enhancements
- Dark / Light mode (persisted)
- Data persistence via localStorage
- Export filtered transactions as CSV or JSON
- Staggered animations and animated number counters
- Fully responsive with mobile sidebar drawer
- Graceful empty states with contextual CTAs

---

## 🏗️ Structure

```
src/
├── components/
│   ├── layout/         # Sidebar, Header
│   ├── dashboard/      # SummaryCards, BalanceTrend, SpendingBreakdown, RecentTransactions
│   ├── transactions/   # TransactionList, TransactionModal
│   └── insights/       # InsightsPanel
├── data/mockData.js    # 52 transactions + chart data generators
├── pages/              # Dashboard, Transactions, Insights
├── store/useStore.js   # Zustand store
└── utils/helpers.js    # formatCurrency, export utils
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

React 18 · Vite · Tailwind CSS · Zustand · Recharts · date-fns · Lucide React
