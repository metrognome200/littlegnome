import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Target, Users, Gift, Zap } from 'lucide-react';

export const Navigation = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/tasks', icon: Target, label: 'Tasks' },
    { to: '/friends', icon: Users, label: 'Friends' },
    { to: '/airdrop', icon: Gift, label: 'Airdrop' },
    { to: '/upgrades', icon: Zap, label: 'Upgrades' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col items-center p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-yellow-400 bg-gray-800'
                    : 'text-gray-400 hover:text-yellow-300 hover:bg-gray-800'
                }`
              }
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};