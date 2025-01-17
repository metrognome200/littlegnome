import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  coins: number;
  clickPower: number;
  autoClickPower: number;
  lastSaved: number;
  upgrades: {
    clickPower: number;
    autoClicker: number;
  };
  addCoins: (amount: number) => void;
  upgradeClickPower: () => void;
  upgradeAutoClicker: () => void;
  calculateOfflineProgress: () => void;
}

const CLICK_POWER_COST_MULTIPLIER = 1.5;
const AUTO_CLICKER_COST_MULTIPLIER = 2;

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      coins: 0,
      clickPower: 1,
      autoClickPower: 0,
      lastSaved: Date.now(),
      upgrades: {
        clickPower: 0,
        autoClicker: 0,
      },

      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),

      upgradeClickPower: () => {
        const state = get();
        const cost = Math.floor(10 * Math.pow(CLICK_POWER_COST_MULTIPLIER, state.upgrades.clickPower));
        
        if (state.coins >= cost) {
          set((state) => ({
            coins: state.coins - cost,
            clickPower: state.clickPower + 1,
            upgrades: {
              ...state.upgrades,
              clickPower: state.upgrades.clickPower + 1,
            },
          }));
        }
      },

      upgradeAutoClicker: () => {
        const state = get();
        const cost = Math.floor(25 * Math.pow(AUTO_CLICKER_COST_MULTIPLIER, state.upgrades.autoClicker));
        
        if (state.coins >= cost) {
          set((state) => ({
            coins: state.coins - cost,
            autoClickPower: state.autoClickPower + 1,
            upgrades: {
              ...state.upgrades,
              autoClicker: state.upgrades.autoClicker + 1,
            },
          }));
        }
      },

      calculateOfflineProgress: () => {
        const state = get();
        const now = Date.now();
        const timeDiff = now - state.lastSaved;
        const offlineCoins = Math.floor((timeDiff / 1000) * state.autoClickPower);
        
        if (offlineCoins > 0) {
          set((state) => ({
            coins: state.coins + offlineCoins,
            lastSaved: now,
          }));
        }
      },
    }),
    {
      name: 'little-gnome-game',
    }
  )
);