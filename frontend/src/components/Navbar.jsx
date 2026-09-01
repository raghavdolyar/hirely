import { Link, useNavigate } from 'react-router';
import { useAuth } from '../features/auth/hooks/useAuth';
import './navbar.scss';

export const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <Link to="/">Hirely</Link>
      </div>
      {user && (
        <div className="navbar__user">
          <div className="navbar__profile-icon">
            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="navbar__username">{user.username}</span>
          <button className="navbar__logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
