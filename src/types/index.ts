export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
  occupation?: string;
  annualIncome?: number;
  investmentExperience: 'beginner' | 'intermediate' | 'advanced';
  profileComplete: boolean;
  level: number;
  points: number;
  badges: Badge[];
  preferences: UserPreferences;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface UserPreferences {
  notifications: {
    email: boolean;
    push: boolean;
    goalReminders: boolean;
    learningUpdates: boolean;
    marketUpdates: boolean;
  };
  language: 'en' | 'hi';
  currency: 'INR';
  theme: 'light' | 'dark';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  timeHorizon: number; // in months
  riskTolerance: 'low' | 'medium' | 'high';
  category: 'vehicle' | 'vacation' | 'retirement' | 'emergency' | 'education' | 'other';
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'paused' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Investment {
  id: string;
  name: string;
  type: 'stocks' | 'bonds' | 'mutual_funds' | 'fixed_deposits' | 'gold';
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn: number;
  volatility: number;
  description: string;
  icon: string;
}

export interface Portfolio {
  id: string;
  goalId: string;
  investments: PortfolioInvestment[];
  totalValue: number;
  totalInvested: number;
  performance: number;
  lastUpdated: Date;
}

export interface PortfolioInvestment {
  investmentId: string;
  allocation: number; // percentage
  amount: number;
  currentValue: number;
  performance: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number; // in minutes
  completed: boolean;
  content: LearningContent[];
}

export interface LearningContent {
  type: 'text' | 'video' | 'quiz' | 'simulation';
  title: string;
  content: string;
  quiz?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface MarketData {
  date: Date;
  value: number;
  change: number;
}