import React from 'react';
import { DashboardStats } from '../components/DashboardStats';
import { TransactionForm } from '../components/TransactionForm';
import { Card } from '../components/ui/Card';
import { Transaction, Category, SavingsGoal, BudgetSummary } from '../types';
import { isCurrentMonth } from '../utils/dateUtils';
import { formatCurrency } from '../utils/formatters';
import { TrendingUp, TrendingDown, Target, Receipt } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
  categories: Category[];
  savingsGoals: SavingsGoal[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addSavingsGoal: (goal: SavingsGoal) => void;
  updateSavingsGoal: (id: string, amount: number) => void;
  deleteSavingsGoal: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  transactions,
  categories,
  savingsGoals,
  addTransaction
}) => {
  const getBudgetSummary = (): BudgetSummary => {
    const currentMonthTransactions = transactions.filter(t => isCurrentMonth(t.date));
    
    const totalIncome = currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const categorySummary = currentMonthTransactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalIncome,
      totalExpenses,
      netIncome: totalIncome - totalExpenses,
      categorySummary
    };
  };

  const budgetSummary = getBudgetSummary();
  const recentTransactions = transactions.slice(0, 5);
  const totalSavingsGoals = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your financial overview.</p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats summary={budgetSummary} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Quick Actions */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            <Card padding="sm" className="lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="p-2 lg:p-3 bg-blue-50 rounded-lg mb-2 lg:mb-0 self-start">
                  <Receipt className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
                </div>
                <div className="lg:ml-4">
                  <p className="text-xs lg:text-sm font-medium text-gray-600">Total Transactions</p>
                  <p className="text-lg lg:text-2xl font-semibold text-gray-900">{transactions.length}</p>
                </div>
              </div>
            </Card>

            <Card padding="sm" className="lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center">
                <div className="p-2 lg:p-3 bg-purple-50 rounded-lg mb-2 lg:mb-0 self-start">
                  <Target className="w-4 h-4 lg:w-6 lg:h-6 text-purple-600" />
                </div>
                <div className="lg:ml-4">
                  <p className="text-xs lg:text-sm font-medium text-gray-600">Savings Progress</p>
                  <p className="text-lg lg:text-2xl font-semibold text-gray-900">
                    {totalSavingsGoals > 0 ? Math.round((totalSaved / totalSavingsGoals) * 100) : 0}%
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No transactions yet</p>
              ) : (
                recentTransactions.map(transaction => {
                  const category = categories.find(cat => cat.id === transaction.category);
                  return (
                    <div key={transaction.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
                        <div 
                          className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: category?.color + '20' }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: category?.color }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 text-sm lg:text-base truncate">
                            {transaction.description || category?.name}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-500 truncate">{category?.name}</p>
                        </div>
                      </div>
                      <span className={`font-semibold text-sm lg:text-base flex-shrink-0 ${transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Right Column - Quick Add Transaction */}
        <div className="space-y-6 lg:space-y-8">
          <TransactionForm
            categories={categories}
            onAddTransaction={addTransaction}
          />

          {/* Quick Insights */}
          <Card>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm text-gray-600">This Month's Income</span>
                </div>
                <span className="font-semibold text-emerald-600 text-sm">
                  {formatCurrency(budgetSummary.totalIncome)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="text-sm text-gray-600">This Month's Expenses</span>
                </div>
                <span className="font-semibold text-red-600 text-sm">
                  {formatCurrency(budgetSummary.totalExpenses)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-gray-600">Savings Goals</span>
                </div>
                <span className="font-semibold text-blue-600 text-sm">
                  {savingsGoals.length} active
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};