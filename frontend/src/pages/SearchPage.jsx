import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaSignOutAlt, FaUser, FaCar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products', { state: { searchQuery } });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="search-page">
      <nav className="navbar">
        <div className="nav-brand">
          <FaCar className="brand-icon" />
          <span>Global Car Parts Finder</span>
        </div>
        <div className="nav-user">
          <FaUser className="user-icon" />
          <span>{user?.fullName}</span>
          <button onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <div className="search-container">
        <div className="search-content">
          <h1 className="search-title">Find Your Car Parts</h1>
          <p className="search-subtitle">
            Search from thousands of genuine car parts available near you
          </p>

          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search for car parts (e.g., side mirror, brake pads, headlight)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-search">Search</button>
          </form>

          <div className="popular-searches">
            <p>Popular searches:</p>
            <div className="search-tags">
              <button onClick={() => { setSearchQuery('mirror'); handleSearch({ preventDefault: () => {} }); }}>Mirrors</button>
              <button onClick={() => { setSearchQuery('brake'); handleSearch({ preventDefault: () => {} }); }}>Brake Pads</button>
              <button onClick={() => { setSearchQuery('light'); handleSearch({ preventDefault: () => {} }); }}>Lights</button>
              <button onClick={() => { setSearchQuery('filter'); handleSearch({ preventDefault: () => {} }); }}>Filters</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;