import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LearningModules from './components/LearningModules';
import PortfolioSimulator from './components/PortfolioSimulator';
import GoalsPage from './components/Goals/GoalsPage';
import ProfilePage from './components/Profile/ProfilePage';
import AuthModal from './components/Auth/AuthModal';
import Onboarding from './components/Onboarding';
import { PageLoader } from './components/LoadingSpinner';
import { User, Goal, Notification } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Welcome to InvestSmart!',
      message: 'Complete your first learning module to earn 100 points.',
      type: 'info',
      read: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Goal Reminder',
      message: 'Your motorcycle goal needs ₹5,000 monthly investment to stay on track.',
      type: 'warning',
      read: false,
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
    }
  ]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [simulatingGoal, setSimulatingGoal] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Show auth modal if no user
  React.useEffect(() => {
    if (!user) {
      setShowAuthModal(true);
    }
  }, [user]);

  const handleOnboardingComplete = (userData: {
    name: string;
    email: string;
    goals: Omit<Goal, 'id' | 'currentAmount' | 'createdAt'>[];
  }) => {
    const newUser: User = {
      id: '1',
      name: userData.name,
      email: userData.email,
      profileComplete: true,
      level: 1,
      points: 0,
      badges: [],
      investmentExperience: 'beginner',
      preferences: {
        notifications: {
          email: true,
          push: true,
          goalReminders: true,
          learningUpdates: true,
          marketUpdates: false,
        },
        language: 'en',
        currency: 'INR',
        theme: 'light',
      },
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };

    const newGoals: Goal[] = userData.goals.map((goal, index) => ({
      ...goal,
      id: `goal-${index + 1}`,
      userId: newUser.id,
      currentAmount: 0,
      priority: 'medium',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    setUser(newUser);
    setGoals(newGoals);
    setShowAuthModal(false);
  };

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data - in real app, this would come from your backend
    const mockUser: User = {
      id: '1',
      name: 'John Doe',
      email: email,
      profileComplete: true,
      level: 2,
      points: 350,
      badges: [],
      investmentExperience: 'intermediate',
      preferences: {
        notifications: {
          email: true,
          push: true,
          goalReminders: true,
          learningUpdates: true,
          marketUpdates: false,
        },
        language: 'en',
        currency: 'INR',
        theme: 'light',
      },
      createdAt: new Date('2024-01-01'),
      lastLoginAt: new Date(),
    };

    setUser(mockUser);
    setLoading(false);
  };

  const handleSignUp = async (userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: '1',
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      profileComplete: false,
      level: 1,
      points: 0,
      badges: [],
      investmentExperience: 'beginner',
      preferences: {
        notifications: {
          email: true,
          push: true,
          goalReminders: true,
          learningUpdates: true,
          marketUpdates: false,
        },
        language: 'en',
        currency: 'INR',
        theme: 'light',
      },
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };

    setUser(newUser);
    setLoading(false);
  };

  const handleSignOut = () => {
    setUser(null);
    setGoals([]);
    setCurrentPage('dashboard');
    setSimulatingGoal(null);
    setShowAuthModal(true);
  };

  const handleStartSimulation = (goalId: string) => {
    setSimulatingGoal(goalId);
  };

  const handleModuleComplete = (moduleId: string) => {
    if (user) {
      setUser(prev => prev ? {
        ...prev,
        points: prev.points + 100,
        level: Math.floor((prev.points + 100) / 500) + 1,
      } : null);
    }
  };

  const handleAddGoal = async (goalData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newGoal: Goal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      userId: user!.id,
      currentAmount: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setGoals(prev => [...prev, newGoal]);
    
    // Add success notification
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      title: 'Goal Added Successfully!',
      message: `Your goal "${goalData.title}" has been created.`,
      type: 'success',
      read: false,
      createdAt: new Date(),
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleEditGoal = async (goalId: string, updates: Partial<Goal>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, ...updates, updatedAt: new Date() }
        : goal
    ));
  };

  const handleDeleteGoal = async (goalId: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const handleUpdateProfile = async (updates: Partial<User>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser(prev => prev ? { ...prev, ...updates } : null);
    
    // Add success notification
    const notification: Notification = {
      id: `notif-${Date.now()}`,
      title: 'Profile Updated',
      message: 'Your profile has been successfully updated.',
      type: 'success',
      read: false,
      createdAt: new Date(),
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!user && !showAuthModal) {
    return <PageLoader />;
  }

  if (!user) {
    return (
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
    );
  }

  if (!user.profileComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            goals={goals} 
            onStartSimulation={handleStartSimulation}
          />
        );
      case 'goals':
        return (
          <GoalsPage
            goals={goals}
            onAddGoal={handleAddGoal}
            onEditGoal={handleEditGoal}
            onDeleteGoal={handleDeleteGoal}
            onStartSimulation={handleStartSimulation}
          />
        );
      case 'learn':
        return <LearningModules onModuleComplete={handleModuleComplete} />;
      case 'achievements':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
            <p className="text-gray-600">Your badges and achievements will appear here</p>
          </div>
        );
      case 'profile':
        return (
          <ProfilePage
            user={user}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      onPageChange={setCurrentPage}
      notifications={notifications}
      onMarkNotificationAsRead={handleMarkNotificationAsRead}
      onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
      onDeleteNotification={handleDeleteNotification}
      onSignOut={handleSignOut}
      userName={user.name}
      userLevel={user.level}
    >
      {renderCurrentPage()}
      
      {simulatingGoal && (
        <PortfolioSimulator
          goal={goals.find(g => g.id === simulatingGoal)!}
          onClose={() => setSimulatingGoal(null)}
        />
      )}
    </Layout>
  );
}

export default App;