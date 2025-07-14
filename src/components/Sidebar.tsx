import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Target, 
  PiggyBank, 
  BarChart3,
  Home,
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Receipt },
  { name: 'Budget', href: '/budget', icon: Target },
  { name: 'Savings', href: '/savings', icon: PiggyBank },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: Settings },
  { name: 'Help', href: '#', icon: HelpCircle },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onNavigate) onNavigate();
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 shadow-sm">
      {/* Logo Section */}
      <div className="flex items-center px-6 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <PiggyBank className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Smart Budget</h1>
            <p className="text-xs text-gray-500">Finance Manager</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 touch-manipulation ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    className={`mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                      isActive ? 'text-white scale-110' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  <span className="truncate">{item.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full opacity-75"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        <div className="py-4">
          <div className="h-px bg-gray-200"></div>
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          {secondaryNavigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={onNavigate}
              className="group flex items-center px-3 py-3 text-sm font-medium text-gray-600 rounded-xl hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 touch-manipulation"
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" />
              <span className="truncate">{item.name}</span>
            </a>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full group flex items-center px-3 py-3 text-sm font-medium text-gray-600 rounded-xl hover:text-red-600 hover:bg-red-50 active:bg-red-100 transition-all duration-200 touch-manipulation"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-red-600" />
            <span className="truncate">Sign out</span>
          </button>
        </div>
      </nav>

      {/* User Profile Section */}
      {user && (
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center space-x-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer touch-manipulation">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};