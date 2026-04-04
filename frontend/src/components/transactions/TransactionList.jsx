import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Pencil, Trash2, ChevronDown, X, Plus } from 'lucide-react';
import { CATEGORIES, CATEGORY_ICONS } from '../../constants/categories';
import { formatCurrency, formatDate } from '../../utils/helpers';
import useStore from '../../store/useStore';

function FilterBar() {
  const { filters, setFilter, resetFilters } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const allCats = [...CATEGORIES.income, ...CATEGORIES.expense];
  const hasActiveFilters = filters.type !== 'all' || filters.category !== 'all' || filters.dateRange !== '6m';

  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {/* Search */}
        <div className="relative w-full sm:flex-1 sm:min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
          <input
            className="input-base pl-9"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilter('search', e.target.value)}
          />
        </div>

        {/* Type pills */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter('type', t)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200"
              style={{
                background: filters.type === t
                  ? t === 'income' ? '#10b981' : t === 'expense' ? '#f43f5e' : 'var(--accent)'
                  : 'transparent',
                color: filters.type === t ? 'white' : 'var(--text-muted)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* More filters toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all border ${hasActiveFilters ? 'border-accent/50' : 'border-themed'}`}
          style={{ color: hasActiveFilters ? 'var(--accent)' : 'var(--text-secondary)', background: hasActiveFilters ? 'var(--accent-light)' : 'transparent' }}
        >
          <SlidersHorizontal size={14} />
          Filters
          {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
        </button>

        {hasActiveFilters && (
          <button onClick={resetFilters} className="flex items-center gap-1 px-2 py-2 rounded-xl text-xs" style={{ color: 'var(--text-muted)' }}>
            <X size={12} /> Clear
          </button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 rounded-xl border animate-slide-up" style={{ borderColor: 'var(--border)', background: 'var(--bg-secondary)' }}>
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Category</label>
            <select className="input-base text-xs py-2" value={filters.category} onChange={(e) => setFilter('category', e.target.value)}>
              <option value="all">All Categories</option>
              {allCats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Date Range</label>
            <select className="input-base text-xs py-2" value={filters.dateRange} onChange={(e) => setFilter('dateRange', e.target.value)}>
              <option value="1m">Last 1 Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="all">All Time</option>
            </select>
          </div>

          {/* Sort by */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Sort By</label>
            <select className="input-base text-xs py-2" value={filters.sortBy} onChange={(e) => setFilter('sortBy', e.target.value)}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>

          {/* Sort order */}
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-muted)' }}>Order</label>
            <select className="input-base text-xs py-2" value={filters.sortOrder} onChange={(e) => setFilter('sortOrder', e.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

function TransactionRow({ tx }) {
  const { role, openModal, deleteTransaction } = useStore();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      deleteTransaction(tx.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className="transaction-row flex items-center gap-3 px-5 py-3.5 group">
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: tx.type === 'income' ? 'var(--emerald-light)' : 'var(--coral-light)' }}
      >
        {CATEGORY_ICONS[tx.category] || '📦'}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
          {tx.description}
        </p>
        <div className="flex items-center gap-2 mt-0.5">
          <span
            className="badge"
            style={{
              background: tx.type === 'income' ? 'var(--emerald-light)' : 'var(--coral-light)',
              color: tx.type === 'income' ? 'var(--emerald)' : 'var(--coral)',
            }}
          >
            {tx.category}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {formatDate(tx.date)}
          </span>
          {tx.note && (
            <span className="text-xs italic truncate hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
              · {tx.note}
            </span>
          )}
        </div>
      </div>

      {/* Amount */}
      <p
        className="font-mono font-bold text-sm flex-shrink-0 ml-2"
        style={{ color: tx.type === 'income' ? 'var(--emerald)' : 'var(--coral)' }}
      >
        {tx.type === 'income' ? '+' : '-'}
        {formatCurrency(tx.amount)}
      </p>

      {/* Actions - admin only */}
      {role === 'admin' && (
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-2">
          <button
            onClick={() => openModal('edit', tx)}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg transition-all"
            style={{ color: confirmDelete ? '#f43f5e' : 'var(--text-muted)', background: confirmDelete ? 'var(--coral-light)' : 'transparent' }}
            title={confirmDelete ? 'Click again to confirm' : 'Delete'}
            onMouseEnter={(e) => { if (!confirmDelete) { e.currentTarget.style.background = 'var(--coral-light)'; e.currentTarget.style.color = '#f43f5e'; } }}
            onMouseLeave={(e) => { if (!confirmDelete) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; } }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

export default function TransactionList() {
  const { getFilteredTransactions, role, openModal } = useStore();
  const txs = getFilteredTransactions();

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Filter bar */}
      <FilterBar />

      {/* Table */}
      <div className="card overflow-hidden">
        {/* Table header */}
        <div
          className="flex items-center gap-3 px-5 py-3 border-b text-xs font-semibold"
          style={{ borderColor: 'var(--border)', color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}
        >
          <div className="w-10 flex-shrink-0" />
          <div className="flex-1">Description</div>
          <div className="hidden sm:block w-28 text-right">Amount</div>
          {role === 'admin' && <div className="w-16" />}
        </div>

        {/* Rows */}
        {txs.length === 0 ? (
          <div className="empty-state">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>No transactions found</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Try adjusting your filters</p>
            {role === 'admin' && (
              <button
                onClick={() => openModal('add')}
                className="mt-4 text-xs flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #6c63ff, #4d45cc)', boxShadow: '0 4px 12px rgba(108,99,255,0.3)' }}
              >
                <Plus size={14} /> Add Transaction
              </button>
            )}
          </div>
        ) : (
          <>
            {txs.map((tx) => (
              <TransactionRow key={tx.id} tx={tx} />
            ))}
          </>
        )}
      </div>

      {/* Summary footer */}
      {txs.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-4 px-4 py-3 rounded-xl text-xs"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}
        >
          <span><strong style={{ color: 'var(--text-primary)' }}>{txs.length}</strong> transactions</span>
          <span>
            Income:{' '}
            <strong style={{ color: 'var(--emerald)' }}>
              {formatCurrency(txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0))}
            </strong>
          </span>
          <span>
            Expenses:{' '}
            <strong style={{ color: 'var(--coral)' }}>
              {formatCurrency(txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0))}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}
