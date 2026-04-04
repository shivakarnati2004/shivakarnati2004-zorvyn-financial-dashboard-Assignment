import React from 'react';
import { Menu, Sun, Moon, Bell, Plus, Download } from 'lucide-react';
import useStore from '../../store/useStore';
import { downloadCSV, downloadJSON } from '../../utils/helpers';

const PAGE_TITLES = {
  dashboard: { title: 'Dashboard', sub: 'Your financial overview' },
  transactions: { title: 'Transactions', sub: 'All your financial activity' },
  insights: { title: 'Insights', sub: 'Smart analysis of your money' },
};

export default function Header({ onMenuToggle }) {
  const { activeTab, darkMode, toggleDarkMode, role, openModal, getFilteredTransactions } = useStore();
  const page = PAGE_TITLES[activeTab];
  const [exportOpen, setExportOpen] = React.useState(false);

  const handleExport = (type) => {
    const txs = getFilteredTransactions();
    if (type === 'csv') downloadCSV(txs);
    else downloadJSON(txs);
    setExportOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-8 py-4 border-b"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display font-bold text-xl leading-none" style={{ color: 'var(--text-primary)' }}>
            {page.title}
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            {page.sub}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Export dropdown */}
        <div className="relative">
          <button
            onClick={() => setExportOpen(!exportOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all border hidden sm:flex"
            style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', background: 'transparent' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = '#6c63ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            <Download size={16} />
            <span className="hidden md:inline">Export</span>
          </button>
          {exportOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setExportOpen(false)} />
              <div
                className="absolute right-0 mt-2 w-40 rounded-xl shadow-lg z-20 overflow-hidden border"
                style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
              >
                {['csv', 'json'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleExport(type)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors text-left"
                    style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-light)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <span className="text-xs font-mono font-bold uppercase opacity-60">.{type}</span>
                    Download {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Dark mode */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 rounded-xl transition-all duration-200"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-light)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification bell */}
        <button
          className="relative p-2.5 rounded-xl transition-all duration-200"
          style={{ color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-light)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-coral-400" />
        </button>

        {/* Add transaction - admin only */}
        {role === 'admin' && (
          <button
            onClick={() => openModal('add')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all duration-200"
            style={{
              background: 'linear-gradient(135deg, #6c63ff, #4d45cc)',
              boxShadow: '0 4px 15px rgba(108,99,255,0.3)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(108,99,255,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(108,99,255,0.3)'; }}
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add</span>
          </button>
        )}
      </div>
    </header>
  );
}
