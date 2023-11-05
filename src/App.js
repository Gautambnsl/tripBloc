import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import RegisterHotel from './pages/registerHotel/RegisterHotel';
import { DynamicContextProvider, SortWallets } from '@dynamic-labs/sdk-react';
import { useState } from 'react';

function App() {
  const [alertProps, setAlertProps] = useState({
    show: false,
    type: '',
    message: '',
  });
  const [showDynamicNav, setShowDynamicNav] = useState(false);
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'be72e05e-2712-4d85-8d2f-214df749013f',
        walletsFilter: SortWallets([
          'coinbase',
          'metamask',
          'walletconnect',
          'zengo',
        ]),
        defaultNumberOfWalletsToShow: 4,
        eventsCallbacks: {
          onLinkSuccess: (args) => {
            setAlertProps({
              show: true,
              type: 'success',
              message: 'Wallet linked!',
            });
            setShowDynamicNav(false);
          },
          onAuthSuccess: (args) => {
            setAlertProps({
              show: true,
              type: 'success',
              message: 'Auth success!',
            });
          },
          onLogout: (args) => {
            setAlertProps({
              show: true,
              type: 'success',
              message: 'Logout success!',
            });
          },
          onUserProfileUpdate: (user) => {
            setAlertProps({
              show: true,
              type: 'success',
              message: 'Profile update success!',
            });
          },
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterHotel />} />
        </Routes>
      </BrowserRouter>
    </DynamicContextProvider>
  );
}

export default App;
