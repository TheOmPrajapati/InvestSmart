import React, { useState } from 'react';
import { BookOpen, Play, Clock, CheckCircle, ArrowRight, Target, TrendingUp, PieChart, Calculator } from 'lucide-react';
import { LearningModule } from '../types';
import { LEARNING_MODULES } from '../utils/constants';

interface LearningModulesProps {
  onModuleComplete: (moduleId: string) => void;
}

export default function LearningModules({ onModuleComplete }: LearningModulesProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [modules, setModules] = useState(LEARNING_MODULES);

  const getModuleIcon = (moduleId: string) => {
    switch (moduleId) {
      case 'basics': return Target;
      case 'risk': return TrendingUp;
      case 'diversification': return PieChart;
      case 'compound_interest': return Calculator;
      default: return BookOpen;
    }
  };

  const getModuleContent = (moduleId: string) => {
    const content = {
      basics: {
        title: 'Investment Basics',
        sections: [
          {
            title: 'What is Investing?',
            content: `Investing is the process of putting your money to work to potentially earn more money over time. Unlike saving, where money sits idle in a bank account, investing involves purchasing assets that have the potential to grow in value.

Key Concepts:
• Capital: The money you invest
• Returns: The profit you make from investments
• Assets: Things you invest in (stocks, bonds, real estate, etc.)
• Time Horizon: How long you plan to keep your money invested`,
          },
          {
            title: 'Why Should You Invest?',
            content: `1. Beat Inflation: Over time, the cost of living increases. Investing helps your money grow faster than inflation.

2. Build Wealth: Regular investing can help you accumulate significant wealth over time through the power of compounding.

3. Achieve Goals: Whether it's buying a house, funding education, or retirement, investing helps you reach your financial goals.

4. Financial Security: Having investments provides a financial cushion and multiple income sources.`,
          },
          {
            title: 'Getting Started',
            content: `Before you start investing:
• Set clear financial goals
• Build an emergency fund (3-6 months expenses)
• Pay off high-interest debt
• Understand your risk tolerance
• Start with small amounts
• Educate yourself continuously`,
          }
        ],
        quiz: [
          {
            question: "What is the main difference between saving and investing?",
            options: [
              "Saving is for short-term, investing is for long-term",
              "Saving guarantees returns, investing doesn't",
              "Saving keeps money idle, investing puts money to work for potential growth",
              "All of the above"
            ],
            correct: 3,
            explanation: "All these statements are true. The key distinction is that investing involves putting money to work for potential growth, while saving typically keeps money safe but idle."
          }
        ]
      },
      risk: {
        title: 'Understanding Risk & Return',
        sections: [
          {
            title: 'The Risk-Return Relationship',
            content: `In investing, risk and return are directly related. Generally, the higher the potential return, the higher the risk involved.

Types of Risk:
• Market Risk: Overall market movements affect your investments
• Inflation Risk: Your returns may not keep up with rising prices
• Liquidity Risk: Difficulty in selling investments quickly
• Company Risk: Specific risks to individual companies`,
          },
          {
            title: 'Risk Tolerance',
            content: `Your risk tolerance depends on:
• Age: Younger investors can typically take more risk
• Financial Goals: Long-term goals can handle more volatility
• Income Stability: Stable income allows for higher risk
• Personal Comfort: Your emotional ability to handle losses

Risk Profiles:
• Conservative: Prefer stable returns, minimal risk
• Moderate: Balance between growth and stability  
• Aggressive: Willing to take higher risks for better returns`,
          },
          {
            title: 'Managing Risk',
            content: `Ways to manage investment risk:
• Diversification: Don't put all eggs in one basket
• Asset Allocation: Mix different types of investments
• Time Horizon: Longer periods can smooth out volatility
• Regular Review: Monitor and adjust your portfolio
• Education: Understanding what you invest in reduces risk`,
          }
        ],
        quiz: [
          {
            question: "What is the relationship between risk and return in investing?",
            options: [
              "Higher risk always means higher returns",
              "Lower risk always means higher returns", 
              "Higher potential returns generally come with higher risk",
              "Risk and return are not related"
            ],
            correct: 2,
            explanation: "Higher potential returns generally come with higher risk. This is a fundamental principle in investing - you typically need to accept more risk to have the chance of earning higher returns."
          }
        ]
      },
      diversification: {
        title: 'Portfolio Diversification',
        sections: [
          {
            title: 'What is Diversification?',
            content: `Diversification is the practice of spreading your investments across different assets, sectors, and markets to reduce risk. It's based on the principle of "not putting all your eggs in one basket."

Benefits of Diversification:
• Reduces overall portfolio risk
• Smooths out investment returns
• Protects against sector-specific downturns
• Provides exposure to different growth opportunities`,
          },
          {
            title: 'Types of Diversification',
            content: `1. Asset Class Diversification:
   • Stocks, bonds, real estate, commodities

2. Geographic Diversification:
   • Domestic and international markets

3. Sector Diversification:
   • Technology, healthcare, finance, etc.

4. Company Size Diversification:
   • Large-cap, mid-cap, small-cap stocks

5. Time Diversification:
   • Investing regularly over time (SIP)`,
          },
          {
            title: 'Building a Diversified Portfolio',
            content: `Steps to diversify:
1. Assess your risk tolerance and goals
2. Choose appropriate asset allocation
3. Select investments across different categories
4. Consider mutual funds for instant diversification
5. Regularly rebalance your portfolio
6. Avoid over-diversification

Sample Allocation for Moderate Risk:
• 60% Stocks (mix of large and small cap)
• 30% Bonds 
• 10% Alternative investments (Gold, REITs)`,
          }
        ],
        quiz: [
          {
            question: "What is the main purpose of diversification?",
            options: [
              "To maximize returns",
              "To minimize taxes",
              "To reduce risk by spreading investments",
              "To simplify portfolio management"
            ],
            correct: 2,
            explanation: "The main purpose of diversification is to reduce risk by spreading investments across different assets, sectors, and markets. This helps protect your portfolio from significant losses in any single investment."
          }
        ]
      },
      compound_interest: {
        title: 'The Power of Compounding',
        sections: [
          {
            title: 'What is Compound Interest?',
            content: `Compound interest is earning interest on both your original investment and previously earned interest. It's often called the "eighth wonder of the world" because of its powerful wealth-building potential.

Simple Interest vs Compound Interest:
• Simple Interest: Interest only on principal
• Compound Interest: Interest on principal + accumulated interest

Example: ₹10,000 at 10% annual interest
• Simple Interest after 10 years: ₹20,000
• Compound Interest after 10 years: ₹25,937`,
          },
          {
            title: 'The Magic of Time',
            content: `Time is the most powerful factor in compounding. The earlier you start, the more time your money has to grow.

Example: Starting early vs. late
Person A: Invests ₹5,000/month from age 25-35 (10 years)
Person B: Invests ₹5,000/month from age 35-65 (30 years)

At 10% annual return by age 65:
• Person A: ₹1.4 crores (invested ₹6 lakhs)
• Person B: ₹1.1 crores (invested ₹18 lakhs)

Starting early wins despite investing less!`,
          },
          {
            title: 'Maximizing Compounding',
            content: `How to make compounding work for you:
• Start investing as early as possible
• Invest regularly and consistently
• Reinvest your returns instead of withdrawing
• Choose investments with good long-term growth potential
• Be patient - compounding takes time to show dramatic results
• Avoid frequent trading - let your investments grow

The Rule of 72: Divide 72 by your expected annual return to see how long it takes to double your money.
Example: At 12% return, money doubles in 72/12 = 6 years`,
          }
        ],
        quiz: [
          {
            question: "What makes compound interest so powerful for long-term wealth building?",
            options: [
              "It guarantees higher returns",
              "It eliminates all investment risk",
              "It earns returns on both principal and accumulated interest",
              "It provides tax benefits"
            ],
            correct: 2,
            explanation: "Compound interest is powerful because it earns returns on both your original investment (principal) and all the interest you've previously earned. This creates an exponential growth effect over time."
          }
        ]
      }
    };

    return content[moduleId as keyof typeof content];
  };

  const handleStartModule = (moduleId: string) => {
    setSelectedModule(moduleId);
  };

  const handleCompleteModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId ? { ...module, completed: true } : module
    ));
    onModuleComplete(moduleId);
    setSelectedModule(null);
  };

  if (selectedModule) {
    const moduleContent = getModuleContent(selectedModule);
    const [currentSection, setCurrentSection] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border">
          {/* Header */}
          <div className="border-b p-6">
            <button
              onClick={() => setSelectedModule(null)}
              className="text-indigo-600 hover:text-indigo-800 mb-4 flex items-center space-x-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Back to Modules</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{moduleContent.title}</h1>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex space-x-1">
                {moduleContent.sections.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index <= currentSection ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
                <div className={`w-3 h-3 rounded-full ${showQuiz ? 'bg-indigo-600' : 'bg-gray-300'}`} />
              </div>
              <span className="text-sm text-gray-600">
                Step {showQuiz ? moduleContent.sections.length + 1 : currentSection + 1} of {moduleContent.sections.length + 1}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {!showQuiz ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    {moduleContent.sections[currentSection].title}
                  </h2>
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {moduleContent.sections[currentSection].content}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6 border-t">
                  <button
                    onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
                    disabled={currentSection === 0}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {currentSection < moduleContent.sections.length - 1 ? (
                    <button
                      onClick={() => setCurrentSection(prev => prev + 1)}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center space-x-2"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                    >
                      <span>Take Quiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Quiz Section */
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Knowledge Check</h2>
                  <p className="text-gray-600">Test your understanding of the concepts you've learned.</p>
                </div>

                {moduleContent.quiz.map((question, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <h3 className="font-medium mb-4">{question.question}</h3>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optionIndex}
                            onChange={() => {
                              const newAnswers = [...quizAnswers];
                              newAnswers[index] = optionIndex;
                              setQuizAnswers(newAnswers);
                            }}
                            className="text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    
                    {quizAnswers[index] !== undefined && (
                      <div className={`mt-4 p-3 rounded-lg ${
                        quizAnswers[index] === question.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                      }`}>
                        <p className={`font-medium ${
                          quizAnswers[index] === question.correct ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {quizAnswers[index] === question.correct ? 'Correct!' : 'Incorrect'}
                        </p>
                        <p className="text-sm text-gray-700 mt-1">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex justify-between pt-6 border-t">
                  <button
                    onClick={() => setShowQuiz(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back to Content
                  </button>
                  
                  <button
                    onClick={() => handleCompleteModule(selectedModule)}
                    disabled={quizAnswers.length < moduleContent.quiz.length}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Module</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Modules</h1>
        <p className="text-gray-600">Master the fundamentals of investing through interactive lessons</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Your Progress</h2>
          <span className="text-sm text-gray-600">
            {modules.filter(m => m.completed).length} of {modules.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(modules.filter(m => m.completed).length / modules.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => {
          const Icon = getModuleIcon(module.id);
          return (
            <div key={module.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    module.completed ? 'bg-green-100' : 'bg-indigo-100'
                  }`}>
                    {module.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Icon className="w-6 h-6 text-indigo-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{module.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        module.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                        module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{module.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.estimatedTime} min</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleStartModule(module.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                          module.completed
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                      >
                        {module.completed ? (
                          <>
                            <span>Review</span>
                            <BookOpen className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Start</span>
                            <Play className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}