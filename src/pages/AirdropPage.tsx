import React from 'react';
import { Gift, Clock, Award } from 'lucide-react';

export const AirdropPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pb-24">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Airdrops</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <Gift className="w-10 h-10 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold">Daily Reward</h2>
              <p className="text-gray-400">Claim your daily TON tokens</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-yellow-400 text-lg">0.1 TON</div>
            <button className="bg-yellow-600 hover:bg-yellow-700 px-6 py-2 rounded-lg">
              Claim
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="w-10 h-10 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold">Weekly Bonus</h2>
              <p className="text-gray-400">Available in 3 days</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-yellow-400 text-lg">1 TON</div>
            <button className="bg-gray-700 px-6 py-2 rounded-lg" disabled>
              Coming Soon
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center gap-4 mb-4">
            <Award className="w-10 h-10 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold">Achievement Rewards</h2>
              <p className="text-gray-400">Special rewards for your progress</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Reach Level 10</div>
                <div className="text-sm text-gray-400">Progress: 8/10</div>
              </div>
              <div className="text-yellow-400">0.5 TON</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Invite 5 Friends</div>
                <div className="text-sm text-gray-400">Progress: 2/5</div>
              </div>
              <div className="text-yellow-400">0.3 TON</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};