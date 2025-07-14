import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { Card } from './ui/Card';
import { BudgetSummary } from '../types';
import { formatCurrency } from '../utils/formatters';

interface DashboardStatsProps {
  summary: BudgetSummary;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ summary }) => {
  const savingsRate = summary.totalIncome > 0 
    ? ((summary.netIncome / summary.totalIncome) * 100).toFixed(1)
    : '0';

  const stats = [
    {
      label: 'Total Income',
      value: formatCurrency(summary.totalIncome),
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(summary.totalExpenses),
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      label: 'Net Income',
      value: formatCurrency(summary.netIncome),
      icon: DollarSign,
      color: summary.netIncome >= 0 ? 'text-emerald-600' : 'text-red-600',
      bg: summary.netIncome >= 0 ? 'bg-emerald-50' : 'bg-red-50'
    },
    {
      label: 'Savings Rate',
      value: `${savingsRate}%`,
      icon: Target,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
      {stats.map((stat, index) => (
        <Card key={index} padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className={`p-2 lg:p-3 rounded-lg ${stat.bg} mb-2 lg:mb-0 self-start`}>
              <stat.icon className={`w-4 h-4 lg:w-6 lg:h-6 ${stat.color}`} />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">{stat.label}</p>
              <p className="text-lg lg:text-2xl font-semibold text-gray-900 break-all">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};