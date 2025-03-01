import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Navigation } from './components/Navigation';
import { GameArea } from './components/GameArea';
import { TasksPage } from './pages/TasksPage';
import { FriendsPage } from './pages/FriendsPage';
import { AirdropPage } from './pages/AirdropPage';
import { UpgradesPage } from './pages/UpgradesPage';
import { useGameStore } from './store/gameStore';

function App() {
  const setUserData = useGameStore(state => state.setUserData);

  useEffect(() => {
    setUserData();
  }, [setUserData]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <div className="absolute top-4 right-4 z-50">
          <TonConnectButton />
        </div>
        
        <Routes>
          <Route path="/" element={<GameArea />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/airdrop" element={<AirdropPage />} />
          <Route path="/upgrades" element={<UpgradesPage />} />
        </Routes>

        <Navigation />
      </div>
    </Router>
  );
}

export default App;