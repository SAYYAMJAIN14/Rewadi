import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';
import { SchoolIcon, AdminIcon, TeacherIcon, StudentIcon, ParentIcon } from '../components/icons';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

const RoleCard: React.FC<{
  role: UserRole;
  icon: React.ReactNode;
  color: string;
  onLogin: (role: UserRole, email: string, pass: string) => void;
}> = ({ role, icon, color, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(role, email, password);
  };

  return (
    <div
      className={`group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transform hover:-translate-y-1 transition-all duration-300 border-b-4 ${expanded ? '' : 'border-transparent'}`}
      style={{ borderBottomColor: expanded ? color : 'transparent' }}
      onMouseEnter={e => !expanded && (e.currentTarget.style.borderBottomColor = color)}
      onMouseLeave={e => !expanded && (e.currentTarget.style.borderBottomColor = 'transparent')}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        className="w-full flex flex-col items-center"
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${color}33` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{role}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Login as {role}</p>
      </div>

      {expanded && (
        <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4 transition-all duration-500">
          <div>
            <input
              id={`email-${role}`}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              style={{'--tw-ring-color': color} as React.CSSProperties}
              placeholder="Email Address"
            />
          </div>

          <div>
            <input
              id={`password-${role}`}
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              style={{'--tw-ring-color': color} as React.CSSProperties}
              placeholder="Password"
            />
          </div>
          
          <div>
            <button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              style={{ backgroundColor: color, '--tw-ring-color': color } as React.CSSProperties}
            >
              Sign in
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLoginAttempt = (role: UserRole, email: string, pass: string) => {
    // Specific credential check for Admin role
    if (role === UserRole.Admin) {
      if (email === 'admin@1234' && pass === 'Admin@123') {
        onLogin(role);
        navigate(`/dashboard/${role.toLowerCase()}`);
      } else {
        alert('Invalid Admin credentials. Please try again.');
      }
      return;
    }

    // Fallback for other roles (simple validation)
    if (email && pass) {
      onLogin(role);
      navigate(`/dashboard/${role.toLowerCase()}`);
    } else {
      alert('Please enter a valid email and password.');
    }
  };

  const roles = [
    { role: UserRole.Admin, icon: <AdminIcon className="w-10 h-10" />, color: '#3b82f6' },
    { role: UserRole.Teacher, icon: <TeacherIcon className="w-10 h-10" />, color: '#10b981' },
    { role: UserRole.Student, icon: <StudentIcon className="w-10 h-10" />, color: '#f97316' },
    { role: UserRole.Parent, icon: <ParentIcon className="w-10 h-10" />, color: '#8b5cf6' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-all duration-300">
      <div className="text-center mb-10">
        <div className="inline-block bg-blue-500 text-white rounded-full p-4 mb-4">
          <SchoolIcon className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
          Rewadi Ashram Shala <span className="text-blue-500">SmartApp</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Digital Bridge Between School, Parents & Students.
        </p>
      </div>

      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {roles.map(({ role, icon, color }) => (
            <RoleCard
              key={role}
              role={role}
              icon={icon}
              color={color}
              onLogin={handleLoginAttempt}
            />
          ))}
        </div>
      </div>
      
      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Rewadi Ashram Shala. All Rights Reserved.</p>
        <p className="text-sm">Powered by AI for a Smarter Future.</p>
      </footer>
    </div>
  );
};

export default LoginPage;