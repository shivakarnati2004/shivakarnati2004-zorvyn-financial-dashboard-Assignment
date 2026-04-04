import React, { useState, useEffect } from 'react';
import { X, Check, DollarSign, Calendar, Tag, FileText, ChevronDown, Plus, CreditCard, ShoppingBag, Utensils, Car, Play, HeartPulse, Zap, GraduationCap, Home, Shield, Landmark, Briefcase, Laptop, TrendingUp, Building2, Gift, RotateCcw, ClipboardList } from 'lucide-react';
import { CATEGORIES } from '../../constants/categories';
import useStore from '../../store/useStore';
import { format } from 'date-fns';

const EMPTY = {
  description: '',
  amount: '',
  type: 'expense',
  category: 'Food & Dining',
  date: format(new Date(), 'yyyy-MM-dd'),
  note: '',
};

const CATEGORY_ICONS = {
  'Food & Dining': Utensils,
  'Transportation': Car,
  'Shopping': ShoppingBag,
  'Entertainment': Play,
  'Health': HeartPulse,
  'Utilities': Zap,
  'Education': GraduationCap,
  'Rent': Home,
  'Insurance': Shield,
  'Savings': Landmark,
  'Salary': Briefcase,
  'Freelance': Laptop,
  'Investment': TrendingUp,
  'Business': Building2,
  'Gift': Gift,
  'Refund': RotateCcw,
  'Other': ClipboardList,
};

export default function TransactionModal() {
  const { modal, closeModal, addTransaction, updateTransaction, role } = useStore();
  const { open, mode, data } = modal;
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && data) {
      setForm({ ...data });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
    setIsSubmitting(false);
  }, [open, mode, data]);

  if (!open || role !== 'admin') return null;

  const set = (k, v) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === 'type') {
        next.category = v === 'income' ? 'Salary' : 'Food & Dining';
      }
      return next;
    });
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = 'Required';
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0) e.amount = 'Required';
    if (!form.date) e.date = 'Required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    setIsSubmitting(true);
    const payload = { ...form, amount: +form.amount };
    
    setTimeout(() => {
      if (mode === 'edit') {
        updateTransaction(form.id, payload);
      } else {
        addTransaction(payload);
      }
      closeModal();
    }, 300);
  };

  const cats = CATEGORIES[form.type] || [];
  const isIncome = form.type === 'income';

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && closeModal()}>
      <div
        className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          animation: 'slideUp 0.3s cubic-bezier(0.16,1,0.3,1) forwards',
        }}
      >
        {/* Progress header border */}
        <div
          className="h-1 bg-slate-200 dark:bg-slate-800 relative overflow-hidden"
        >
          <div 
            className="absolute left-0 top-0 h-full transition-all duration-500 ease-out"
            style={{ 
              width: isIncome ? '100%' : '100%',
              background: isIncome ? '#10b981' : '#f43f5e'
            }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300"
              style={{
                background: isIncome ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)',
                color: isIncome ? '#10b981' : '#f43f5e',
                border: `1px solid ${isIncome ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)'}`
              }}
            >
              {mode === 'edit' ? <CreditCard size={20} /> : <Plus size={20} />}
            </div>
            <div>
              <h2 className="font-display font-semibold text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {mode === 'edit' ? 'Edit Entry' : 'New Transaction'}
              </h2>
              <p className="text-sm font-medium opacity-50" style={{ color: 'var(--text-primary)' }}>
                {mode === 'edit' ? 'Update your ledger entry' : 'Add a new record to your finance logs'}
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            style={{ color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 pb-8 space-y-6">
          {/* Type Selector */}
          <div>
            <div className="flex p-1 rounded-xl" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              {['expense', 'income'].map((t) => (
                <button
                  key={t}
                  onClick={() => set('type', t)}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all duration-300"
                  style={{
                    background: form.type === t ? 'var(--bg-card)' : 'transparent',
                    color: form.type === t ? (t === 'income' ? '#10b981' : '#f43f5e') : 'var(--text-muted)',
                    boxShadow: form.type === t ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                    border: form.type === t ? '1px solid var(--border)' : '1px solid transparent',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>
              Description <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">
                <FileText size={16} />
              </div>
              <input
                className="input-base pl-11"
                placeholder="e.g. Monthly Salary, Zomato order, Netflix..."
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                style={errors.description ? { borderColor: '#f43f5e' } : {}}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Amount */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>
                Amount (₹) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold opacity-30">₹</span>
                <input
                  className="input-base pl-8 font-medium"
                  type="number"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={(e) => set('amount', e.target.value)}
                  style={errors.amount ? { borderColor: '#f43f5e' } : {}}
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>
                Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">
                  <Calendar size={16} />
                </div>
                <input
                  className="input-base pl-11"
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>
              Category
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30">
                <Tag size={16} />
              </div>
              <select
                className="input-base pl-11 appearance-none pr-10"
                value={form.category}
                onChange={(e) => set('category', e.target.value)}
              >
                {cats.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>
              Note <span className="text-[10px] font-medium lowercase tracking-normal opacity-50 ml-1">(optional)</span>
            </label>
            <textarea
              className="input-base resize-none py-3"
              rows={2}
              placeholder="Any additional notes about this transaction..."
              value={form.note}
              onChange={(e) => set('note', e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-8 py-5 flex gap-3 justify-end items-center"
          style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
        >
          <button
            onClick={closeModal}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-300 flex items-center gap-2"
            style={{
              background: isSubmitting
                ? '#94a3b8'
                : (isIncome ? '#10b981' : '#f43f5e'),
              boxShadow: isSubmitting ? 'none' : `0 4px 14px ${isIncome ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`,
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check size={18} />
            )}
            <span>{isSubmitting ? 'Saving...' : (mode === 'edit' ? 'Update Entry' : 'Add Transaction')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
