import './navbar.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import logoImage from '../../assets/images/lightImage.png';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <img src={logoImage} alt="TripBloc Logo" className="logo" />
        </Link>
        {user ? (
          <div className="navItems">
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="currencySelect"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BTC">BTC</option>
            </select>
            <span className="username">{user.username}</span>
          </div>
        ) : (
          <div className="navItems">
            <select
              value={selectedCurrency}
              onChange={handleCurrencyChange}
              className="currencySelect"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BTC">BTC</option>
            </select>
            <button className="navButton">Login</button>
            <button className="navButton">Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
