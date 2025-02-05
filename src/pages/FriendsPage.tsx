import React, { useEffect, useState } from 'react';
import { Users, Share2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      const telegramUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (telegramUser) {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', telegramUser.id)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
          return;
        }

        setUser(userData);

        const { data: friendsData, error: friendsError } = await supabase
          .from('friends')
          .select('friend_id, status')
          .eq('profile_id', userData.id);

        if (friendsError) {
          console.error('Error fetching friends data:', friendsError);
          return;
        }

        // Fetch friend profiles
        const friendProfiles = await Promise.all(
          friendsData.map(async (friend) => {
            const { data: friendProfile, error: friendProfileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', friend.friend_id)
              .single();

            if (friendProfileError) {
              console.error('Error fetching friend profile:', friendProfileError);
              return null;
            }

            return {
              ...friendProfile,
              status: friend.status
            };
          })
        );

        setFriends(friendProfiles.filter((profile) => profile !== null));
      }
    };

    fetchFriends();
  }, []);

  if (!user) return <div>Loading...</div>;

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
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
              >
                <div>
                  <div className="font-medium">{friend.wallet_address}</div>
                  <div className="text-sm text-gray-400">
                    Joined: {friend.created_at.split('T')[0]}
                  </div>
                </div>
                <div className="text-yellow-400">Level {friend.click_power}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};