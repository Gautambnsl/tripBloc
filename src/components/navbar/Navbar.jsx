import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logoImage from '../../assets/images/lightImage.png';
import { Box, Modal, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useWeb3Modal, useWeb3ModalState } from '@web3modal/ethers5/react';

const Navbar = ({ type }) => {
  const { dispatch } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [maskInputData, setMaskInputData] = useState('');
  const [isMaskNetworkSelected, setIsMaskNetworkSelected] = useState(false);
  const { open } = useWeb3Modal();
  const { selectedNetworkId } = useWeb3ModalState();
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  const lensConnected =
    JSON.parse(localStorage.getItem('user')) &&
    JSON.parse(localStorage.getItem('user')).email;

  const maskConnected = JSON.parse(localStorage.getItem('userData'));

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    dispatch({ type: 'LOGOUT' });
  };

  const connectWallet = () => {
    open();
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const connectWithLensProtocol = () => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        name: 'lensprotocol',
        email: 'dev@gmail.com',
      })
    );
  };

  useEffect(() => {
    const networkId = localStorage.getItem('selectedNetworkId');
    if (!networkId && selectedNetworkId) {
      localStorage.setItem('selectedNetworkId', selectedNetworkId);
    }
  }, []);

  useEffect(() => {
    if (selectedNetworkId) {
      localStorage.setItem('selectedNetworkId', selectedNetworkId);
    }
  }, [selectedNetworkId]);

  const handleMaskNetworkSelect = () => {
    setIsMaskNetworkSelected(true);
  };

  const handleMaskSubmit = async () => {
    try {
      const response = await fetch(
        `https://api.web3.bio/profile/ens/${maskInputData}`
      );
      const data = await response.json();
      const { displayName, avatar } = data;
      localStorage.setItem('userData', JSON.stringify({ displayName, avatar }));
      console.log('API Response:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <div className={type !== 'list' ? 'navbar' : 'navbar-list'}>
        <div className="navContainer">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <img src={logoImage} alt="TripBloc Logo" className="logo" />
          </Link>
          <div className="navItems">
            {lensConnected || maskConnected ? (
              <>
                <button
                  className="navButton-connectWallet"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
                {maskConnected && (
                  <>
                    <img
                      src={maskConnected?.avatar}
                      alt={maskConnected?.displayName}
                      loading="lazy"
                      style={{ width: '30px', height: '30px' }}
                    />
                    <span>{maskConnected?.displayName}</span>
                  </>
                )}
                <span>{lensConnected}</span>
                <button
                  className="navButton"
                  onClick={() => navigate('/register')}
                >
                  Admin
                </button>
                <button className="navButton" onClick={handleLogout}>
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  className="navButton"
                  onClick={() => setOpenModal(true)}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal open={openModal} onClick={handleClose} className="modal">
        <Box className="box-style">
          <Box className="box-flex">
            <Box
              className="box-inside-flex"
              onClick={() => loginWithRedirect()}
            >
              <img
                src="https://storage.googleapis.com/ethglobal-api-production/organizations%2F3zpxc%2Fimages%2Fapple-touch-icon%20(1).png"
                loading="lazy"
                alt="World Coin"
              />
              <Typography variant="caption" component="h6">
                Connect with your World Coin
              </Typography>
            </Box>
          </Box>
          <Box className="box-flex">
            <Box className="box-inside-flex" onClick={connectWithLensProtocol}>
              <img
                src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fvxwti%2Flogo%2F1678645512720_Screen%20Shot%202023-03-12%20at%2011.25.01%20AM.png"
                loading="lazy"
                alt="Lens Protocol"
              />
              <Typography variant="caption" component="h6">
                Connect with Lens Protocol
              </Typography>
            </Box>
          </Box>
          <Box className="box-flex">
            <Box className="box-inside-flex" onClick={handleMaskNetworkSelect}>
              <img
                src="https://storage.googleapis.com/ethglobal-api-production/organizations%2Fpn953%2Flogo%2F1680188467903_aVevg5nN_400x400.jpeg"
                loading="lazy"
                alt="Mask Network"
              />
              <Typography variant="caption" component="h6">
                Connect with your Mask Network
              </Typography>
            </Box>
          </Box>
          {isMaskNetworkSelected && (
            <Box className="input-section">
              <input
                type="text"
                value={maskInputData}
                onChange={(e) => setMaskInputData(e.target.value)}
                placeholder="Enter Mask Network data"
              />
              <button onClick={handleMaskSubmit}>Submit</button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
