import React from 'react';
import { Users, UserPlus, Share2 } from 'lucide-react';

export const FriendsPage = () => {
  const friends = [
    {
      address: '0x1234...5678',
      level: 15,
      joinedDate: '2024-02-20',
    },
    {
      address: '0x8765...4321',
      level: 23,
      joinedDate: '2024-02-19',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Friends & Referrals</h1>
        
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Share2 className="text-yellow-400" />
            Your Referral Link
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              value="https://littlegnome.app/ref/abc123"
              readOnly
              className="flex-1 bg-gray-700 rounded px-3 py-2 text-sm"
            />
            <button className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded">
              Copy
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="text-yellow-400" />
            Friends List
          </h2>
          <div className="space-y-4">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
              >
                <div>
                  <div className="font-medium">{friend.address}</div>
                  <div className="text-sm text-gray-400">
                    Joined: {friend.joinedDate}
                  </div>
                </div>
                <div className="text-yellow-400">Level {friend.level}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};