import { format } from 'date-fns';
import { CATEGORY_COLORS } from '../constants/categories';

export const generateMonthlyData = (transactions) => {
  const months = {};

  transactions.forEach(tx => {
    const monthKey = format(new Date(tx.date), 'MMM yy');
    if (!months[monthKey]) {
      months[monthKey] = { month: monthKey, income: 0, expenses: 0, balance: 0 };
    }
    if (tx.type === 'income') {
      months[monthKey].income += tx.amount;
    } else {
      months[monthKey].expenses += tx.amount;
    }
    months[monthKey].balance = months[monthKey].income - months[monthKey].expenses;
  });

  return Object.values(months).reverse();
};

export const generateCategoryData = (transactions) => {
  const cats = {};
  transactions
    .filter(tx => tx.type === 'expense')
    .forEach(tx => {
      if (!cats[tx.category]) cats[tx.category] = 0;
      cats[tx.category] += tx.amount;
    });

  return Object.entries(cats)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#64748b' }))
    .sort((a, b) => b.value - a.value);
};
