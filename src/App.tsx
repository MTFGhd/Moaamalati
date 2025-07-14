import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budget } from './pages/Budget';
import { Savings } from './pages/Savings';
import { Reports } from './pages/Reports';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Transaction, Category, SavingsGoal } from './types';
import { AuthProvider } from './contexts/AuthContext';
import { defaultCategories } from './data/categories';

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [categories] = useLocalStorage<Category[]>('categories', defaultCategories);
  const [savingsGoals, setSavingsGoals] = useLocalStorage<SavingsGoal[]>('savingsGoals', []);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addSavingsGoal = (goal: SavingsGoal) => {
    setSavingsGoals(prev => [...prev, goal]);
  };

  const updateSavingsGoal = (id: string, amount: number) => {
    setSavingsGoals(    prev => prev.map(  goal => 
        goal.id === id ? { ...goal, currentAmount: amount } : goal
      )
    );
  };

  const deleteSavingsGoal = (id: string) => {
    setSavingsGoals( prev => prev.filter( goal => goal.id !== id ));
  };

  const appData = {
    transactions,
    categories,
    savingsGoals,
    addTransaction,
    deleteTransaction,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal
  };

  // Create demo user if it doesn't exist
  React.useEffect( () => {
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const existingCredentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
    
    const demoUserExists = existingCredentials.find((cred: any) => cred.email === 'demo@smartbudget.com');
    
    if ( !demoUserExists ) {
      const demoUser = {
        id: 'demo-user-id',
        email: 'demo@smartbudget.com',
        name: 'Demo User',
        avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=10b981&color=fff',
        createdAt: new Date().toISOString(),
      };
      
      const demoCredentials = {
        userId: 'demo-user-id',
        email: 'demo@smartbudget.com',
        password: 'demo123',
      };
      
      existingUsers.push(demoUser);
      existingCredentials.push(demoCredentials);
      
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('userCredentials', JSON.stringify(existingCredentials));
    }
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout>
                <Dashboard {...appData} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/transactions" element={
            <ProtectedRoute>
              <Layout>
                <Transactions {...appData} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/budget" element={
            <ProtectedRoute>
              <Layout>
                <Budget {...appData} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/savings" element={
            <ProtectedRoute>
              <Layout>
                <Savings {...appData} />
              </Layout>
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <Layout>
                <Reports {...appData} />
              </Layout>
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;