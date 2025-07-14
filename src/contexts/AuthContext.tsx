import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { generateId } from '../utils/formatters';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        const sessionToken = localStorage.getItem('sessionToken');
        
        if (storedUser && sessionToken) {
          const user = JSON.parse(storedUser);
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    checkAuth();
  }, []);

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (existingUsers.find((user: User) => user.email === email)) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Create new user
      const newUser: User = {
        id: generateId(),
        email,
        name,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=10b981&color=fff`,
        createdAt: new Date().toISOString(),
      };

      // Store user credentials (in real app, this would be hashed)
      const userCredentials = {
        userId: newUser.id,
        email,
        password, // In production, this should be hashed
      };

      // Save to localStorage
      existingUsers.push(newUser);
      const existingCredentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
      existingCredentials.push(userCredentials);
      
      localStorage.setItem('users', JSON.stringify(existingUsers));
      localStorage.setItem('userCredentials', JSON.stringify(existingCredentials));

      // Auto-login after registration
      const sessionToken = generateId();
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      localStorage.setItem('sessionToken', sessionToken);

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Get stored credentials
      const userCredentials = JSON.parse(localStorage.getItem('userCredentials') || '[]');
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Find user credentials
      const credentials = userCredentials.find((cred: any) => cred.email === email && cred.password === password);
      
      if (!credentials) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Find user data
      const user = users.find((u: User) => u.id === credentials.userId);
      
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Create session
      const sessionToken = generateId();
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('sessionToken', sessionToken);

      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('sessionToken');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};