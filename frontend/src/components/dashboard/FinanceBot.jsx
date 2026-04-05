import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, X, Send, Wallet, TrendingUp, TrendingDown,
  PieChart, ArrowRight, Sparkles, MessageCircle,
  ShieldCheck, BarChart3, Target
} from 'lucide-react';
import useStore from '../../store/useStore';
import { formatCurrency } from '../../utils/helpers';

/* ───── Bot Brain — analyses live store data ───── */
function analyse(transactions) {
  const income = transactions.filter(t => t.type === 'income');
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalIncome = income.reduce((s, t) => s + t.amount, 0);
  const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const savingsRate = totalIncome ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

  // Category breakdown
  const catMap = {};
  expenses.forEach(t => {
    catMap[t.category] = (catMap[t.category] || 0) + t.amount;
  });
  const topCategories = Object.entries(catMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Recent activity
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const lastTx = sorted[0];

  // Monthly trend
  const now = new Date();
  const thisMonthExp = expenses
    .filter(t => { const d = new Date(t.date); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); })
    .reduce((s, t) => s + t.amount, 0);
  const lastMonthExp = expenses
    .filter(t => { const d = new Date(t.date); const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1); return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear(); })
    .reduce((s, t) => s + t.amount, 0);

  return {
    totalIncome, totalExpenses, balance, savingsRate,
    topCategories, lastTx, thisMonthExp, lastMonthExp,
    txCount: transactions.length,
    expenseCount: expenses.length,
    incomeCount: income.length,
  };
}

