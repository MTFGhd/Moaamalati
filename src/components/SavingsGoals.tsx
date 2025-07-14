import React, { useState } from 'react';
import { Target, Plus, Trash2 } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';
import { ProgressBar } from './ui/ProgressBar';
import { SavingsGoal } from '../types';
import { formatCurrency, generateId } from '../utils/formatters';

interface SavingsGoalsProps {
  goals: SavingsGoal[];
  onAddGoal: (goal: SavingsGoal) => void;
  onUpdateGoal: (id: string, amount: number) => void;
  onDeleteGoal: (id: string) => void;
}

export const SavingsGoals: React.FC<SavingsGoalsProps> = ({
  goals,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount) return;

    const goal: SavingsGoal = {
      id: generateId(),
      name: formData.name,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: 0,
      deadline: formData.deadline,
      color: '#10B981'
    };

    onAddGoal(goal);
    setFormData({ name: '', targetAmount: '', deadline: '' });
    setShowModal(false);
  };

  const handleContribute = (goal: SavingsGoal, amount: number) => {
    onUpdateGoal(goal.id, goal.currentAmount + amount);
    setSelectedGoal(null);
  };

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-900">Savings Goals</h3>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setShowModal(true)}
          icon={Plus}
          className="touch-manipulation"
        >
          Add Goal
        </Button>
      </div>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No savings goals yet</p>
            <p className="text-sm text-gray-400">Add your first goal to get started!</p>
          </div>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">{goal.name}</h4>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                  </p>
                  {goal.deadline && (
                    <p className="text-xs text-gray-500">
                      Target: {new Date(goal.deadline).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedGoal(goal)}
                    className="touch-manipulation"
                  >
                    Contribute
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteGoal(goal.id)}
                    icon={Trash2}
                    className="text-red-500 hover:text-red-700 touch-manipulation"
                  >
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              
              <ProgressBar
                value={goal.currentAmount}
                max={goal.targetAmount}
                color={goal.color}
              />
            </div>
          ))
        )}
      </div>

      {/* Add Goal Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Savings Goal"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Goal Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
              placeholder="e.g., Emergency Fund"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Amount
            </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Date (Optional)
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowModal(false)}
              className="touch-manipulation"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="touch-manipulation"
            >
              Add Goal
            </Button>
          </div>
        </form>
      </Modal>

      {/* Contribute Modal */}
      <Modal
        isOpen={selectedGoal !== null}
        onClose={() => setSelectedGoal(null)}
        title={`Contribute to ${selectedGoal?.name}`}
      >
        {selectedGoal && (
          <ContributeForm
            goal={selectedGoal}
            onContribute={handleContribute}
            onCancel={() => setSelectedGoal(null)}
          />
        )}
      </Modal>
    </Card>
  );
};

const ContributeForm: React.FC<{
  goal: SavingsGoal;
  onContribute: (goal: SavingsGoal, amount: number) => void;
  onCancel: () => void;
}> = ({ goal, onContribute, onCancel }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    onContribute(goal, parseFloat(amount));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <p className="text-sm text-gray-600 mb-2">
          Current: {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
        </p>
        <ProgressBar
          value={goal.currentAmount}
          max={goal.targetAmount}
          color={goal.color}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contribution Amount
        </label>
        <input
          type="number"
          step="0.01"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
          placeholder="0.00"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="touch-manipulation"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="touch-manipulation"
        >
          Contribute
        </Button>
      </div>
    </form>
  );
};