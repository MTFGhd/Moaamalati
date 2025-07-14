import { Category } from '../types';

export const defaultCategories: Category[] = [
  // Income Categories
  { id: 'salary', name: 'Salary', type: 'income', color: '#10B981', icon: 'Briefcase' },
  { id: 'freelance', name: 'Freelance', type: 'income', color: '#06B6D4', icon: 'Laptop' },
  { id: 'investment', name: 'Investment', type: 'income', color: '#8B5CF6', icon: 'TrendingUp' },
  { id: 'other-income', name: 'Other', type: 'income', color: '#F59E0B', icon: 'Plus' },

  // Expense Categories
  { id: 'housing', name: 'Housing', type: 'expense', color: '#EF4444', icon: 'Home', budgetLimit: 1200 },
  { id: 'food', name: 'Food & Dining', type: 'expense', color: '#F97316', icon: 'UtensilsCrossed', budgetLimit: 400 },
  { id: 'transportation', name: 'Transportation', type: 'expense', color: '#3B82F6', icon: 'Car', budgetLimit: 200 },
  { id: 'utilities', name: 'Utilities', type: 'expense', color: '#06B6D4', icon: 'Zap', budgetLimit: 150 },
  { id: 'entertainment', name: 'Entertainment', type: 'expense', color: '#8B5CF6', icon: 'Film', budgetLimit: 100 },
  { id: 'healthcare', name: 'Healthcare', type: 'expense', color: '#EC4899', icon: 'Heart', budgetLimit: 200 },
  { id: 'education', name: 'Education', type: 'expense', color: '#10B981', icon: 'GraduationCap', budgetLimit: 300 },
  { id: 'shopping', name: 'Shopping', type: 'expense', color: '#F59E0B', icon: 'ShoppingBag', budgetLimit: 250 },
  { id: 'other-expense', name: 'Other', type: 'expense', color: '#6B7280', icon: 'MoreHorizontal', budgetLimit: 100 }
];