function generateResponse(query, data) {
  const q = query.toLowerCase();

  if (q.includes('balance') || q.includes('how much') || q.includes('total')) {
    return `Your current balance stands at **${formatCurrency(data.balance)}**.\n\nTotal income: ${formatCurrency(data.totalIncome)}\nTotal expenses: ${formatCurrency(data.totalExpenses)}\n\nYou've maintained a savings rate of ${data.savingsRate}%. ${Number(data.savingsRate) > 20 ? 'That\'s solid financial discipline!' : 'Consider reducing discretionary spending to boost this.'}`;
  }

  if (q.includes('spend') || q.includes('expense') || q.includes('where')) {
    const cats = data.topCategories.map(([cat, amt], i) => `${i + 1}. **${cat}** — ${formatCurrency(amt)}`).join('\n');
    return `Here's where your money is going:\n\n${cats}\n\nTotal expenses: ${formatCurrency(data.totalExpenses)} across ${data.expenseCount} transactions.\n\n${data.thisMonthExp > data.lastMonthExp ? '⚠️ This month\'s spending is higher than last month. Keep an eye on it.' : '✅ Your spending this month is lower than last month. Great job!'}`;
  }

  if (q.includes('income') || q.includes('earn') || q.includes('salary')) {
    return `Your total income is **${formatCurrency(data.totalIncome)}** from ${data.incomeCount} sources.\n\nThis contributes to a net balance of ${formatCurrency(data.balance)}.\n\nTo grow this, consider diversifying income streams — freelancing, investments, or side projects.`;
  }

  if (q.includes('save') || q.includes('saving') || q.includes('tip') || q.includes('advice')) {
    const tips = [];
    if (data.topCategories.length > 0) {
      tips.push(`Your biggest expense category is **${data.topCategories[0][0]}** (${formatCurrency(data.topCategories[0][1])}). Look for ways to optimize here.`);
    }
    if (Number(data.savingsRate) < 20) {
      tips.push('Your savings rate is below 20%. Financial experts recommend saving at least 20% of income.');
    }
    if (data.thisMonthExp > data.lastMonthExp) {
      tips.push('Spending increased this month. Set a monthly budget cap to stay on track.');
    }
    tips.push('Automate your savings — move a fixed percentage to savings on every payday.');
    return `Here are some personalized tips:\n\n${tips.map((t, i) => `${i + 1}. ${t}`).join('\n\n')}`;
  }

  if (q.includes('trend') || q.includes('month') || q.includes('compare')) {
    const diff = data.thisMonthExp - data.lastMonthExp;
    const pct = data.lastMonthExp ? ((diff / data.lastMonthExp) * 100).toFixed(1) : 0;
    return `Monthly comparison:\n\n• This month: ${formatCurrency(data.thisMonthExp)}\n• Last month: ${formatCurrency(data.lastMonthExp)}\n• Change: ${diff > 0 ? '+' : ''}${formatCurrency(Math.abs(diff))} (${diff > 0 ? '+' : ''}${pct}%)\n\n${diff > 0 ? 'Expenses went up. Review subscriptions and discretionary purchases.' : 'Expenses went down — you\'re trending in the right direction!'}`;
  }

  if (q.includes('recent') || q.includes('last') || q.includes('latest')) {
    if (data.lastTx) {
      return `Your most recent transaction:\n\n• **${data.lastTx.description}**\n• Category: ${data.lastTx.category}\n• Amount: ${formatCurrency(data.lastTx.amount)}\n• Type: ${data.lastTx.type === 'income' ? '💚 Income' : '🔴 Expense'}\n• Date: ${new Date(data.lastTx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    return 'No transactions found yet. Start by adding your first transaction!';
  }

  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hey there! 👋 I'm your Zorvyn Finance Assistant.\n\nI can help you with:\n• Checking your balance & income\n• Analyzing spending patterns\n• Monthly trend comparisons\n• Personalized savings tips\n\nJust ask me anything about your finances!`;
  }

  // Default
  return `I analysed your ${data.txCount} transactions. Here's a quick snapshot:\n\n💰 Balance: ${formatCurrency(data.balance)}\n📈 Income: ${formatCurrency(data.totalIncome)}\n📉 Expenses: ${formatCurrency(data.totalExpenses)}\n📊 Savings Rate: ${data.savingsRate}%\n\nAsk me about spending, savings tips, trends, or income for deeper insights!`;
}

/* ───── Quick Actions ───── */
const QUICK_ACTIONS = [
  {
    id: 'balance',
    icon: Wallet,
    title: 'Check Balance',
    caption: 'View net worth overview',
    color: '#6c63ff',
    bg: 'rgba(108,99,255,0.12)',
    query: 'What is my balance?',
  },
  {
    id: 'spending',
    icon: PieChart,
    title: 'Spending Analysis',
    caption: 'Where your money goes',
    color: '#f43f5e',
    bg: 'rgba(244,63,94,0.12)',
    query: 'Where am I spending the most?',
  },
  {
    id: 'trends',
    icon: BarChart3,
    title: 'Monthly Trends',
    caption: 'Compare this vs last month',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.12)',
    query: 'Show me monthly trends',
  },
  {
    id: 'savings',
    icon: Target,
    title: 'Savings Tips',
    caption: 'Personalized recommendations',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.12)',
    query: 'Give me savings tips',
  },
  {
    id: 'income',
    icon: TrendingUp,
    title: 'Income Report',
    caption: 'Track your earnings',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.12)',
    query: 'Show my income details',
  },
  {
    id: 'recent',
    icon: Sparkles,
    title: 'Recent Activity',
    caption: 'Your latest transaction',
    color: '#a855f7',
    bg: 'rgba(168,85,247,0.12)',
    query: 'Show my last transaction',
  },
];

