import React from 'react';
import { BudgetOverview } from '../components/BudgetOverview';
import { Card } from '../components/ui/Card';
import { Transaction, Category } from '../types';
import { formatCurrency } from '../utils/formatters';
import { isCurrentMonth } from '../utils/dateUtils';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface BudgetProps {
  transactions: Transaction[];
  categories: Category[];
}

export const Budget: React.FC<BudgetProps> = ({
  transactions,
  categories
}) => {
  const currentMonthTransactions = transactions.filter(t => isCurrentMonth(t.date));
  const expenseCategories = categories.filter(cat => cat.type === 'expense' && cat.budgetLimit);
  
  const getCategorySpending = (categoryId: string) => {
    return currentMonthTransactions
      .filter(t => t.category === categoryId && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const totalBudget = expenseCategories.reduce((sum, cat) => sum + (cat.budgetLimit || 0), 0);
  const totalSpent = expenseCategories.reduce((sum, cat) => sum + getCategorySpending(cat.id), 0);
  const budgetRemaining = totalBudget - totalSpent;

  const overBudgetCategories = expenseCategories.filter(cat => {
    const spent = getCategorySpending(cat.id);
    return spent > (cat.budgetLimit || 0);
  });

  const onTrackCategories = expenseCategories.filter(cat => {
    const spent = getCategorySpending(cat.id);
    const budget = cat.budgetLimit || 0;
    return spent <= budget && spent > budget * 0.8;
  });

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Budget Overview</h1>
        <p className="text-gray-600 mt-2">Track your spending against your budget limits.</p>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-blue-50 rounded-lg mb-2 lg:mb-0 self-start">
              <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-lg lg:text-2xl font-semibold text-gray-900">{formatCurrency(totalBudget)}</p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-red-50 rounded-lg mb-2 lg:mb-0 self-start">
              <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-red-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-lg lg:text-2xl font-semibold text-gray-900">{formatCurrency(totalSpent)}</p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className={`p-2 lg:p-3 rounded-lg mb-2 lg:mb-0 self-start ${budgetRemaining >= 0 ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <TrendingUp className={`w-4 h-4 lg:w-6 lg:h-6 ${budgetRemaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`} />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Remaining</p>
              <p className={`text-lg lg:text-2xl font-semibold ${budgetRemaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatCurrency(Math.abs(budgetRemaining))}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts */}
      {(overBudgetCategories.length > 0 || onTrackCategories.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {overBudgetCategories.length > 0 && (
            <Card>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-red-600">Over Budget</h3>
              </div>
              <div className="space-y-2">
                {overBudgetCategories.map(category => {
                  const spent = getCategorySpending(category.id);
                  const over = spent - (category.budgetLimit || 0);
                  return (
                    <div key={category.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 truncate pr-2">{category.name}</span>
                      <span className="text-sm font-medium text-red-600 flex-shrink-0">
                        +{formatCurrency(over)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {onTrackCategories.length > 0 && (
            <Card>
              <div className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-emerald-600">On Track</h3>
              </div>
              <div className="space-y-2">
                {onTrackCategories.map(category => {
                  const spent = getCategorySpending(category.id);
                  const remaining = (category.budgetLimit || 0) - spent;
                  return (
                    <div key={category.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 truncate pr-2">{category.name}</span>
                      <span className="text-sm font-medium text-emerald-600 flex-shrink-0">
                        {formatCurrency(remaining)} left
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Detailed Budget Overview */}
      <BudgetOverview 
        categories={categories}
        transactions={transactions}
      />
    </div>
  );
};