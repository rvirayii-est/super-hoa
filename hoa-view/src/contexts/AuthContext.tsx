import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'resident' | 'staff' | 'treasurer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  propertyId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: Record<string, User & { password: string }> = {
  'resident@demo.com': {
    id: '1',
    email: 'resident@demo.com',
    password: 'demo123',
    name: 'John Smith',
    role: 'resident',
    propertyId: 'prop-1',
  },
  'admin@demo.com': {
    id: '2',
    email: 'admin@demo.com',
    password: 'demo123',
    name: 'Sarah Johnson',
    role: 'admin',
  },
  'staff@demo.com': {
    id: '3',
    email: 'staff@demo.com',
    password: 'demo123',
    name: 'Mike Davis',
    role: 'staff',
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('hoa_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const mockUser = MOCK_USERS[email.toLowerCase()];
    
    if (!mockUser || mockUser.password !== password) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword);
    localStorage.setItem('hoa_user', JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hoa_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
