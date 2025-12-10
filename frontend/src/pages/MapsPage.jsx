/*import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPhone, FaMapMarkerAlt, FaStore, FaCar, FaSignOutAlt } from 'react-icons/fa';
import { Loader } from '@googlemaps/js-api-loader';
import { carPartsData } from '../data/carPartsData';
import { useAuth } from '../context/AuthContext';
import './MapsPage.css';

const MapsPage = () => {
  const { partId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const mapRef = useRef(null);
  const [carPart, setCarPart] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const part = carPartsData.find(p => p.id === parseInt(partId));
    setCarPart(part);
    if (part) {
      loadGoogleMap(part.shopLocation);
    }
  }, [partId]);

  const loadGoogleMap = async (location) => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE',
      version: 'weekly',
    });

    try {
      await loader.load();
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
      });
      new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.shopName,
      });
      setMapLoaded(true);
    } catch (error) {
      console.error('Error loading Google Maps:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!carPart) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="maps-page">
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

      <div className="maps-container">
        <button onClick={() => navigate('/products')} className="btn-back">
          <FaArrowLeft /> Back to Products
        </button>

        <div className="maps-content">
          <div className="shop-info-card">
            <h2>{carPart.name}</h2>
            <p className="part-price">Rs. {carPart.price}</p>
            
            <div className="shop-details">
              <div className="shop-detail-item">
                <FaStore className="detail-icon" />
                <div>
                  <span className="detail-label">Shop Name</span>
                  <span className="detail-value">{carPart.shopLocation.shopName}</span>
                </div>
              </div>
              <div className="shop-detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <div>
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{carPart.shopLocation.address}</span>
                </div>
              </div>
              <div className="shop-detail-item">
                <FaPhone className="detail-icon" />
                <div>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{carPart.shopLocation.phone}</span>
                </div>
              </div>
            </div>

            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${carPart.shopLocation.lat},${carPart.shopLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-directions"
            >
              <FaMapMarkerAlt /> Get Directions
            </a>
          </div>

          <div className="map-wrapper">
            <div ref={mapRef} className="google-map"></div>
            {!mapLoaded && (
              <div className="map-placeholder">
                <FaMapMarkerAlt className="map-icon" />
                <p>Loading map...</p>
                <small>If map doesn't load, add your Google Maps API key in .env file</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;*/
import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPhone, FaMapMarkerAlt, FaStore, FaCar, FaSignOutAlt } from 'react-icons/fa';
import { carPartsData } from '../data/carPartsData';
import { useAuth } from '../context/AuthContext';
import './MapsPage.css';

const MapsPage = () => {
  const { partId } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const mapRef = useRef(null);
  const [carPart, setCarPart] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const part = carPartsData.find(p => p.id === parseInt(partId));
    setCarPart(part);
    if (part) {
      loadGoogleMap(part.shopLocation);
    }

    // Cleanup function
    return () => {
      // Clean up the initMap function
      if (window.initMap) {
        delete window.initMap;
      }
    };
  }, [partId]);

  const loadGoogleMap = async (location) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      console.error('❌ Google Maps API key not found!');
      return;
    }

    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      console.log('✅ Google Maps already loaded, creating map...');
      createMap(location);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      console.log('⏳ Script already loading, waiting...');
      existingScript.addEventListener('load', () => createMap(location));
      return;
    }

    try {
      console.log('📍 Loading Google Maps script...');
      
      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log('✅ Google Maps loaded successfully!');
        createMap(location);
      };

      script.onerror = () => {
        console.error('❌ Failed to load Google Maps');
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error('❌ Error loading Google Maps:', error);
    }
  };

  const createMap = (location) => {
    if (!mapRef.current || !window.google) {
      console.error('❌ Map ref or Google Maps not available');
      return;
    }

    try {
      console.log('🗺️ Creating map at:', location);

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      // Add marker
      new window.google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.shopName,
        animation: window.google.maps.Animation.DROP,
      });

      setMapLoaded(true);
      console.log('✅ Map created successfully!');
    } catch (error) {
      console.error('❌ Error creating map:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!carPart) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="maps-page">
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

      <div className="maps-container">
        <button onClick={() => navigate('/products')} className="btn-back">
          <FaArrowLeft /> Back to Products
        </button>

        <div className="maps-content">
          <div className="shop-info-card">
            <h2>{carPart.name}</h2>
            <p className="part-price">Rs. {carPart.price}</p>
            
            <div className="shop-details">
              <div className="shop-detail-item">
                <FaStore className="detail-icon" />
                <div>
                  <span className="detail-label">Shop Name</span>
                  <span className="detail-value">{carPart.shopLocation.shopName}</span>
                </div>
              </div>
              <div className="shop-detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <div>
                  <span className="detail-label">Address</span>
                  <span className="detail-value">{carPart.shopLocation.address}</span>
                </div>
              </div>
              <div className="shop-detail-item">
                <FaPhone className="detail-icon" />
                <div>
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{carPart.shopLocation.phone}</span>
                </div>
              </div>
            </div>

            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${carPart.shopLocation.lat},${carPart.shopLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-directions"
            >
              <FaMapMarkerAlt /> Get Directions
            </a>
          </div>

          <div className="map-wrapper">
            <div ref={mapRef} className="google-map"></div>
            {!mapLoaded && (
              <div className="map-placeholder">
                <FaMapMarkerAlt className="map-icon" />
                <p>Loading map...</p>
                <small>If map doesn't load, check console (F12) for errors</small>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;
