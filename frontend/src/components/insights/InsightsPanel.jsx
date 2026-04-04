import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, Award, AlertTriangle, Target, Zap } from 'lucide-react';
import { generateMonthlyData, generateCategoryData } from '../../utils/dataHelpers';
import { CATEGORY_ICONS } from '../../constants/categories';
import { formatCurrency } from '../../utils/helpers';
import useStore from '../../store/useStore';
import { format, startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';

function InsightCard({ icon: Icon, title, value, sub, variant = 1, color }) {
  const cls = `insight-card-${variant}`;
  return (
    <div className={`card p-5 ${cls} animate-slide-up`}>
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}20` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{title}</p>
          <p className="font-display font-bold text-xl leading-tight" style={{ color: 'var(--text-primary)' }}>{value}</p>
          {sub && <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{sub}</p>}
        </div>
      </div>
    </div>
  );
}

const CustomBarTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl px-4 py-3 text-sm shadow-lg border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
      <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(p.value, true)}</span>
        </div>
      ))}
    </div>
  );
};

export default function InsightsPanel() {
  const { transactions } = useStore();

  const now = new Date();
  const monthlyData = generateMonthlyData(transactions);
  const categoryData = generateCategoryData(transactions);

  // Top spending category
  const topCat = categoryData[0];

  // Current vs last month
  const thisMonthTxs = transactions.filter(t =>
    isWithinInterval(new Date(t.date), { start: startOfMonth(now), end: endOfMonth(now) })
  );
  const lastMonthTxs = transactions.filter(t =>
    isWithinInterval(new Date(t.date), { start: startOfMonth(subMonths(now, 1)), end: endOfMonth(subMonths(now, 1)) })
  );

  const thisIncome = thisMonthTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const thisExp = thisMonthTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const lastIncome = lastMonthTxs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const lastExp = lastMonthTxs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const expChange = lastExp ? ((thisExp - lastExp) / lastExp * 100).toFixed(1) : 0;
  const incomeChange = lastIncome ? ((thisIncome - lastIncome) / lastIncome * 100).toFixed(1) : 0;

  // Savings rate
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExp = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome ? (((totalIncome - totalExp) / totalIncome) * 100).toFixed(1) : 0;

  // Largest single transaction
  const largest = [...transactions].sort((a, b) => b.amount - a.amount)[0];

  // Category bar chart data
  const catBarData = categoryData.slice(0, 8).map(d => ({ name: d.name.split(' ')[0], value: d.value, color: d.color }));

  // Monthly comparison (last 3 months)
  const last3 = monthlyData.slice(-3);

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Insight cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          icon={Award}
          title="Top Spending Category"
          value={topCat ? `${CATEGORY_ICONS[topCat.name]} ${topCat.name}` : '—'}
          sub={topCat ? `${formatCurrency(topCat.value, true)} total` : 'No data'}
          variant={1}
          color="#6c63ff"
        />
        <InsightCard
          icon={Target}
          title="Savings Rate"
          value={`${savingsRate}%`}
          sub={savingsRate >= 20 ? '🎉 Great discipline!' : 'Aim for 20%+'}
          variant={2}
          color="#10b981"
        />
        <InsightCard
          icon={expChange >= 0 ? TrendingUp : TrendingDown}
          title="Expense Change"
          value={`${expChange >= 0 ? '▲' : '▼'} ${Math.abs(expChange)}%`}
          sub="vs last month"
          variant={expChange >= 0 ? 4 : 2}
          color={expChange >= 0 ? '#f43f5e' : '#10b981'}
        />
        <InsightCard
          icon={Zap}
          title="Largest Transaction"
          value={largest ? formatCurrency(largest.amount, true) : '—'}
          sub={largest ? `${largest.description.substring(0, 24)}...` : ''}
          variant={3}
          color="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly comparison bar */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
            Monthly Comparison
          </h3>
          <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Income vs Expenses — last 3 months</p>

          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={last3} barGap={4} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v, true)} width={55} />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: 'var(--accent-light)' }} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={36} />
              <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>

          {/* This vs Last month summary */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="rounded-xl p-3 text-center" style={{ background: 'var(--emerald-light)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--emerald)' }}>This Month Income</p>
              <p className="font-display font-bold" style={{ color: 'var(--emerald)' }}>{formatCurrency(thisIncome, true)}</p>
              <p className="text-xs mt-0.5 opacity-70" style={{ color: 'var(--emerald)' }}>
                {incomeChange >= 0 ? '▲' : '▼'} {Math.abs(incomeChange)}% vs last
              </p>
            </div>
            <div className="rounded-xl p-3 text-center" style={{ background: 'var(--coral-light)' }}>
              <p className="text-xs mb-1" style={{ color: 'var(--coral)' }}>This Month Expenses</p>
              <p className="font-display font-bold" style={{ color: 'var(--coral)' }}>{formatCurrency(thisExp, true)}</p>
              <p className="text-xs mt-0.5 opacity-70" style={{ color: 'var(--coral)' }}>
                {expChange >= 0 ? '▲' : '▼'} {Math.abs(expChange)}% vs last
              </p>
            </div>
          </div>
        </div>

        {/* Category breakdown bars */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-base mb-1" style={{ color: 'var(--text-primary)' }}>
            Expense Ranking
          </h3>
          <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>Top categories by total spend</p>

          <div className="space-y-3">
            {categoryData.slice(0, 7).map((cat, i) => {
              const pct = (cat.value / categoryData[0].value * 100).toFixed(0);
              return (
                <div key={cat.name} className="flex items-center gap-3">
                  <span className="text-xs font-mono w-4 text-right flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                    {i + 1}
                  </span>
                  <span className="text-base flex-shrink-0">{CATEGORY_ICONS[cat.name] || '📦'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{cat.name}</span>
                      <span className="text-xs font-bold ml-2 flex-shrink-0" style={{ color: 'var(--text-primary)' }}>
                        {formatCurrency(cat.value, true)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: cat.color, transition: 'width 0.8s ease' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Smart observation */}
          <div
            className="mt-4 rounded-xl p-3 flex items-start gap-2"
            style={{ background: 'var(--gold-light)', border: '1px solid rgba(245,158,11,0.2)' }}
          >
            <AlertTriangle size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 1 }} />
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--gold)' }}>Observation: </span>
              {topCat
                ? `${topCat.name} is your biggest expense at ${formatCurrency(topCat.value, true)}. ${
                    savingsRate < 20
                      ? "Consider setting a monthly budget to improve your savings rate."
                      : "You're managing well — keep it up!"
                  }`
                : 'Add more transactions to see personalized insights.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
