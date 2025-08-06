import React, { useState } from 'react';
import { ArrowRight, Target, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { Goal } from '../types';
import { GOAL_CATEGORIES, RISK_PROFILES } from '../utils/constants';

interface OnboardingProps {
  onComplete: (userData: {
    name: string;
    email: string;
    goals: Omit<Goal, 'id' | 'currentAmount' | 'createdAt'>[];
  }) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    goals: [] as Omit<Goal, 'id' | 'currentAmount' | 'createdAt'>[],
  });

  const [currentGoal, setCurrentGoal] = useState({
    title: '',
    targetAmount: 0,
    timeHorizon: 12,
    riskTolerance: 'medium' as const,
    category: 'other' as const,
  });

  const handlePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleAddGoal = () => {
    if (currentGoal.title && currentGoal.targetAmount > 0) {
      setUserData(prev => ({
        ...prev,
        goals: [...prev.goals, currentGoal],
      }));
      setCurrentGoal({
        title: '',
        targetAmount: 0,
        timeHorizon: 12,
        riskTolerance: 'medium',
        category: 'other',
      });
    }
  };

  const handleComplete = () => {
    if (userData.goals.length > 0) {
      onComplete(userData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-green-500 p-6 text-white">
          <h1 className="text-2xl font-bold">Welcome to InvestSmart</h1>
          <p className="mt-2 opacity-90">Let's set up your financial journey</p>
          <div className="mt-4 flex space-x-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-white' : 'bg-white/30'}`}></div>
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-white' : 'bg-white/30'}`}></div>
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <form onSubmit={handlePersonalInfo} className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={userData.name}
                      onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Set Your Financial Goals</h2>
                <p className="text-gray-600 mb-6">What would you like to achieve with your investments?</p>
              </div>

              {/* Current Goals */}
              {userData.goals.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-900 mb-3">Your Goals</h3>
                  <div className="space-y-2">
                    {userData.goals.map((goal, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Target className="w-4 h-4 text-indigo-600" />
                          <span className="font-medium">{goal.title}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₹{goal.targetAmount.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{goal.timeHorizon} months</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Goal */}
              <div className="border border-gray-200 rounded-lg p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Goal Title
                    </label>
                    <input
                      type="text"
                      value={currentGoal.title}
                      onChange={(e) => setCurrentGoal(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Buy a motorcycle"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={currentGoal.category}
                      onChange={(e) => setCurrentGoal(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {Object.entries(GOAL_CATEGORIES).map(([key, value]) => (
                        <option key={key} value={key}>{value.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={currentGoal.targetAmount || ''}
                      onChange={(e) => setCurrentGoal(prev => ({ ...prev, targetAmount: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="100000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time Horizon (months)
                    </label>
                    <input
                      type="number"
                      value={currentGoal.timeHorizon}
                      onChange={(e) => setCurrentGoal(prev => ({ ...prev, timeHorizon: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      min="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Risk Tolerance
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(RISK_PROFILES).map(([key, profile]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setCurrentGoal(prev => ({ ...prev, riskTolerance: key as any }))}
                        className={`p-3 border rounded-lg text-center transition-all ${
                          currentGoal.riskTolerance === key
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${profile.color}`}></div>
                        <div className="text-sm font-medium">{profile.label}</div>
                        <div className="text-xs text-gray-500 mt-1">{profile.expectedReturn}% return</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddGoal}
                  disabled={!currentGoal.title || currentGoal.targetAmount <= 0}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Goal
                </button>
              </div>

              <button
                onClick={handleComplete}
                disabled={userData.goals.length === 0}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}