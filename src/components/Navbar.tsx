import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('username');
    if (token && storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    setUsername(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">📦 CarryOn</div>

      <ul className="nav-center">
        <li
          className={location.pathname === '/home' ? 'active' : ''}
          onClick={() => navigate('/home')}
        >
          Home
        </li>
        <li
          className={location.pathname === '/about' ? 'active' : ''}
          onClick={() => navigate('/about')}
        >
          About
        </li>
        <li
          className={location.pathname === '/order' ? 'active' : ''}
          onClick={() => navigate('/order')}
        >
          Order
        </li>
        <li
          className={location.pathname === '/contact' ? 'active' : ''}
          onClick={() => navigate('/contact')}
        >
          Contact
        </li>
      </ul>

      <div className="nav-right">
        {username ? (
          <div className="user-info">
            <span className="user-welcome">
              Welcome,&nbsp;
              <strong
                onClick={() => navigate('/dashboard')}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                {username}
              </strong>
            </span>
            <button className="btn-outline" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <button className="btn-outline" onClick={() => navigate('/')}>Log in</button>
            <button className="btn-solid" onClick={() => navigate('/register')}>Register</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
