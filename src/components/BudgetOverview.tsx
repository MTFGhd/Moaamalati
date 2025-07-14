import React from 'react';
import { Card } from './ui/Card';
import { ProgressBar } from './ui/ProgressBar';
import { Category, Transaction } from '../types';
import { formatCurrency } from '../utils/formatters';
import { isCurrentMonth } from '../utils/dateUtils';

interface BudgetOverviewProps {
  categories: Category[];
  transactions: Transaction[];
}

export const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  categories,
  transactions
}) => {
  const expenseCategories = categories.filter(cat => cat.type === 'expense' && cat.budgetLimit);
  const currentMonthTransactions = transactions.filter(t => isCurrentMonth(t.date));

  const getCategorySpending = (categoryId: string) => {
    return currentMonthTransactions
      .filter(t => t.category === categoryId && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Overview</h3>
      
      <div className="space-y-4">
        {expenseCategories.map(category => {
          const spent = getCategorySpending(category.id);
          const budget = category.budgetLimit || 0;
          const remaining = budget - spent;
          
          return (
            <div key={category.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{category.name}</h4>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(spent)} of {formatCurrency(budget)} spent
                  </p>
                </div>
                <span className={`text-sm font-medium flex-shrink-0 ${remaining >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {remaining >= 0 ? formatCurrency(remaining) : formatCurrency(Math.abs(remaining))} 
                  {remaining >= 0 ? ' left' : ' over'}
                </span>
              </div>
              
              <ProgressBar
                value={spent}
                max={budget}
                color={category.color}
                showPercentage={false}
              />
            </div>
          );
        })}
      </div>
    </Card>
  );
};