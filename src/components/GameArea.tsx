import React, { useEffect, useCallback } from 'react';
import { Pickaxe, Coins, User } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const GameArea = () => {
  const { 
    coins, 
    clickPower, 
    autoClickPower,
    username,
    addCoins, 
    upgradeClickPower, 
    upgradeAutoClicker,
    calculateOfflineProgress 
  } = useGameStore();

  useEffect(() => {
    calculateOfflineProgress();
    
    const interval = setInterval(() => {
      if (autoClickPower > 0) {
        addCoins(autoClickPower);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickPower, addCoins, calculateOfflineProgress]);

  const handleClick = useCallback(() => {
    addCoins(clickPower);
    // Add haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  }, [clickPower, addCoins]);

  const clickPowerCost = Math.floor(10 * Math.pow(1.5, useGameStore().upgrades.clickPower));
  const autoClickerCost = Math.floor(25 * Math.pow(2, useGameStore().upgrades.autoClicker));

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-800 to-green-900 p-4">
      <div className="text-center mb-4">
        {username && (
          <div className="flex items-center justify-center text-white mb-2">
            <User className="mr-2" size={20} />
            <span>{username}</span>
          </div>
        )}
        <h1 className="text-4xl font-bold text-yellow-300 mb-2">Little Gnome</h1>
        <div className="flex items-center justify-center text-2xl text-yellow-400">
          <Coins className="mr-2" />
          <span>{Math.floor(coins)} coins</span>
        </div>
      </div>

      <button
        onClick={handleClick}
        className="transform active:scale-95 transition-transform"
      >
        <div className="bg-brown-500 rounded-full p-8 shadow-lg hover:shadow-xl transition-shadow relative">
          <img 
            src="/gnome1.png"
            alt="Gnome"
            className="w-32 h-32 rounded-full"
          />
          {clickPower > 1 && (
            <div className="absolute -top-2 -right-2 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
              {clickPower}x
            </div>
          )}
        </div>
      </button>

      <div className="mt-6 space-y-3 w-full max-w-xs">
        <div className="bg-gray-800 rounded-lg p-3 text-white text-center">
          <p>Click Power: {clickPower}</p>
          <p>Auto-Click: {autoClickPower}/s</p>
        </div>

        <button
          onClick={upgradeClickPower}
          className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center justify-between"
          disabled={coins < clickPowerCost}
        >
          <span>Upgrade Click Power</span>
          <span>{clickPowerCost} 🪙</span>
        </button>

        <button
          onClick={upgradeAutoClicker}
          className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg shadow transition-colors flex items-center justify-between"
          disabled={coins < autoClickerCost}
        >
          <span>Upgrade Auto-Clicker</span>
          <span>{autoClickerCost} 🪙</span>
        </button>
      </div>
    </div>
  );
};
