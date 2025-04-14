
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const savedAuth = localStorage.getItem('auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    } else {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  const login = (username: string, password: string): boolean => {
    if (username === 'PI360' && password === 'vishal123') {
      setIsAuthenticated(true);
      localStorage.setItem('auth', 'true');
      toast({
        title: "Login Successful",
        description: "Welcome to -360° application",
        variant: "default"
      });
      return true;
    }
    toast({
      title: "Login Failed",
      description: "Invalid username or password",
      variant: "destructive"
    });
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('auth');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      variant: "default"
    });
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
