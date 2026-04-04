import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import TransactionModal from './components/transactions/TransactionModal';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import Landing from './pages/Landing';
import useStore from './store/useStore';

const PAGES = {
  dashboard: Dashboard,
  transactions: Transactions,
  insights: Insights,
};

function DashboardLayout() {
  const { activeTab, fetchTransactions } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const PageComponent = PAGES[activeTab] || Dashboard;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onMenuToggle={() => setMobileMenuOpen((v) => !v)} />

        <main
          className="flex-1 overflow-y-auto px-4 md:px-8 py-6 gradient-mesh"
          key={activeTab}
        >
          <div className="max-w-7xl mx-auto">
            <PageComponent />
          </div>
        </main>
      </div>

      {/* Modal */}
      <TransactionModal />
    </div>
  );
}

export default function App() {
  const { darkMode } = useStore();

  // Unified theme sync at the root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app/*" element={<DashboardLayout />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
