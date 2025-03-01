import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { telegramService } from '../lib/telegram';

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  timeToComplete: number; // seconds
  startedAt: number | null;
  completed: boolean;
  claimed: boolean;
}

interface GameState {
  coins: number;
  clickPower: number;
  autoClickPower: number;
  lastSaved: number;
  userId: number | null;
  username: string | null;
  walletConnected: boolean;
  tasks: Task[];
  upgrades: {
    clickPower: number;
    autoClicker: number;
  };
  addCoins: (amount: number) => void;
  upgradeClickPower: () => void;
  upgradeAutoClicker: () => void;
  calculateOfflineProgress: () => void;
  setUserData: () => void;
  setWalletConnected: (connected: boolean) => void;
  startTask: (taskId: string) => void;
  claimTask: (taskId: string) => void;
  getTaskProgress: (taskId: string) => number;
  initializeTasks: () => void;
}

const CLICK_POWER_COST_MULTIPLIER = 1.5;
const AUTO_CLICKER_COST_MULTIPLIER = 2;

const INITIAL_TASKS: Task[] = [
  {
    id: 'daily-1',
    title: 'Daily Mining',
    description: 'Mine for 30 seconds to earn bonus coins',
    reward: 100,
    timeToComplete: 30,
    startedAt: null,
    completed: false,
    claimed: false,
  },
  {
    id: 'daily-2',
    title: 'Power Training',
    description: 'Train your gnome for 60 seconds',
    reward: 200,
    timeToComplete: 60,
    startedAt: null,
    completed: false,
    claimed: false,
  },
  {
    id: 'daily-3',
    title: 'Master Challenge',
    description: 'Complete an intense 120-second training',
    reward: 500,
    timeToComplete: 120,
    startedAt: null,
    completed: false,
    claimed: false,
  },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      coins: 0,
      clickPower: 1,
      autoClickPower: 0,
      lastSaved: Date.now(),
      userId: null,
      username: null,
      walletConnected: false,
      tasks: [],
      upgrades: {
        clickPower: 0,
        autoClicker: 0,
      },

      initializeTasks: () => {
        const state = get();
        if (state.tasks.length === 0) {
          set({ tasks: INITIAL_TASKS });
        }
      },

      startTask: (taskId: string) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId && !task.completed && !task.claimed
              ? { ...task, startedAt: Date.now() }
              : task
          ),
        }));
      },

      getTaskProgress: (taskId: string) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === taskId);
        if (!task || !task.startedAt || task.completed) return 0;

        const elapsedTime = (Date.now() - task.startedAt) / 1000;
        const progress = Math.min(100, (elapsedTime / task.timeToComplete) * 100);

        if (progress >= 100 && !task.completed) {
          set((state) => ({
            tasks: state.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: true } : t
            ),
          }));
        }

        return progress;
      },

      claimTask: (taskId: string) => {
        const state = get();
        const task = state.tasks.find((t) => t.id === taskId);
        
        if (task && task.completed && !task.claimed) {
          set((state) => ({
            coins: state.coins + task.reward,
            tasks: state.tasks.map((t) =>
              t.id === taskId ? { ...t, claimed: true } : t
            ),
          }));

          // Show achievement in Telegram
          telegramService.showMainButton('Task Completed! 🎯', () => {
            telegramService.hideMainButton();
          });
        }
      },

      setUserData: () => {
        const user = telegramService.getUser();
        if (user) {
          set({ userId: user.id, username: user.username || user.first_name });
        }
      },

      setWalletConnected: (connected: boolean) => {
        set({ walletConnected: connected });
      },

      addCoins: (amount) => {
        set((state) => {
          const newCoins = state.coins + amount;
          if (Math.floor(newCoins / 1000) > Math.floor(state.coins / 1000)) {
            telegramService.showMainButton('Share Achievement! 🏆', () => {
              telegramService.hideMainButton();
            });
          }
          return { coins: newCoins };
        });
      },

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