import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '../services/api';

const useStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      isLoading: false,
      error: null,
      role: 'admin',
      darkMode: true,
      activeTab: 'dashboard',
      filters: {
        search: '',
        type: 'all',
        category: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
        dateRange: '6m',
      },
      modal: { open: false, mode: 'add', data: null },

      // --- Async Actions ---

      fetchTransactions: async () => {
        set({ isLoading: true, error: null });
        try {
          const data = await api.getTransactions();
          set({ transactions: data, isLoading: false });
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      addTransaction: async (tx) => {
        set({ isLoading: true, error: null });
        try {
          const newTx = await api.addTransaction(tx);
          set((state) => ({ 
            transactions: [newTx, ...state.transactions],
            isLoading: false 
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      updateTransaction: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          const updatedTx = await api.updateTransaction(id, updates);
          set((state) => ({
            transactions: state.transactions.map((tx) =>
              tx.id === id ? updatedTx : tx
            ),
            isLoading: false,
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      deleteTransaction: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await api.deleteTransaction(id);
          set((state) => ({
            transactions: state.transactions.filter((tx) => tx.id !== id),
            isLoading: false,
          }));
        } catch (err) {
          set({ error: err.message, isLoading: false });
        }
      },

      // --- Sync Actions ---

      setRole: (role) => set({ role }),

      toggleDarkMode: () => {
        const next = !get().darkMode;
        set({ darkMode: next });
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      },

      setActiveTab: (tab) => set({ activeTab: tab }),

      setFilter: (key, value) =>
        set((state) => ({ filters: { ...state.filters, [key]: value } })),

      resetFilters: () =>
        set({
          filters: { search: '', type: 'all', category: 'all', sortBy: 'date', sortOrder: 'desc', dateRange: '6m' },
        }),

      openModal: (mode = 'add', data = null) =>
        set({ modal: { open: true, mode, data } }),
      closeModal: () => set({ modal: { open: false, mode: 'add', data: null } }),

      // --- Selectors ---

      getFilteredTransactions: () => {
        const { transactions, filters } = get();
        let result = [...transactions];

        if (filters.dateRange !== 'all') {
          const months = { '1m': 1, '3m': 3, '6m': 6 }[filters.dateRange];
          const cutoff = new Date();
          cutoff.setMonth(cutoff.getMonth() - months);
          result = result.filter((tx) => new Date(tx.date) >= cutoff);
        }
        if (filters.type !== 'all') result = result.filter((tx) => tx.type === filters.type);
        if (filters.category !== 'all') result = result.filter((tx) => tx.category === filters.category);
        if (filters.search.trim()) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (tx) =>
              tx.description.toLowerCase().includes(q) ||
              tx.category.toLowerCase().includes(q) ||
              (tx.note || '').toLowerCase().includes(q)
          );
        }

        result.sort((a, b) => {
          let cmp = 0;
          if (filters.sortBy === 'date') cmp = new Date(b.date) - new Date(a.date);
          else if (filters.sortBy === 'amount') cmp = b.amount - a.amount;
          else if (filters.sortBy === 'category') cmp = a.category.localeCompare(b.category);
          return filters.sortOrder === 'asc' ? -cmp : cmp;
        });
        return result;
      },

      getSummary: () => {
        const { transactions } = get();
        const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        return { income, expenses, balance: income - expenses };
      },
    }),
    {
      name: 'zorvyn-storage-v3',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        role: state.role,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useStore;
