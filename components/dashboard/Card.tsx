
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const Card: React.FC<CardProps> = ({ title, icon, children, className = '', color = 'blue' }) => {
  const borderColor = `border-${color}-500`;
  const iconColor = `text-${color}-500`;
  const bgColor = `bg-${color}-100 dark:bg-${color}-900/20`;

  // Tailwind JIT compiler needs full class names, so we construct them carefully.
  const borderClass = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    orange: 'border-orange-500',
    purple: 'border-purple-500',
    red: 'border-red-500',
    yellow: 'border-yellow-500',
  }[color] || 'border-blue-500';

  const iconBgClass = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-500',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-500',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-500',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-500',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-500',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500',
  }[color] || 'bg-blue-100 dark:bg-blue-900/30 text-blue-500';

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border-l-4 ${borderClass} ${className}`}>
      <div className="p-5">
        <div className="flex items-center">
          <div className={`p-3 rounded-full ${iconBgClass}`}>
            {icon}
          </div>
          <h3 className="ml-4 text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
        </div>
        <div className="mt-4 text-gray-600 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
