import React, { useState } from 'react';
import { Target, TrendingUp, DollarSign, Clock, Award, BookOpen, PieChart } from 'lucide-react';
import PortfolioSimulator from './PortfolioSimulator';
import { Goal, User } from '../types';
import { calculateGoalProgress, calculateRequiredSIP } from '../utils/calculations';
import { GOAL_CATEGORIES, RISK_PROFILES } from '../utils/constants';

interface DashboardProps {
  user: User;
  goals: Goal[];
  onStartSimulation: (goalId: string) => void;
}

export default function Dashboard({ user, goals, onStartSimulation }: DashboardProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const totalGoalsValue = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalCurrentValue = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = totalGoalsValue > 0 ? (totalCurrentValue / totalGoalsValue) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
            <p className="text-indigo-100 mb-4">Continue your financial learning journey</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5" />
                <span>Level {user.level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>{user.points} Points</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">₹{totalCurrentValue.toLocaleString()}</div>
            <div className="text-indigo-200">Total Portfolio Value</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Goals</p>
              <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Overall Progress</p>
              <p className="text-2xl font-bold text-gray-900">{overallProgress.toFixed(1)}%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Target</p>
              <p className="text-2xl font-bold text-gray-900">₹{(totalGoalsValue / 100000).toFixed(1)}L</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Learning Progress</p>
              <p className="text-2xl font-bold text-gray-900">25%</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <BookOpen className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Goals Overview */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Your Financial Goals</h2>
          <p className="text-gray-600 mt-1">Track and manage your investment objectives</p>
        </div>
        
        <div className="p-6">
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
              <p className="text-gray-600 mb-6">Start by setting your first financial goal</p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Add Your First Goal
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goals.map((goal) => {
                const progress = calculateGoalProgress(goal.currentAmount, goal.targetAmount);
                const requiredSIP = calculateRequiredSIP(
                  goal.targetAmount - goal.currentAmount,
                  goal.timeHorizon,
                  RISK_PROFILES[goal.riskTolerance].expectedReturn
                );
                const categoryIcon = GOAL_CATEGORIES[goal.category];

                return (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                          <Target className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                          <p className="text-sm text-gray-600">{categoryIcon.label}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        RISK_PROFILES[goal.riskTolerance].color.replace('bg-', 'bg-').replace('-500', '-100')
                      } ${RISK_PROFILES[goal.riskTolerance].color.replace('bg-', 'text-').replace('-500', '-800')}`}>
                        {RISK_PROFILES[goal.riskTolerance].label}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{progress.toFixed(1)}%</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Current</p>
                          <p className="font-semibold">₹{goal.currentAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Target</p>
                          <p className="font-semibold">₹{goal.targetAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Time Left</p>
                          <p className="font-semibold">{goal.timeHorizon} months</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Required SIP</p>
                          <p className="font-semibold">₹{Math.round(requiredSIP).toLocaleString()}/mo</p>
                        </div>
                      </div>

                      <button
                        onClick={() => onStartSimulation(goal.id)}
                        className="w-full bg-indigo-50 text-indigo-700 py-2 px-4 rounded-lg hover:bg-indigo-100 transition-colors font-medium flex items-center justify-center space-x-2"
                      >
                        <PieChart className="w-4 h-4" />
                        <span>Start Simulation</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Simulator */}
      {selectedGoal && (
        <PortfolioSimulator
          goal={goals.find(g => g.id === selectedGoal)!}
          onClose={() => setSelectedGoal(null)}
        />
      )}
    </div>
  );
}