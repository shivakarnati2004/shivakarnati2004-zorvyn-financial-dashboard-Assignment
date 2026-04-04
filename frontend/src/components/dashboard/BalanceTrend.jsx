import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { generateMonthlyData } from '../../utils/dataHelpers';
import { formatCurrency } from '../../utils/helpers';
import useStore from '../../store/useStore';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3 text-sm shadow-lg border"
      style={{ background: 'var(--bg-card)', borderColor: 'var(--border)', minWidth: 160 }}
    >
      <p className="font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: 'var(--text-secondary)' }} className="capitalize">{p.name}:</span>
          <span className="font-semibold ml-auto" style={{ color: 'var(--text-primary)' }}>
            {formatCurrency(p.value, true)}
          </span>
        </div>
      ))}
    </div>
  );
};

const VIEWS = ['Income vs Expenses', 'Net Balance'];

export default function BalanceTrend() {
  const { transactions } = useStore();
  const [view, setView] = useState(0);
  const data = generateMonthlyData(transactions);

  return (
    <div className="card p-5 animate-slide-up" style={{ animationDelay: '80ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            Monthly Trend
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Last 6 months overview
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          {VIEWS.map((v, i) => (
            <button
              key={v}
              onClick={() => setView(i)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: view === i ? 'var(--accent)' : 'transparent',
                color: view === i ? 'white' : 'var(--text-muted)',
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        {view === 0 ? (
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v, true)} width={55} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--accent)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area type="monotone" dataKey="income" name="Income" stroke="#10b981" strokeWidth={2} fill="url(#incomeGrad)" dot={false} activeDot={{ r: 4, fill: '#10b981' }} />
            <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#f43f5e" strokeWidth={2} fill="url(#expGrad)" dot={false} activeDot={{ r: 4, fill: '#f43f5e' }} />
          </AreaChart>
        ) : (
          <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6c63ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6c63ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCurrency(v, true)} width={55} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--accent)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <ReferenceLine y={0} stroke="var(--border)" strokeDasharray="4 4" />
            <Area type="monotone" dataKey="balance" name="Balance" stroke="#6c63ff" strokeWidth={2.5} fill="url(#balGrad)" dot={false} activeDot={{ r: 5, fill: '#6c63ff', stroke: 'white', strokeWidth: 2 }} />
          </AreaChart>
        )}
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-3">
        {view === 0 ? (
          <>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-3 h-0.5 rounded bg-emerald-500 inline-block" />
              Income
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span className="w-3 h-0.5 rounded bg-coral-500 inline-block" />
              Expenses
            </div>
          </>
        ) : (
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="w-3 h-0.5 rounded bg-accent inline-block" />
            Net Balance
          </div>
        )}
      </div>
    </div>
  );
}
