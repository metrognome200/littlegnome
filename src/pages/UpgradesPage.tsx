import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Zap, Shield, Rocket, Clock, Target, Star } from 'lucide-react';

const icons = {
  Zap,
  Shield,
  Rocket,
  Clock,
  Target,
  Star,
};

const UpgradesPage = () => {
  const [upgrades, setUpgrades] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initTelegramWebApp = async () => {
      if (window.Telegram.WebApp.initDataUnsafe) {
        const user = window.Telegram.WebApp.initDataUnsafe.user;
        const walletAddress = user.id; // or user.username

        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', walletAddress)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
          return;
        }

        setUser(userData);

        const { data: upgradesData, error: upgradesError } = await supabase
          .from('upgrades')
          .select('*')
          .eq('profile_id', userData.id);

        if (upgradesError) {
          console.error('Error fetching upgrades data:', upgradesError);
          return;
        }

        setUpgrades(upgradesData);
      }
    };

    initTelegramWebApp();
  }, []);

  const handleUpgrade = async (upgradeId) => {
    const upgrade = upgrades.find((u) => u.id === upgradeId);
    if (!upgrade) return;

    if (user.coins >= upgrade.cost) {
      const { data, error } = await supabase
        .from('upgrades')
        .update({ level: upgrade.level + 1 })
        .eq('id', upgradeId);

      if (error) {
        console.error('Error updating upgrade:', error);
        return;
      }

      // Update user's coins
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .update({ coins: user.coins - upgrade.cost })
        .eq('id', user.id)
        .single();

      if (userError) {
        console.error('Error updating user coins:', userError);
        return;
      }

      setUser(userData);
      setUpgrades((prevUpgrades) =>
        prevUpgrades.map((u) =>
          u.id === upgradeId ? { ...u, level: upgrade.level + 1 } : u
        )
      );
    } else {
      console.error('Not enough coins');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pb-24">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Upgrades</h1>
      <div className="grid grid-cols-1 gap-4">
        {upgrades.map((upgrade) => {
          const Icon = icons[upgrade.type];
          return (
            <div
              key={upgrade.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-700 p-3 rounded-lg">
                  <Icon className="w-8 h-8 text-yellow-400" />
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
                    <button
                      className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm"
                      onClick={() => handleUpgrade(upgrade.id)}
                    >
                      Upgrade
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-yellow-400">
        Coins: {user.coins}
      </div>
    </div>
  );
};

export default UpgradesPage;