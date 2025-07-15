import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PiggyBank, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Shield, 
  Smartphone,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Calendar,
  Users
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Home: React.FC = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'Track Income & Expenses',
      description: 'Monitor your financial transactions with detailed categorization and real-time insights.',
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      icon: Target,
      title: 'Budget Management',
      description: 'Set spending limits for different categories and stay on track with your financial goals.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      icon: PiggyBank,
      title: 'Savings Goals',
      description: 'Create and track progress towards your savings objectives with visual progress indicators.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      icon: BarChart3,
      title: 'Financial Reports',
      description: 'Generate comprehensive reports and analyze your spending patterns over time.',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  const benefits = [
    'Real-time financial tracking',
    'Customizable budget categories',
    'Visual progress indicators',
    'Comprehensive reporting',
    'Secure data storage',
    'Mobile-friendly design'
  ];

  const stats = [
    { label: 'Active Users', value: '10K+', icon: Users },
    { label: 'Money Tracked', value: '$2M+', icon: DollarSign },
    { label: 'Goals Achieved', value: '5K+', icon: Target },
    { label: 'Years of Service', value: '3+', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-emerald-100 rounded-2xl">
                <PiggyBank className="w-16 h-16 text-emerald-600" />
              </div>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Mo
              <span className="text-emerald-600">Amalaati</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Take control of your finances with our intuitive personal finance management platform. 
              Track expenses, set budgets, and achieve your financial goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/dashboard">
                <Button size="lg" className="px-8 py-4 text-lg">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/transactions">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                  View Demo
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Bank-level Security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span>Mobile Optimized</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Free to Use</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-emerald-50 rounded-lg">
                    <stat.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Your Money
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of financial tools helps you make informed decisions 
              and achieve your financial goals faster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-center mb-6">
                  <div className={`p-4 rounded-xl ${feature.bg}`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose MoAmalaati?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of users who have transformed their financial lives 
                with our powerful yet simple budgeting tools.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/dashboard">
                  <Button size="lg" className="px-8 py-4">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">Total Balance</p>
                      <p className="text-3xl font-bold">$12,450.00</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-emerald-200" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Monthly Income</span>
                      <span className="font-semibold">$4,200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Monthly Expenses</span>
                      <span className="font-semibold">$3,150</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-emerald-100">Savings Rate</span>
                      <span className="font-semibold">25%</span>
                    </div>
                  </div>

                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-emerald-100">Emergency Fund</span>
                      <span className="text-sm font-semibold">75%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white rounded-full h-2 w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-emerald-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Start your journey to financial freedom today. It's completely free and takes less than 2 minutes to set up.
          </p>
          <Link to="/dashboard">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white text-emerald-600 hover:bg-emerald-50 border-white px-8 py-4 text-lg"
            >
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">MoAmalaati</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering individuals to achieve financial freedom through smart budgeting and expense tracking.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/transactions" className="hover:text-white transition-colors">Transactions</Link></li>
                <li><Link to="/budget" className="hover:text-white transition-colors">Budget</Link></li>
                <li><Link to="/savings" className="hover:text-white transition-colors">Savings</Link></li>
                <li><Link to="/reports" className="hover:text-white transition-colors">Reports</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MoAmalaati. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
