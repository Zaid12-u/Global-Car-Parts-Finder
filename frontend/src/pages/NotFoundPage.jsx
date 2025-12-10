import { useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <FaCar className="not-found-icon" />
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/')} className="btn-home">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;