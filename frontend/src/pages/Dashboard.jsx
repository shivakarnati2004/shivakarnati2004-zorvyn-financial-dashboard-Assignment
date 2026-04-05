import React from 'react';
import { motion } from 'framer-motion';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrend from '../components/dashboard/BalanceTrend';
import SpendingBreakdown from '../components/dashboard/SpendingBreakdown';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

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
    <div className="relative w-full h-full min-h-[800px]">
      {/* Background Section (Interactive) */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20 pointer-events-none"
          fill="rgba(255, 255, 255, 0.15)"
        />
        <div className="absolute inset-0 transition-opacity duration-300">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px] z-10 pointer-events-none" />
      </div>

      {/* Foreground Content */}
      <motion.div 
        className="relative z-20 pointer-events-none w-full flex flex-col xl:flex-row justify-between gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Left Column */}
        <div className="w-full xl:w-[32%] flex flex-col space-y-6">
          <motion.div variants={itemVariants} className="pointer-events-auto">
            <SummaryCards keys={['balance', 'income']} className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-1" />
          </motion.div>
          <motion.div className="pointer-events-auto flex-1 flex flex-col" variants={itemVariants}>
            <BalanceTrend />
          </motion.div>
        </div>

        {/* Center Void for Robot */}
        <div className="hidden xl:block flex-1 pointer-events-none"></div>

        {/* Right Column */}
        <div className="w-full xl:w-[32%] flex flex-col space-y-6">
          <motion.div variants={itemVariants} className="pointer-events-auto">
            <SummaryCards keys={['expenses']} className="grid-cols-1" />
          </motion.div>
          <motion.div className="pointer-events-auto" variants={itemVariants}>
            <SpendingBreakdown />
          </motion.div>
          <motion.div className="pointer-events-auto flex-1 flex flex-col" variants={itemVariants}>
            <RecentTransactions />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

