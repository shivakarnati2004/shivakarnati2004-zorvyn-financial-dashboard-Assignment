import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

export const formatCurrency = (amount, compact = false) => {
  if (compact && amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (compact && amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'dd MMM yyyy');
};

export const formatDateShort = (dateStr) => {
  return format(new Date(dateStr), 'dd MMM');
};

export const formatDateRelative = (dateStr) => {
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
};

export const clsx = (...classes) => classes.filter(Boolean).join(' ');

export const calculatePercentChange = (current, previous) => {
  if (!previous) return null;
  return ((current - previous) / previous) * 100;
};

export const groupByMonth = (transactions) => {
  const groups = {};
  transactions.forEach((tx) => {
    const key = format(new Date(tx.date), 'MMMM yyyy');
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });
  return groups;
};

export const downloadCSV = (transactions) => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Note'];
  const rows = transactions.map((tx) => [
    tx.date,
    `"${tx.description}"`,
    tx.category,
    tx.type,
    tx.amount,
    `"${tx.note || ''}"`,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `zorvyn-transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

export const downloadJSON = (transactions) => {
  const json = JSON.stringify(transactions, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `zorvyn-transactions-${format(new Date(), 'yyyy-MM-dd')}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const CHART_COLORS = {
  accent: '#6c63ff',
  emerald: '#10b981',
  coral: '#f43f5e',
  gold: '#f59e0b',
  blue: '#3b82f6',
  purple: '#a855f7',
};
