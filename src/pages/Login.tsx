import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { PiggyBank, Shield, Smartphone, CheckCircle } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
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

  const handleLoginSuccess = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Access your budget anywhere, anytime on any device.'
    },
    {
      icon: CheckCircle,
      title: 'Easy to Use',
      description: 'Intuitive interface designed for everyone.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 to-emerald-700 p-12 flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <PiggyBank className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Smart Budget</h1>
                <p className="text-emerald-100">Personal Finance Manager</p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">
                Take Control of Your Financial Future
              </h2>
              <p className="text-xl text-emerald-100 leading-relaxed">
                Join thousands of users who have transformed their financial lives with our 
                powerful budgeting and expense tracking tools.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-emerald-100 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        {/* Right Side - Login Form */}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                <p className="text-gray-600">Sign in to your account to continue</p>
              </div>

              <LoginForm onSuccess={handleLoginSuccess} />
            </Card>

            {/* Demo Credentials */}
            <Card className="mt-6 p-4 bg-blue-50 border-blue-200">
              <div className="text-center">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">Demo Account</h3>
                <p className="text-xs text-blue-700 mb-2">Try the app with these credentials:</p>
                <div className="text-xs text-blue-800 space-y-1">
                  <p><strong>Email:</strong> demo@smartbudget.com</p>
                  <p><strong>Password:</strong> demo123</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};