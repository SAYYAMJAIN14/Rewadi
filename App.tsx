import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { UserRole } from './types';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState<{ role: UserRole } | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleLogin = (role: UserRole) => {
    setUser({ role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            user ? (
              <Navigate to={`/dashboard/${user.role.toLowerCase()}`} />
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          } 
        />
        <Route 
          path="/dashboard/:role" 
          element={
            user ? (
              <Dashboard user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/dashboard/admin/student/:studentId"
          element={
             user && user.role === UserRole.Admin ? (
              <Dashboard user={user} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;