/* ───── Message Bubble ───── */
function ChatMessage({ msg }) {
  const isBot = msg.sender === 'bot';

  return (
    <div className={`flex gap-2.5 ${isBot ? '' : 'flex-row-reverse'}`}>
      {isBot && (
        <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
          style={{ background: 'rgba(108,99,255,0.15)' }}>
          <Bot size={14} style={{ color: '#6c63ff' }} />
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.55] whitespace-pre-line
          ${isBot
            ? 'rounded-tl-md'
            : 'rounded-tr-md'
          }`}
        style={
          isBot
            ? { background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }
            : { background: 'linear-gradient(135deg, #6c63ff, #4d45cc)', color: '#fff' }
        }
      >
        {msg.text.split('**').map((part, i) =>
          i % 2 === 1 ? <strong key={i}>{part}</strong> : <span key={i}>{part}</span>
        )}
      </div>
    </div>
  );
}

/* ───── Main Component ───── */
export default function FinanceBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hey! 👋 I\'m Zorvyn — your smart finance assistant.\n\nI can analyze your transactions, track spending, and give you personalized insights. Pick an option below or type anything!' }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const { transactions } = useStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const handleSend = (text) => {
    const query = text || input.trim();
    if (!query) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const data = analyse(transactions);
      const response = generateResponse(query, data);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: response }]);
      setTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length <= 2;

  return (
    <>
      {/* ── Floating Action Button ── */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg group"
            style={{
              background: 'linear-gradient(135deg, #6c63ff, #4d45cc)',
              boxShadow: '0 6px 24px rgba(108,99,255,0.4)',
            }}
            id="finance-bot-toggle"
          >
            <MessageCircle size={24} className="text-white group-hover:scale-110 transition-transform" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: '#6c63ff' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] flex flex-col overflow-hidden"
            style={{
              height: '580px',
              maxHeight: 'calc(100vh - 48px)',
              borderRadius: '20px',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(108,99,255,0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5"
              style={{ background: 'linear-gradient(135deg, #6c63ff, #4d45cc)', borderRadius: '20px 20px 0 0' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-[14px] leading-none">Zorvyn Assistant</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-white/60 text-[10px] font-medium">Online • Analysing {transactions.length} records</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 custom-scrollbar">
              {messages.map(msg => (
                <ChatMessage key={msg.id} msg={msg} />
              ))}

              {/* Quick Actions Card */}
              {showSuggestions && (
                <div className="rounded-xl p-3 space-y-1.5" style={{ background: '#F9FAFB' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider px-1 mb-2" style={{ color: '#6B7280' }}>
                    Quick Actions
                  </p>
                  {QUICK_ACTIONS.map(action => {
                    const Icon = action.icon;
                    return (
                      <button
                        key={action.id}
                        onClick={() => handleSend(action.query)}
                        className="w-full flex items-center gap-3 px-2.5 py-2 transition-all duration-150 group/btn"
                        style={{
                          border: '1px solid #E5E7EB',
                          borderRadius: '8px',
                          background: 'white',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = '#36B76B';
                          e.currentTarget.style.background = 'rgba(54,183,107,0.06)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = '#E5E7EB';
                          e.currentTarget.style.background = 'white';
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                          style={{ background: action.bg }}
                        >
                          <Icon size={14} style={{ color: action.color }} />
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-[12px] font-medium leading-tight" style={{ color: '#1F2937' }}>
                            {action.title}
                          </div>
                          <div className="text-[10px] leading-tight mt-0.5" style={{ color: '#9CA3AF' }}>
                            {action.caption}
                          </div>
                        </div>
                        <ArrowRight size={12} className="ml-auto flex-shrink-0 opacity-0 group-hover/btn:opacity-60 transition-opacity" style={{ color: '#36B76B' }} />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Typing Indicator */}
              {typing && (
                <div className="flex gap-2.5">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(108,99,255,0.15)' }}>
                    <Bot size={14} style={{ color: '#6c63ff' }} />
                  </div>
                  <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-md"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                    <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                    <span className="typing-dot" style={{ animationDelay: '150ms' }} />
                    <span className="typing-dot" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input Area */}
            <div className="px-3 pb-3 pt-1">
              <div className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Ask about your finances…"
                  className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-[var(--text-muted)]"
                  style={{ color: 'var(--text-primary)' }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-30"
                  style={{
                    background: input.trim() ? 'linear-gradient(135deg, #6c63ff, #4d45cc)' : 'transparent',
                    color: input.trim() ? '#fff' : 'var(--text-muted)',
                  }}
                >
                  <Send size={14} />
                </button>
              </div>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                <ShieldCheck size={10} style={{ color: 'var(--text-muted)' }} />
                <span className="text-[9px] font-medium" style={{ color: 'var(--text-muted)' }}>
                  Data stays on your device • No external API calls
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
