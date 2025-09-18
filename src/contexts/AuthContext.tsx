import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  createdAt: Date;
  totalEssays: number;
  averageCLB: number;
  targetCLB: number;
  currentStreak: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Demo mode - temporary until Firebase is set up
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading] = useState(false); // Set to false for demo mode

  const createDemoProfile = (email: string, name: string): UserProfile => {
    return {
      uid: 'demo-user-' + Date.now(),
      name,
      email,
      createdAt: new Date(),
      totalEssays: 0,
      averageCLB: 0,
      targetCLB: 9,
      currentStreak: 0
    };
  };

  const signup = async (email: string, password: string, name: string) => {
    // Demo mode - simulate successful signup
    const demoUser = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: name
    } as User;
    
    const profile = createDemoProfile(email, name);
    setCurrentUser(demoUser);
    setUserProfile(profile);
    
    // Store in localStorage for demo persistence
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    localStorage.setItem('demo-profile', JSON.stringify(profile));
  };

  const login = async (email: string, password: string) => {
    // Demo mode - simulate successful login
    const demoUser = {
      uid: 'demo-user-' + Date.now(),
      email,
      displayName: 'Demo User'
    } as User;
    
    const profile = createDemoProfile(email, 'Demo User');
    setCurrentUser(demoUser);
    setUserProfile(profile);
    
    // Store in localStorage for demo persistence
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    localStorage.setItem('demo-profile', JSON.stringify(profile));
  };

  const loginWithGoogle = async () => {
    // Demo mode - simulate Google login
    // In production, this would use Firebase Auth with Google provider
    const demoUser = {
      uid: 'demo-google-user-' + Date.now(),
      email: 'demo.user@gmail.com',
      displayName: 'Demo Google User'
    } as User;
    
    const profile = createDemoProfile('demo.user@gmail.com', 'Demo Google User');
    setCurrentUser(demoUser);
    setUserProfile(profile);
    
    // Store in localStorage for demo persistence
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    localStorage.setItem('demo-profile', JSON.stringify(profile));
  };

  const logout = async () => {
    setCurrentUser(null);
    setUserProfile(null);
    localStorage.removeItem('demo-user');
    localStorage.removeItem('demo-profile');
  };

  useEffect(() => {
    // Check for stored demo user
    const storedUser = localStorage.getItem('demo-user');
    const storedProfile = localStorage.getItem('demo-profile');
    
    if (storedUser && storedProfile) {
      setCurrentUser(JSON.parse(storedUser));
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}