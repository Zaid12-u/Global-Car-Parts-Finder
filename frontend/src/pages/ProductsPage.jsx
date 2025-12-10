import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarkerAlt, FaTag, FaBox, FaCar, FaSignOutAlt } from 'react-icons/fa';
import { carPartsData } from '../data/carPartsData';
import { useAuth } from '../context/AuthContext';
import './ProductsPage.css';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [filteredParts, setFilteredParts] = useState([]);
  const searchQuery = location.state?.searchQuery || '';

  useEffect(() => {
    if (searchQuery) {
      const filtered = carPartsData.filter(part =>
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredParts(filtered);
    } else {
      setFilteredParts(carPartsData);
    }
  }, [searchQuery]);

  const handleViewLocation = (partId) => {
    navigate(`/maps/${partId}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="products-page">
      <nav className="navbar">
        <div className="nav-brand">
          <FaCar className="brand-icon" />
          <span>Global Car Parts Finder</span>
        </div>
        <div className="nav-user">
          <span>{user?.fullName}</span>
          <button onClick={handleLogout} className="btn-logout">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </nav>

      <div className="products-container">
        <div className="products-header">
          <button onClick={() => navigate('/home')} className="btn-back">
            <FaArrowLeft /> Back to Search
          </button>
          <h1>{searchQuery ? `Search Results for "${searchQuery}"` : 'All Car Parts'}</h1>
          <p>{filteredParts.length} parts found</p>
        </div>

        {filteredParts.length === 0 ? (
          <div className="no-results">
            <h2>No parts found</h2>
            <p>Try searching with different keywords</p>
            <button onClick={() => navigate('/')} className="btn-search-again">Search Again</button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredParts.map(part => (
              <div key={part.id} className="product-card">
                <div className="product-icon"><FaBox /></div>
                <div className="product-info">
                  <h3>{part.name}</h3>
                  <p className="product-description">{part.description}</p>
                  <div className="product-details">
                    <span className="product-category"><FaTag /> {part.category}</span>
                    <span className="product-brand">Brand: {part.brand}</span>
                  </div>
                  <div className="product-footer">
                    <span className="product-price">Rs. {part.price}</span>
                    <span className="product-stock">{part.stock > 0 ? `${part.stock} in stock` : 'Out of stock'}</span>
                  </div>
                  <button onClick={() => handleViewLocation(part.id)} className="btn-location">
                    <FaMapMarkerAlt /> View Shop Location
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;