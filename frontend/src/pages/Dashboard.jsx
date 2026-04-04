import React from 'react';
import { motion } from 'framer-motion';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrend from '../components/dashboard/BalanceTrend';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import RecentTransactions from '../components/dashboard/RecentTransactions';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Dashboard() {
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <SummaryCards />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div className="lg:col-span-3" variants={itemVariants}>
          <BalanceTrend />
        </motion.div>
        <motion.div className="lg:col-span-2" variants={itemVariants}>
          <SpendingBreakdown />
        </motion.div>
      </div>

      <motion.div variants={itemVariants}>
        <RecentTransactions />
      </motion.div>
    </motion.div>
  );
}
