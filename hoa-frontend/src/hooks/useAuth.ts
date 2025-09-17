import { useState, useEffect } from 'react';

export interface User {
  email: string;
  name?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('hoa-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('hoa-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo authentication - in real app, this would be an API call
      if (email === 'resident@harmonyheights.com' && password === 'demo123') {
        const userData: User = {
          email: email,
          name: 'John Resident'
        };
        
        setUser(userData);
        localStorage.setItem('hoa-user', JSON.stringify(userData));
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { 
          success: false, 
          error: 'Invalid email or password. Please try the demo credentials.' 
        };
      }
    } catch (error) {
      setIsLoading(false);
      return { 
        success: false, 
        error: 'An error occurred during login. Please try again.' 
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hoa-user');
  };

  const isAuthenticated = !!user;

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
}
