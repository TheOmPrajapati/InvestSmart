export const RISK_PROFILES = {
  low: {
    label: 'Conservative',
    description: 'Prefer stable returns with minimal risk',
    color: 'bg-green-500',
    expectedReturn: 7,
  },
  medium: {
    label: 'Moderate',
    description: 'Balance between growth and stability',
    color: 'bg-yellow-500',
    expectedReturn: 10,
  },
  high: {
    label: 'Aggressive',
    description: 'Willing to take higher risks for better returns',
    color: 'bg-red-500',
    expectedReturn: 15,
  },
};

export const GOAL_CATEGORIES = {
  vehicle: { icon: 'Car', label: 'Vehicle Purchase' },
  vacation: { icon: 'Plane', label: 'Dream Vacation' },
  retirement: { icon: 'Banknote', label: 'Retirement Fund' },
  emergency: { icon: 'Shield', label: 'Emergency Fund' },
  education: { icon: 'GraduationCap', label: 'Education' },
  other: { icon: 'Target', label: 'Other Goal' },
};

export const INVESTMENT_TYPES = [
  {
    id: 'stocks',
    name: 'Equity Stocks',
    type: 'stocks' as const,
    riskLevel: 'high' as const,
    expectedReturn: 15,
    volatility: 25,
    description: 'Direct investment in company shares with high growth potential',
    icon: 'TrendingUp',
  },
  {
    id: 'mutual_funds',
    name: 'Mutual Funds',
    type: 'mutual_funds' as const,
    riskLevel: 'medium' as const,
    expectedReturn: 12,
    volatility: 18,
    description: 'Professionally managed diversified investment portfolio',
    icon: 'PieChart',
  },
  {
    id: 'bonds',
    name: 'Government Bonds',
    type: 'bonds' as const,
    riskLevel: 'low' as const,
    expectedReturn: 8,
    volatility: 5,
    description: 'Fixed-income securities with stable returns',
    icon: 'FileText',
  },
  {
    id: 'fixed_deposits',
    name: 'Fixed Deposits',
    type: 'fixed_deposits' as const,
    riskLevel: 'low' as const,
    expectedReturn: 6,
    volatility: 0,
    description: 'Bank deposits with guaranteed returns',
    icon: 'Vault',
  },
  {
    id: 'gold',
    name: 'Gold Investment',
    type: 'gold' as const,
    riskLevel: 'medium' as const,
    expectedReturn: 9,
    volatility: 15,
    description: 'Precious metal investment as inflation hedge',
    icon: 'Coins',
  },
];

export const LEARNING_MODULES = [
  {
    id: 'basics',
    title: 'Investment Basics',
    description: 'Understanding the fundamentals of investing',
    difficulty: 'beginner' as const,
    estimatedTime: 15,
    completed: false,
  },
  {
    id: 'risk',
    title: 'Risk & Return',
    description: 'Learn about risk tolerance and expected returns',
    difficulty: 'beginner' as const,
    estimatedTime: 20,
    completed: false,
  },
  {
    id: 'diversification',
    title: 'Portfolio Diversification',
    description: 'The importance of spreading your investments',
    difficulty: 'intermediate' as const,
    estimatedTime: 25,
    completed: false,
  },
  {
    id: 'compound_interest',
    title: 'Power of Compounding',
    description: 'How time can multiply your investments',
    difficulty: 'beginner' as const,
    estimatedTime: 18,
    completed: false,
  },
];