import React, { useEffect, useCallback } from 'react';
import { Pickaxe, Coins } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const GameArea = () => {
  const { 
    coins, 
    clickPower, 
    autoClickPower,
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
      <div className="text-center mb-8">
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
        <div className="bg-brown-500 rounded-full p-8 shadow-lg hover:shadow-xl transition-shadow">
          <img 
            src="https://images.unsplash.com/photo-1620048269620-77fa550f01c7?auto=format&fit=crop&w=200&h=200" 
            alt="Gnome"
            className="w-32 h-32 rounded-full"
          />
        </div>
      </button>

      <div className="mt-8 space-y-4">
        <div className="text-white text-center">
          <p>Click Power: {clickPower}</p>
          <p>Auto-Click Power: {autoClickPower}/s</p>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={upgradeClickPower}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg shadow transition-colors"
            disabled={coins < clickPowerCost}
          >
            Upgrade Click Power ({clickPowerCost} coins)
          </button>

          <button
            onClick={upgradeAutoClicker}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg shadow transition-colors"
            disabled={coins < autoClickerCost}
          >
            Upgrade Auto-Clicker ({autoClickerCost} coins)
          </button>
        </div>
      </div>
    </div>
  );
};