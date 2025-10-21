import React from 'react';
import { useMatch } from 'react-router-dom';
import { UserRole } from '../types';
import Header from '../components/dashboard/Header';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';
import StudentDetailsPage from './StudentDetailsPage';

interface DashboardProps {
  user: { role: UserRole };
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, theme, toggleTheme }) => {
  const studentDetailsMatch = useMatch('/dashboard/admin/student/:studentId');

  const renderContent = () => {
    if (studentDetailsMatch && user.role === UserRole.Admin) {
      return <StudentDetailsPage />;
    }
    
    switch (user.role) {
      case UserRole.Admin:
        return <AdminDashboard />;
      case UserRole.Teacher:
        return <TeacherDashboard />;
      case UserRole.Student:
        return <StudentDashboard />;
      case UserRole.Parent:
        return <ParentDashboard />;
      default:
        return <div>Invalid Role</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          userRole={user.role} 
          onLogout={onLogout} 
          theme={theme} 
          toggleTheme={toggleTheme} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
          <div className="container mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;