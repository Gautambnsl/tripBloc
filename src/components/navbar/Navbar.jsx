import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logoImage from '../../assets/images/lightImage.png';
import { Box, Modal, Typography } from '@mui/material';
import { useDynamicContext } from '@dynamic-labs/sdk-react';
import { IDKitWidget } from '@worldcoin/idkit';
import toast from 'react-hot-toast';
import {
  useWeb3Modal,
  useWeb3ModalSigner,
  useWeb3ModalState,
} from '@web3modal/ethers5/react';

const Navbar = ({ type }) => {
  const { user, dispatch } = useContext(AuthContext);
  const { setShowAuthFlow } = useDynamicContext();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [openModal, setOpenModal] = useState(false);
  const { open } = useWeb3Modal();
  const { selectedNetworkId } = useWeb3ModalState();
  const { signer } = useWeb3ModalSigner();

  console.log('selectedNetworkId', selectedNetworkId);
  console.log('signer', signer);

  const dynamicConnected =
    localStorage.getItem('dynamic_authenticated_user') &&
    JSON.parse(localStorage.getItem('dynamic_authenticated_user')).email;
  const navigate = useNavigate();

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

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
    dispatch({ type: 'LOGIN_START' });
    dispatch({
      type: 'LOGIN_SUCCESS',
      name: dynamicConnected,
      loginWith: 'Dynamic',
    });
  };

  const connectWithDynamic = () => {
    setShowAuthFlow(true);
  };

  const connectWithLensProtocol = () => {
    toast.success('Comming Soon...');
  };

  return (
    <>
      <div className={type !== 'list' ? 'navbar' : 'navbar-list'}>
        <div className="navContainer">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <img src={logoImage} alt="TripBloc Logo" className="logo" />
          </Link>
          <div className="navItems">
            {!!dynamicConnected ? (
              <>
                <button className="navButton" onClick={connectWallet}>
                  Connect Wallet
                </button>
                {dynamicConnected}
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
            {!!dynamicConnected ? <></> : null}
            {/* <button className="navButton" onClick={() => navigate('/register')}>
            Register Your Hotel
          </button> */}
          </div>
        </div>
      </div>
      <Modal open={openModal} onClick={handleClose} className="modal">
        <Box className="box-style">
          <Box className="box-flex">
            <IDKitWidget
              app_id="wid_staging_9f3a190dcfd6bcd9a27f6f88bc31793e"
              action="vote_1"
              signal="user_value"
              onSuccess={() => console.log('success')}
              credential_types={['orb', 'phone']}
              enableTelemetry
            >
              {({ open }) => (
                <Box className="box-inside-flex" onClick={open}>
                  <img src='https://worldcoin.org/icons/logo-small.svg' loading="lazy" alt="World Coin" />
                  {/* <Typography variant="h6" component="h4">
                    World Coin
                  </Typography> */}
                  <Typography variant="caption" component="h6">
                    Connect with your World Coin
                  </Typography>
                </Box>
              )}
            </IDKitWidget>
          </Box>
          <Box className="box-flex">
            <Box className="box-inside-flex" onClick={connectWithDynamic}>
              <img src="https://assets-global.website-files.com/626692727bba3f384e008e8a/632d74b82fd2862796d5f6a0_logo-dark.svg" style={{width:'150px'}} loading="lazy" alt="Dynamic" />
              {/* <Typography variant="h6" component="h4">
                Dynamic
              </Typography> */}
              <Typography variant="caption" component="h6">
                Connect with Dynamic
              </Typography>
            </Box>
          </Box>
          <Box className="box-flex">
            <Box className="box-inside-flex" onClick={connectWithLensProtocol}>
              <img src="https://raw.githubusercontent.com/lens-protocol/brand-kit/074e865b5da4b2b80133915b15e82f9ba1f02881/01%20Logo/SVG/Icon-Black.svg" loading="lazy" alt="Lens Protocol" />
              {/* <Typography variant="h6" component="h4">
                Lens Protocol
              </Typography> */}
              <Typography variant="caption" component="h6">
                Connect with Lens Protocol
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
