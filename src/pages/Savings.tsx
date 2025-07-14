import React from 'react';
import { SavingsGoals } from '../components/SavingsGoals';
import { Card } from '../components/ui/Card';
import { SavingsGoal } from '../types';
import { formatCurrency } from '../utils/formatters';
import { Target, TrendingUp, Calendar } from 'lucide-react';

interface SavingsProps {
  savingsGoals: SavingsGoal[];
  addSavingsGoal: (goal: SavingsGoal) => void;
  updateSavingsGoal: (id: string, amount: number) => void;
  deleteSavingsGoal: (id: string) => void;
}

export const Savings: React.FC<SavingsProps> = ({
  savingsGoals,
  addSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal
}) => {
  const totalTargetAmount = savingsGoals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentAmount = savingsGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = totalTargetAmount > 0 ? (totalCurrentAmount / totalTargetAmount) * 100 : 0;

  const completedGoals = savingsGoals.filter(goal => goal.currentAmount >= goal.targetAmount);
  const activeGoals = savingsGoals.filter(goal => goal.currentAmount < goal.targetAmount);

  const upcomingDeadlines = savingsGoals
    .filter(goal => goal.deadline && goal.currentAmount < goal.targetAmount)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Savings Goals</h1>
        <p className="text-gray-600 mt-2">Track your progress towards your financial goals.</p>
      </div>

      {/* Savings Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-blue-50 rounded-lg mb-2 lg:mb-0 self-start">
              <Target className="w-4 h-4 lg:w-6 lg:h-6 text-blue-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Total Goals</p>
              <p className="text-lg lg:text-2xl font-semibold text-gray-900">{savingsGoals.length}</p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-emerald-50 rounded-lg mb-2 lg:mb-0 self-start">
              <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-emerald-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Total Saved</p>
              <p className="text-lg lg:text-2xl font-semibold text-gray-900 break-all">{formatCurrency(totalCurrentAmount)}</p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-purple-50 rounded-lg mb-2 lg:mb-0 self-start">
              <Target className="w-4 h-4 lg:w-6 lg:h-6 text-purple-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Target Amount</p>
              <p className="text-lg lg:text-2xl font-semibold text-gray-900 break-all">{formatCurrency(totalTargetAmount)}</p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center">
            <div className="p-2 lg:p-3 bg-orange-50 rounded-lg mb-2 lg:mb-0 self-start">
              <TrendingUp className="w-4 h-4 lg:w-6 lg:h-6 text-orange-600" />
            </div>
            <div className="lg:ml-4">
              <p className="text-xs lg:text-sm font-medium text-gray-600">Overall Progress</p>
              <p className="text-lg lg:text-2xl font-semibold text-gray-900">{Math.round(overallProgress)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      {(completedGoals.length > 0 || upcomingDeadlines.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {completedGoals.length > 0 && (
            <Card>
              <div className="flex items-center mb-4">
                <Target className="w-5 h-5 text-emerald-600 mr-2 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-emerald-600">Completed Goals</h3>
              </div>
              <div className="space-y-2">
                {completedGoals.map(goal => (
                  <div key={goal.id} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 truncate pr-2">{goal.name}</span>
                    <span className="text-sm font-medium text-emerald-600 flex-shrink-0">
                      {formatCurrency(goal.currentAmount)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {upcomingDeadlines.length > 0 && (
            <Card>
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-orange-600 mr-2 flex-shrink-0" />
                <h3 className="text-lg font-semibold text-orange-600">Upcoming Deadlines</h3>
              </div>
              <div className="space-y-2">
                {upcomingDeadlines.map(goal => (
                  <div key={goal.id} className="flex justify-between items-center">
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="text-sm text-gray-700 block truncate">{goal.name}</span>
                      <p className="text-xs text-gray-500">
                        {new Date(goal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-orange-600 flex-shrink-0">
                      {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Savings Goals Component */}
      <SavingsGoals
        goals={savingsGoals}
        onAddGoal={addSavingsGoal}
        onUpdateGoal={updateSavingsGoal}
        onDeleteGoal={deleteSavingsGoal}
      />
    </div>
  );
};