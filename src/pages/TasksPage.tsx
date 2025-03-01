import React, { useEffect } from 'react';
import { Clock, Gift } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const TasksPage = () => {
  const { tasks, startTask, claimTask, getTaskProgress, initializeTasks } = useGameStore();

  useEffect(() => {
    initializeTasks();
    const progressInterval = setInterval(() => {
      tasks.forEach(task => {
        if (task.startedAt && !task.completed) {
          getTaskProgress(task.id);
        }
      });
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [initializeTasks, tasks, getTaskProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-yellow-300 mb-6 text-center">Daily Tasks</h1>
        
        <div className="space-y-4">
          {tasks.map((task) => {
            const progress = task.startedAt ? getTaskProgress(task.id) : 0;
            const timeLeft = task.timeToComplete - (task.startedAt ? Math.floor((Date.now() - task.startedAt) / 1000) : 0);
            
            return (
              <div
                key={task.id}
                className="bg-gray-800 rounded-lg p-4 shadow-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                    <p className="text-gray-400 text-sm">{task.description}</p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Gift size={16} className="mr-1" />
                    <span>{task.reward}</span>
                  </div>
                </div>

                {!task.claimed && (
                  <div className="mt-4">
                    {!task.startedAt && !task.completed && (
                      <button
                        onClick={() => startTask(task.id)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Start Task
                      </button>
                    )}

                    {task.startedAt && !task.completed && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-400">
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {formatTime(Math.max(0, timeLeft))}
                          </span>
                          <span>{Math.floor(progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-blue-600 rounded-full h-2 transition-all duration-1000"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {task.completed && !task.claimed && (
                      <button
                        onClick={() => claimTask(task.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Claim Reward
                      </button>
                    )}
                  </div>
                )}

                {task.claimed && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-700 text-gray-400 py-2 px-4 rounded-lg text-center">
                      Task Completed ✓
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};