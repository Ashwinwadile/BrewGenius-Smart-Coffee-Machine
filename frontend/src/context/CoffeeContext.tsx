import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface CoffeePreference {
  _id: string;
  user: string;
  coffeeType: 'Mild' | 'Strong';
  createdAt: string;
  updatedAt: string;
}

interface CoffeeStatus {
  _id: string;
  user: string;
  status: 'Idle' | 'Preparing' | 'Ready' | 'Error';
  progress: number;
  message: string;
  startTime: string | null;
  endTime: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CoffeeContextType {
  preference: CoffeePreference | null;
  status: CoffeeStatus | null;
  history: CoffeePreference[];
  selectCoffee: (coffeeType: 'Mild' | 'Strong') => Promise<void>;
  startCoffee: () => Promise<void>;
  checkStatus: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const CoffeeContext = createContext<CoffeeContextType | undefined>(undefined);

export const useCoffee = () => {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
};

interface CoffeeProviderProps {
  children: ReactNode;
}

export const CoffeeProvider: React.FC<CoffeeProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [preference, setPreference] = useState<CoffeePreference | null>(null);
  const [status, setStatus] = useState<CoffeeStatus | null>(null);
  const [history, setHistory] = useState<CoffeePreference[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusInterval, setStatusInterval] = useState<number | null>(null);

  // Load user's coffee preference when authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      fetchPreference();
      fetchStatus();
      fetchHistory();
    } else {
      // Clear data when logged out
      setPreference(null);
      setStatus(null);
      setHistory([]);
    }
    
    return () => {
      // Clear interval when component unmounts
      if (statusInterval) {
        clearInterval(statusInterval);
      }
    };
  }, [isAuthenticated, user]);

  // Set up polling for status updates when preparing coffee
  useEffect(() => {
    if (status?.status === 'Preparing') {
      // Poll every 2 seconds
      const interval = window.setInterval(() => {
        checkStatus();
      }, 2000);
      
      setStatusInterval(interval);
      
      return () => clearInterval(interval);
    } else if (statusInterval) {
      clearInterval(statusInterval);
      setStatusInterval(null);
    }
  }, [status?.status]);

  const fetchPreference = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/coffee/preferences/${user.id}`);
      setPreference(response.data.preference);
    } catch (err: any) {
      // If 404, it means user has no preference yet, which is fine
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || 'Failed to fetch coffee preference');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStatus = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/coffee/status/${user.id}`);
      setStatus(response.data.status);
    } catch (err: any) {
      // If 404, it means user has no status yet, which is fine
      if (err.response?.status !== 404) {
        setError(err.response?.data?.message || 'Failed to fetch coffee status');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/coffee/history/${user.id}`);
      setHistory(response.data.preferences);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch coffee history');
    } finally {
      setLoading(false);
    }
  };

  const selectCoffee = async (coffeeType: 'Mild' | 'Strong') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('http://localhost:5000/api/coffee/select', {
        coffeeType
      });
      
      setPreference(response.data.preference);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to select coffee type');
    } finally {
      setLoading(false);
    }
  };

  const startCoffee = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('http://localhost:5000/api/coffee/status');
      
      setStatus(response.data.status);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to start coffee preparation');
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    if (!user) return;
    
    try {
      const response = await axios.get(`http://localhost:5000/api/coffee/status/${user.id}`);
      setStatus(response.data.status);
    } catch (err: any) {
      console.error('Error checking coffee status:', err);
    }
  };

  const value = {
    preference,
    status,
    history,
    selectCoffee,
    startCoffee,
    checkStatus,
    loading,
    error
  };

  return <CoffeeContext.Provider value={value}>{children}</CoffeeContext.Provider>;
};