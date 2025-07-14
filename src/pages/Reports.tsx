import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Transaction, Category } from '../types';
import { formatCurrency } from '../utils/formatters';
import { isCurrentMonth } from '../utils/dateUtils';
import { BarChart3, PieChart, TrendingUp, Download, Calendar, Filter } from 'lucide-react';

interface ReportsProps {
  transactions: Transaction[];
  categories: Category[];
}

export const Reports: React.FC<ReportsProps> = ({
  transactions,
  categories
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'month' | 'quarter' | 'year'>('month');
  const [showFilters, setShowFilters] = useState(false);

  const currentMonthTransactions = transactions.filter(t => isCurrentMonth(t.date));
  
  const getTransactionsByPeriod = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    switch (selectedPeriod) {
      case 'month':
        return transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate.getFullYear() === currentYear && 
                 transactionDate.getMonth() === currentMonth;
        });
      case 'quarter':
        const quarterStart = Math.floor(currentMonth / 3) * 3;
        return transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate.getFullYear() === currentYear && 
                 transactionDate.getMonth() >= quarterStart && 
                 transactionDate.getMonth() < quarterStart + 3;
        });
      case 'year':
        return transactions.filter(t => {
          const transactionDate = new Date(t.date);
          return transactionDate.getFullYear() === currentYear;
        });
      default:
        return currentMonthTransactions;
    }
  };

  const periodTransactions = getTransactionsByPeriod();
  
  const totalIncome = periodTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = periodTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  // Category breakdown
  const categoryBreakdown = categories.map(category => {
    const categoryTransactions = periodTransactions.filter(t => t.category === category.id);
    const total = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
    const count = categoryTransactions.length;
    
    return {
      ...category,
      total,
      count,
      percentage: totalExpenses > 0 && category.type === 'expense' ? (total / totalExpenses) * 100 : 0
    };
  }).filter(cat => cat.total > 0);

  const expenseCategories = categoryBreakdown.filter(cat => cat.type === 'expense');
  const incomeCategories = categoryBreakdown.filter(cat => cat.type === 'income');

  // Top spending categories
  const topSpendingCategories = expenseCategories
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  // Monthly trend (simplified)
  const monthlyTrend = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getFullYear() === date.getFullYear() && 
             transactionDate.getMonth() === date.getMonth();
    });
    
    const income = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      income,
      expenses,
      net: income - expenses
    };
  }).reverse();

  return (
    <div className="space-y-6 lg:space-y-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600 mt-2">Analyze your spending patterns and financial trends.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            icon={Filter}
            className="sm:hidden touch-manipulation"
          >
            Filters
          </Button>
          
          <div className={`flex flex-col sm:flex-row gap-2 ${showFilters ? 'block' : 'hidden sm:flex'}`}>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as 'month' | 'quarter' | 'year')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
            >
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <Button 
              variant="outline" 
              icon={Download}
              className="touch-manipulation"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-emerald-50 rounded-lg mb-2 lg:mb-0 self-start">
              <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-emerald-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-lg lg:text-2xl font-semibold text-emerald-600 break-all">{formatCurrency(totalIncome)}</p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-red-50 rounded-lg mb-2 lg:mb-0 self-start">
              <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-red-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-lg lg:text-2xl font-semibold text-red-600 break-all">{formatCurrency(totalExpenses)}</p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className={`p-2 lg:p-3 rounded-lg mb-2 lg:mb-0 self-start ${netIncome >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
              <BarChart3 className={`w-4 h-4 lg:w-6 lg:h-6 ${netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Net Income</p>
              <p className={`text-lg lg:text-2xl font-semibold break-all ${netIncome >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                {formatCurrency(netIncome)}
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-purple-50 rounded-lg mb-2 lg:mb-0 self-start">
              <Calendar className="w-4 h-4 lg:w-6 lg:h-6 text-purple-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Transactions</p>
              <p className="text-lg lg:text-2xl font-semibold text-purple-600">{periodTransactions.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Top Spending Categories */}
        <Card>
          <div className="flex items-center mb-6">
            <PieChart className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-900">Top Spending Categories</h3>
          </div>
          
          <div className="space-y-4">
            {topSpendingCategories.map((category, index) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate">{category.name}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(category.total)}</p>
                  <p className="text-xs text-gray-500">{Math.round(category.percentage)}%</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <div className="flex items-center mb-6">
            <BarChart3 className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
            <h3 className="text-lg font-semibold text-gray-900">6-Month Trend</h3>
          </div>
          
          <div className="space-y-4">
            {monthlyTrend.map((month, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{month.month}</span>
                  <span className={`text-sm font-semibold ${month.net >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatCurrency(month.net)}
                  </span>
                </div>
                <div className="flex space-x-2 h-2">
                  <div 
                    className="bg-emerald-200 rounded"
                    style={{ 
                      width: `${Math.max((month.income / Math.max(...monthlyTrend.map(m => Math.max(m.income, m.expenses)))) * 100, 2)}%` 
                    }}
                  />
                  <div 
                    className="bg-red-200 rounded"
                    style={{ 
                      width: `${Math.max((month.expenses / Math.max(...monthlyTrend.map(m => Math.max(m.income, m.expenses)))) * 100, 2)}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Income Breakdown */}
        {incomeCategories.length > 0 && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Income Sources</h3>
            <div className="space-y-3">
              {incomeCategories.map(category => (
                <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-gray-900 truncate">{category.name}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-emerald-600 text-sm">{formatCurrency(category.total)}</p>
                    <p className="text-xs text-gray-500">{category.count} transactions</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Expense Breakdown */}
        {expenseCategories.length > 0 && (
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h3>
            <div className="space-y-3">
              {expenseCategories.map(category => (
                <div key={category.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium text-gray-900 truncate">{category.name}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-red-600 text-sm">{formatCurrency(category.total)}</p>
                    <p className="text-xs text-gray-500">{category.count} transactions</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};