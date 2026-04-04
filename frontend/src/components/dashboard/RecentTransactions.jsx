import React from 'react';
import { ArrowRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { CATEGORY_ICONS } from '../../constants/categories';
import useStore from '../../store/useStore';

export default function RecentTransactions() {
  const { transactions, setActiveTab } = useStore();
  const recent = [...transactions].slice(0, 6);

  return (
    <div className="card animate-slide-up" style={{ animationDelay: '240ms' }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <h3 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
          Recent Activity
        </h3>
        <button
          onClick={() => setActiveTab('transactions')}
          className="flex items-center gap-1 text-xs font-semibold transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          View all <ArrowRight size={12} />
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="empty-state">
          <p style={{ color: 'var(--text-muted)' }} className="text-sm">No transactions yet</p>
        </div>
      ) : (
        <div>
          {recent.map((tx, i) => (
            <div
              key={tx.id}
              className="transaction-row flex items-center gap-3 px-5 py-3.5"
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                style={{ background: tx.type === 'income' ? 'var(--emerald-light)' : 'var(--coral-light)' }}
              >
                {CATEGORY_ICONS[tx.category] || '📦'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                  {tx.description}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {tx.category} · {formatDate(tx.date)}
                </p>
              </div>

              {/* Amount */}
              <p
                className="font-mono font-semibold text-sm flex-shrink-0"
                style={{ color: tx.type === 'income' ? 'var(--emerald)' : 'var(--coral)' }}
              >
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, true)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
