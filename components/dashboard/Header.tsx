
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../../types';
import { SchoolIcon, LogoutIcon, SunIcon, MoonIcon } from '../icons';

interface HeaderProps {
  userRole: UserRole;
  onLogout: () => void;
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, onLogout, theme, toggleTheme }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center z-10">
      <div className="flex items-center space-x-3">
        <SchoolIcon className="w-8 h-8 text-blue-500" />
        <div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Rewadi Ashram Shala</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">{userRole} Portal</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={toggleTheme} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
          {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
        </button>
        <button onClick={handleLogoutClick} className="flex items-center space-x-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold transition-colors">
          <LogoutIcon className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
