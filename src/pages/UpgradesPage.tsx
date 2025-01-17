import React from 'react';
import { Zap, Shield, Rocket, Clock, Target, Star } from 'lucide-react';

export const UpgradesPage = () => {
  const upgrades = [
    {
      icon: Zap,
      title: 'Click Power',
      description: 'Increase coins per click',
      level: 5,
      cost: '1000',
      effect: '+1 coin per click',
    },
    {
      icon: Clock,
      title: 'Auto Clicker',
      description: 'Automatically generate coins',
      level: 3,
      cost: '2500',
      effect: '+2 coins per second',
    },
    {
      icon: Rocket,
      title: 'Boost Multiplier',
      description: 'Multiply all coin earnings',
      level: 2,
      cost: '5000',
      effect: 'x2 coin multiplier',
    },
    {
      icon: Shield,
      title: 'Offline Earnings',
      description: 'Increase offline earning rate',
      level: 1,
      cost: '3000',
      effect: '+50% offline earnings',
    },
    {
      icon: Target,
      title: 'Critical Click',
      description: 'Chance for bonus coins',
      level: 0,
      cost: '7500',
      effect: '10% chance for x5 coins',
    },
    {
      icon: Star,
      title: 'Lucky Streak',
      description: 'Consecutive clicks bonus',
      level: 0,
      cost: '10000',
      effect: 'Streak bonus up to x3',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pb-24">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Upgrades</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {upgrades.map((upgrade, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <upgrade.icon className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{upgrade.title}</h3>
                    <p className="text-gray-400 text-sm">{upgrade.description}</p>
                  </div>
                  <div className="text-yellow-400 text-sm">
                    Level {upgrade.level}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-300">{upgrade.effect}</div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="text-yellow-400">{upgrade.cost} coins</div>
                  <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};