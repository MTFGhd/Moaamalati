import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Transaction, Category } from '../types';
import { generateId } from '../utils/formatters';

interface TransactionFormProps {
  categories: Category[];
  onAddTransaction: (transaction: Transaction) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  categories,
  onAddTransaction
}) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const filteredCategories = categories.filter(cat => cat.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    const transaction: Transaction = {
      id: generateId(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split('T')[0]
    };

    onAddTransaction(transaction);
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <Card className="sticky top-20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Transaction</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant={type === 'income' ? 'primary' : 'outline'}
            onClick={() => setType('income')}
            icon={Plus}
            className="w-full touch-manipulation"
            size="sm"
          >
            Income
          </Button>
          <Button
            type="button"
            variant={type === 'expense' ? 'secondary' : 'outline'}
            onClick={() => setType('expense')}
            icon={Minus}
            className="w-full touch-manipulation"
            size="sm"
          >
            Expense
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
            placeholder="0.00"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
            required
          >
            <option value="">Select a category</option>
            {filteredCategories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 touch-manipulation"
            placeholder="Optional description"
          />
        </div>

        <Button type="submit" className="w-full touch-manipulation py-3">
          Add Transaction
        </Button>
      </form>
    </Card>
  );
};