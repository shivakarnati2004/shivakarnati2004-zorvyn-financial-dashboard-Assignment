import React from 'react';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrend from '../components/dashboard/BalanceTrend';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import RecentTransactions from '../components/dashboard/RecentTransactions';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <BalanceTrend />
        </div>
        <div className="lg:col-span-2">
          <SpendingBreakdown />
        </div>
      </div>

      <RecentTransactions />
    </div>
  );
}
