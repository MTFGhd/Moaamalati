import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { PiggyBank, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const Register: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleRegisterSuccess = () => {
    navigate('/dashboard');
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Track Your Progress',
      description: 'Monitor your income and expenses with detailed analytics and insights.'
    },
    {
      icon: Target,
      title: 'Set Budget Goals',
      description: 'Create custom budgets for different categories and stay on track.'
    },
    {
      icon: BarChart3,
      title: 'Financial Reports',
      description: 'Generate comprehensive reports to understand your spending patterns.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Left Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <PiggyBank className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Smart Budget</h1>
                <p className="text-gray-600">Personal Finance Manager</p>
              </div>
            </div>

            <Card className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
                <p className="text-gray-600">Start your journey to financial freedom</p>
              </div>

              <RegisterForm onSuccess={handleRegisterSuccess} />
            </Card>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <PiggyBank className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Smart Budget</h1>
                <p className="text-blue-100">Personal Finance Manager</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Start Building Better Financial Habits Today
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed">
                Join our community and discover how easy it is to manage your money, 
                track expenses, and achieve your financial goals.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-blue-100 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-white mb-2">100% Free</p>
                <p className="text-blue-100 text-sm">
                  No hidden fees, no premium plans. All features are completely free forever.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 -translate-x-32"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 translate-x-24"></div>
        </div>
      </div>
    </div>
  );
};