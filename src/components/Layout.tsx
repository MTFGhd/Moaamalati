import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex">
        {/* Modern floating toggle button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={` lg:hidden fixed top-20 right-4 z-40
                       w-12 h-12 rounded-full flex items-center justify-center
                       transition-all duration-400 ease-out
            ${sidebarOpen 
              ? 'bg-white text-gray-900 shadow-xl shadow-black/20 scale-110 rotate-90' 
              : 'bg-white/90 backdrop-blur-md text-gray-700 shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105'
            }
            border border-white/20 active:scale-95 touch-manipulation
          `}
          aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-5 h-5">
            <Menu 
              className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                sidebarOpen ? 'opacity-0 rotate-45 scale-75' : 'opacity-100 rotate-0 scale-100'
              }`} 
            />
            <X 
              className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                sidebarOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-45 scale-75'
              }`} 
            />
          </div>
        </button>

        {/* Sidebar with modern slide animation */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-40 w-72 transform transition-all duration-300 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:shadow-none shadow-2xl
        `}>
          <Sidebar onNavigate={() => setSidebarOpen(false)} />
        </aside>

        {/* Main content with proper spacing */}
        <main className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-6 xl:p-8 pt-6 lg:pt-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};