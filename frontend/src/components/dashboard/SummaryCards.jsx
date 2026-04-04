import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import useStore from '../../store/useStore';

function AnimatedNumber({ value, duration = 1000 }) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const start = prevValue.current;
    const end = value;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
      else prevValue.current = value;
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <>{formatCurrency(display)}</>;
}

const cards = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    color: 'accent',
    gradient: 'from-accent/20 to-accent/5',
    border: 'rgba(108,99,255,0.3)',
    iconBg: 'rgba(108,99,255,0.15)',
    iconColor: '#6c63ff',
  },
  {
    key: 'income',
    label: 'Total Income',
    icon: TrendingUp,
    color: 'emerald',
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'rgba(16,185,129,0.3)',
    iconBg: 'rgba(16,185,129,0.15)',
    iconColor: '#10b981',
  },
  {
    key: 'expenses',
    label: 'Total Expenses',
    icon: TrendingDown,
    color: 'coral',
    gradient: 'from-coral-500/20 to-coral-500/5',
    border: 'rgba(244,63,94,0.3)',
    iconBg: 'rgba(244,63,94,0.15)',
    iconColor: '#f43f5e',
  },
];

export default function SummaryCards() {
  const { getSummary, transactions } = useStore();
  const summary = getSummary();

  // Calculate month-over-month change
  const now = new Date();
  const thisMonth = transactions.filter(t => {
    const d = new Date(t.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const lastMonth = transactions.filter(t => {
    const d = new Date(t.date);
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
  });

  const thisIncome = thisMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const lastIncome = lastMonth.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const thisExp = thisMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const lastExp = lastMonth.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const incomeChange = lastIncome ? ((thisIncome - lastIncome) / lastIncome * 100).toFixed(1) : 0;
  const expChange = lastExp ? ((thisExp - lastExp) / lastExp * 100).toFixed(1) : 0;

  const changes = {
    balance: null,
    income: { pct: incomeChange, positive: incomeChange >= 0 },
    expenses: { pct: expChange, positive: expChange < 0 }, // lower expenses is positive
  };

  const values = {
    balance: summary.balance,
    income: summary.income,
    expenses: summary.expenses,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ key, label, icon: Icon, border, iconBg, iconColor }) => {
        const change = changes[key];
        const value = values[key];

        return (
          <div
            key={key}
            className="card p-5 animate-slide-up"
            style={{ animationDelay: key === 'balance' ? '0ms' : key === 'income' ? '80ms' : '160ms' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: iconBg }}
              >
                <Icon size={20} style={{ color: iconColor }} />
              </div>
              {change && (
                <div
                  className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
                    change.positive ? 'text-emerald-500' : 'text-coral-500'
                  }`}
                  style={{ background: change.positive ? 'var(--emerald-light)' : 'var(--coral-light)' }}
                >
                  {change.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {Math.abs(change.pct)}%
                </div>
              )}
            </div>

            <p className="text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>
              {label}
            </p>
            <p className="stat-number text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              <AnimatedNumber value={value} />
            </p>

            {change && (
              <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
                vs last month
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
