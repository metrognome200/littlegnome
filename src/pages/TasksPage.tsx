import React from 'react';
import { Trophy, Star, Target } from 'lucide-react';

export const TasksPage = () => {
  const tasks = [
    {
      icon: Trophy,
      title: 'Daily Login',
      description: 'Login every day to earn bonus coins',
      reward: '100 coins',
      progress: '1/1',
      completed: true,
    },
    {
      icon: Star,
      title: 'Click Master',
      description: 'Click 1000 times',
      reward: '500 coins',
      progress: '750/1000',
      completed: false,
    },
    {
      icon: Target,
      title: 'Upgrade Champion',
      description: 'Purchase 5 upgrades',
      reward: '1000 coins',
      progress: '3/5',
      completed: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pb-24">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Daily Tasks</h1>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <task.icon className="w-8 h-8 text-yellow-400" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <p className="text-gray-400 text-sm">{task.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-sm text-yellow-400">
                    Reward: {task.reward}
                  </div>
                  <div className="text-sm text-gray-400">
                    Progress: {task.progress}
                  </div>
                </div>
              </div>
              {task.completed && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                  Completed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};