import React from 'react';
import { PiggyBank, Calendar } from 'lucide-react';
import { getMonthName, getCurrentMonth } from '../utils/dateUtils';

export const Header: React.FC = () => {
  const currentMonth = getCurrentMonth();
  const monthName = getMonthName(currentMonth);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <PiggyBank className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">Smart Budget</h1>
              <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Personal Finance Management</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-xs lg:text-sm text-gray-600">
            <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
            <span className="hidden sm:inline">{monthName}</span>
            <span className="sm:hidden">{monthName.split(' ')[0]}</span>
          </div>
        </div>
      </div>
    </header>
  );
};