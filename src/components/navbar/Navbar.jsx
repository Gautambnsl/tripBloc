import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logoImage from '../../assets/images/lightImage.png';

const Navbar = ({ type }) => {
  const { user } = useContext(AuthContext);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const navigate = useNavigate();

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={type !== 'list' ? 'navbar' : 'navbar-list'}>
      <div className="navContainer">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <img src={logoImage} alt="TripBloc Logo" className="logo" />
        </Link>
        <div className="navItems">
          <button className="navButton" onClick={() => navigate('/login')}>
            Login
          </button>
          {/* <button className="navButton" onClick={() => navigate('/register')}>
            Register Your Hotel
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
