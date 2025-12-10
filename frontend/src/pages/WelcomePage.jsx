import { useNavigate } from 'react-router-dom';
import { FaCar, FaCog, FaTools, FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { GiCarWheel, GiCarDoor } from 'react-icons/gi';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* Floating Icons Background */}
      <div className="floating-icons">
        <FaCar className="float-icon icon-1" />
        <FaCog className="float-icon icon-2" />
        <GiCarWheel className="float-icon icon-3" />
        <FaTools className="float-icon icon-4" />
        <GiCarDoor className="float-icon icon-5" />
        <FaCog className="float-icon icon-6" />
      </div>

      <div className="welcome-content">
        {/* Logo/Icon */}
        <div className="welcome-logo">
          <FaCar className="main-logo" />
        </div>

        {/* Welcome Text */}
        <h1 className="welcome-title">Welcome to</h1>
        <h2 className="welcome-app-name">Global Car Parts Finder</h2>
        <p className="welcome-subtitle">
          Find genuine car parts near you with ease. Connect with local shops and get the parts you need instantly.
        </p>

        {/* Action Buttons */}
        <div className="welcome-buttons">
          <button 
            className="btn-welcome btn-register" 
            onClick={() => navigate('/register')}
          >
            <FaUserPlus className="btn-icon" />
            <span>Create Account</span>
          </button>
          
          <button 
            className="btn-welcome btn-login" 
            onClick={() => navigate('/login')}
          >
            <FaSignInAlt className="btn-icon" />
            <span>Login</span>
          </button>
        </div>

        {/* Features */}
        <div className="welcome-features">
          <div className="feature-item">
            <FaCar className="feature-icon" />
            <span>Genuine Parts</span>
          </div>
          <div className="feature-item">
            <FaTools className="feature-icon" />
            <span>Local Shops</span>
          </div>
          <div className="feature-item">
            <GiCarWheel className="feature-icon" />
            <span>Best Prices</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;