import { Investment, Goal, PortfolioInvestment } from '../types';

export const calculateSIP = (
  monthlyAmount: number,
  annualReturn: number,
  years: number
): number => {
  const monthlyReturn = annualReturn / 12 / 100;
  const months = years * 12;
  
  if (monthlyReturn === 0) return monthlyAmount * months;
  
  return monthlyAmount * (((1 + monthlyReturn) ** months - 1) / monthlyReturn) * (1 + monthlyReturn);
};

export const calculateLumpSum = (
  amount: number,
  annualReturn: number,
  years: number
): number => {
  return amount * Math.pow(1 + annualReturn / 100, years);
};

export const calculateGoalProgress = (
  currentAmount: number,
  targetAmount: number
): number => {
  return Math.min((currentAmount / targetAmount) * 100, 100);
};

export const calculatePortfolioReturn = (
  investments: PortfolioInvestment[]
): number => {
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrent = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  
  if (totalInvested === 0) return 0;
  return ((totalCurrent - totalInvested) / totalInvested) * 100;
};

export const generateMarketSimulation = (
  baseReturn: number,
  volatility: number,
  months: number
): number[] => {
  const returns = [];
  let currentValue = 100;
  
  for (let i = 0; i < months; i++) {
    const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
    const monthlyReturn = (baseReturn / 12 / 100) + (volatility / 100 * randomFactor * 0.1);
    currentValue *= (1 + monthlyReturn);
    returns.push(currentValue);
  }
  
  return returns;
};

export const calculateRequiredSIP = (
  targetAmount: number,
  timeHorizon: number,
  expectedReturn: number
): number => {
  const monthlyReturn = expectedReturn / 12 / 100;
  const months = timeHorizon;
  
  if (monthlyReturn === 0) return targetAmount / months;
  
  return targetAmount * monthlyReturn / (((1 + monthlyReturn) ** months - 1) * (1 + monthlyReturn));
};