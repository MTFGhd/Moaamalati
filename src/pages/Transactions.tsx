import React from 'react';
import { TransactionList } from '../components/TransactionList';
import { TransactionForm } from '../components/TransactionForm';
import { Transaction, Category } from '../types';

interface TransactionsProps {
  transactions: Transaction[];
  categories: Category[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
}

export const Transactions: React.FC<TransactionsProps> = ({
  transactions,
  categories,
  addTransaction,
  deleteTransaction
}) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-2">Manage all your income and expenses in one place.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        <div className="xl:col-span-2">
          <TransactionList
            transactions={transactions}
            categories={categories}
            onDeleteTransaction={deleteTransaction}
          />
        </div>
        
        <div>
          <TransactionForm
            categories={categories}
            onAddTransaction={addTransaction}
          />
        </div>
      </div>
    </div>
  );
};