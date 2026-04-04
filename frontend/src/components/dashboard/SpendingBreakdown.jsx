import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { CATEGORY_ICONS } from '../../constants/categories';
import { generateCategoryData } from '../../utils/dataHelpers';
import { formatCurrency } from '../../utils/helpers';
import useStore from '../../store/useStore';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, percent } = props;
  return (
    <g>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={1} />
      <text x={cx} y={cy - 10} textAnchor="middle" fill="var(--text-primary)" fontSize={14} fontFamily="Sora" fontWeight={700}>
        {formatCurrency(value, true)}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--text-muted)" fontSize={11} fontFamily="DM Sans">
        {(percent * 100).toFixed(1)}%
      </text>
      <text x={cx} y={cy + 26} textAnchor="middle" fill="var(--text-muted)" fontSize={10} fontFamily="DM Sans">
        {payload.name}
      </text>
    </g>
  );
};

export default function SpendingBreakdown() {
  const { transactions } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const data = generateCategoryData(transactions).slice(0, 7);
  const total = data.reduce((s, d) => s + d.value, 0);

  if (!data.length) {
    return (
      <div className="card p-5">
        <h3 className="font-display font-semibold text-base mb-4" style={{ color: 'var(--text-primary)' }}>
          Spending by Category
        </h3>
        <div className="empty-state">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No expense data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-5 animate-slide-up" style={{ animationDelay: '160ms' }}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            Spending Breakdown
          </h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            By category
          </p>
        </div>
        <div className="text-right">
          <p className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
            {formatCurrency(total, true)}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total spent</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div style={{ width: 180, height: 180, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} opacity={i === activeIndex ? 1 : 0.7} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2">
          {data.map((entry, i) => (
            <div
              key={entry.name}
              className="flex items-center gap-2 cursor-pointer group"
              onMouseEnter={() => setActiveIndex(i)}
            >
              <span className="text-base">{CATEGORY_ICONS[entry.name] || '📦'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span
                    className="text-xs font-medium truncate transition-colors"
                    style={{ color: i === activeIndex ? entry.color : 'var(--text-secondary)' }}
                  >
                    {entry.name}
                  </span>
                  <span className="text-xs font-semibold ml-2 flex-shrink-0" style={{ color: 'var(--text-primary)' }}>
                    {formatCurrency(entry.value, true)}
                  </span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(entry.value / data[0].value) * 100}%`,
                      background: entry.color,
                      opacity: i === activeIndex ? 1 : 0.6,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
