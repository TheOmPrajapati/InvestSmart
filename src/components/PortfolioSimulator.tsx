import React, { useState, useEffect } from 'react';
import { X, Play, RotateCcw, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { Goal, Investment, PortfolioInvestment } from '../types';
import { INVESTMENT_TYPES, RISK_PROFILES } from '../utils/constants';
import { calculateSIP, generateMarketSimulation } from '../utils/calculations';

interface PortfolioSimulatorProps {
  goal: Goal;
  onClose: () => void;
}

export default function PortfolioSimulator({ goal, onClose }: PortfolioSimulatorProps) {
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);

  useEffect(() => {
    // Initialize with suggested allocation based on risk profile
    const suggestedAllocation = getSuggestedAllocation(goal.riskTolerance);
    setAllocations(suggestedAllocation);
  }, [goal.riskTolerance]);

  const getSuggestedAllocation = (riskTolerance: string): Record<string, number> => {
    switch (riskTolerance) {
      case 'low':
        return {
          fixed_deposits: 40,
          bonds: 35,
          mutual_funds: 20,
          gold: 5,
          stocks: 0,
        };
      case 'medium':
        return {
          mutual_funds: 50,
          bonds: 25,
          stocks: 15,
          gold: 10,
          fixed_deposits: 0,
        };
      case 'high':
        return {
          stocks: 60,
          mutual_funds: 30,
          gold: 10,
          bonds: 0,
          fixed_deposits: 0,
        };
      default:
        return {};
    }
  };

  const handleAllocationChange = (investmentId: string, value: number) => {
    const newAllocations = { ...allocations, [investmentId]: value };
    
    // Ensure total doesn't exceed 100%
    const total = Object.values(newAllocations).reduce((sum, val) => sum + val, 0);
    if (total <= 100) {
      setAllocations(newAllocations);
    }
  };

  const getTotalAllocation = () => {
    return Object.values(allocations).reduce((sum, val) => sum + val, 0);
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    
    // Simulate market conditions for the goal timeframe
    const portfolioReturn = calculatePortfolioReturn();
    const simulationData = generateMarketSimulation(portfolioReturn, 15, goal.timeHorizon);
    
    // Calculate final amount based on SIP and returns
    const finalAmount = calculateSIP(monthlyInvestment, portfolioReturn, goal.timeHorizon / 12);
    const totalInvested = monthlyInvestment * goal.timeHorizon;
    const returns = finalAmount - totalInvested;
    const returnPercentage = (returns / totalInvested) * 100;
    
    const goalAchieved = finalAmount >= goal.targetAmount;
    const successProbability = Math.min(95, 60 + (portfolioReturn * 2));

    setTimeout(() => {
      setSimulationResults({
        finalAmount,
        totalInvested,
        returns,
        returnPercentage,
        goalAchieved,
        successProbability,
        chartData: simulationData,
        monthlyAmount: monthlyInvestment,
        timeHorizon: goal.timeHorizon,
      });
      setIsSimulating(false);
    }, 2000);
  };

  const calculatePortfolioReturn = () => {
    let weightedReturn = 0;
    Object.entries(allocations).forEach(([investmentId, allocation]) => {
      const investment = INVESTMENT_TYPES.find(inv => inv.id === investmentId);
      if (investment && allocation > 0) {
        weightedReturn += (investment.expectedReturn * allocation / 100);
      }
    });
    return weightedReturn;
  };

  const resetSimulation = () => {
    setSimulationResults(null);
    const suggestedAllocation = getSuggestedAllocation(goal.riskTolerance);
    setAllocations(suggestedAllocation);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Portfolio Simulator</h2>
            <p className="text-gray-600">Goal: {goal.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!simulationResults ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Portfolio Setup */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Portfolio Allocation</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Total Allocation</span>
                      <span className={`font-semibold ${getTotalAllocation() === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                        {getTotalAllocation()}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${getTotalAllocation() === 100 ? 'bg-green-500' : 'bg-orange-500'}`}
                        style={{ width: `${Math.min(getTotalAllocation(), 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {INVESTMENT_TYPES.map((investment) => (
                      <div key={investment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              investment.riskLevel === 'high' ? 'bg-red-100' :
                              investment.riskLevel === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                            }`}>
                              <TrendingUp className={`w-4 h-4 ${
                                investment.riskLevel === 'high' ? 'text-red-600' :
                                investment.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-medium">{investment.name}</h4>
                              <p className="text-sm text-gray-600">{investment.expectedReturn}% expected return</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={allocations[investment.id] || 0}
                              onChange={(e) => handleAllocationChange(investment.id, Number(e.target.value))}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                            />
                            <span className="text-sm text-gray-600 ml-1">%</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{investment.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Investment Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    min="500"
                    step="500"
                  />
                </div>
              </div>

              {/* Right Column - Goal Info & Action */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4">Goal Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Target Amount:</span>
                      <span className="font-semibold">₹{goal.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Horizon:</span>
                      <span className="font-semibold">{goal.timeHorizon} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Risk Profile:</span>
                      <span className="font-semibold">{RISK_PROFILES[goal.riskTolerance].label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Return:</span>
                      <span className="font-semibold">{calculatePortfolioReturn().toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={runSimulation}
                    disabled={getTotalAllocation() !== 100 || isSimulating}
                    className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSimulating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        <span>Simulating...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        <span>Run Simulation</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetSimulation}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Reset to Suggested</span>
                  </button>
                </div>

                {getTotalAllocation() !== 100 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      Please allocate exactly 100% across all investment types to run the simulation.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Simulation Results */
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Simulation Results</h3>
                <p className="text-gray-600">Based on {simulationResults.timeHorizon} months of investing ₹{simulationResults.monthlyAmount.toLocaleString()}/month</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-100">Final Amount</span>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold">₹{simulationResults.finalAmount.toLocaleString()}</div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-100">Total Returns</span>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold">₹{simulationResults.returns.toLocaleString()}</div>
                  <div className="text-sm text-blue-100">{simulationResults.returnPercentage.toFixed(1)}% gain</div>
                </div>

                <div className={`bg-gradient-to-r ${simulationResults.goalAchieved ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-red-600'} rounded-xl p-6 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/80">Goal Status</span>
                    <Target className="w-5 h-5" />
                  </div>
                  <div className="text-lg font-bold">
                    {simulationResults.goalAchieved ? 'Goal Achieved!' : 'Goal Not Met'}
                  </div>
                  <div className="text-sm text-white/80">
                    {simulationResults.successProbability.toFixed(0)}% success probability
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold mb-4">Investment Breakdown</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Monthly Investment:</span>
                    <span className="font-semibold float-right">₹{simulationResults.monthlyAmount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Invested:</span>
                    <span className="font-semibold float-right">₹{simulationResults.totalInvested.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Investment Period:</span>
                    <span className="font-semibold float-right">{simulationResults.timeHorizon} months</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Portfolio Return:</span>
                    <span className="font-semibold float-right">{calculatePortfolioReturn().toFixed(1)}% p.a.</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={resetSimulation}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Try Different Allocation
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Save & Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}