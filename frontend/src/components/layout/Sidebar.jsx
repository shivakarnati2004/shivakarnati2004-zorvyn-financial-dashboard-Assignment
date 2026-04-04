import React from 'react';
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, ChevronRight, Sun, Moon } from 'lucide-react';
import useStore from '../../store/useStore';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { activeTab, setActiveTab, role, setRole, darkMode, toggleDarkMode } = useStore();

  const handleNav = (id) => {
    setActiveTab(id);
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 flex flex-col
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:relative md:z-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ background: 'var(--bg-sidebar)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-white/5">
          <img src="/favicon.png" alt="Zorvyn" className="w-9 h-9 object-contain" />
          <div>
            <div className="font-display font-bold text-white text-lg leading-none">Zorvyn</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(240,242,255,0.4)' }}>Finance Dashboard</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          <p className="px-3 mb-3 text-xs font-semibold tracking-wider uppercase" style={{ color: 'rgba(240,242,255,0.25)' }}>
            Main Menu
          </p>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`sidebar-link w-full ${activeTab === id ? 'active' : ''}`}
            >
              <Icon size={18} className="link-icon flex-shrink-0" />
              <span className="flex-1 text-left">{label}</span>
              {activeTab === id && <ChevronRight size={14} className="opacity-60" />}
            </button>
          ))}
        </nav>

        {/* Role Switcher */}
        <div className="px-3 pb-4">
          <div className="rounded-xl p-3" style={{ background: 'rgba(108,99,255,0.05)', border: '1px solid rgba(108,99,255,0.1)' }}>
            <p className="text-[10px] font-bold mb-2 uppercase tracking-widest" style={{ color: 'rgba(240,242,255,0.3)' }}>
              Active Role
            </p>
            <div className="flex gap-1">
              {['admin', 'viewer'].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all duration-200 ${
                    role === r
                      ? 'bg-accent text-white shadow-glow'
                      : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User */}
        <div className="px-3 pb-5 border-t border-white/5 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm text-white shadow-sm"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #34d399)' }}>
              S
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">Shiva</div>
              <div className="text-[10px] truncate uppercase tracking-tight" style={{ color: 'rgba(240,242,255,0.3)' }}>
                {role} • Hyderabad
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={toggleDarkMode}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                style={{ color: 'rgba(240,242,255,0.3)' }}
              >
                {darkMode ? <Sun size={15} /> : <Moon size={15} />}
              </button>
              <button className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <Settings size={15} style={{ color: 'rgba(240,242,255,0.3)' }} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
