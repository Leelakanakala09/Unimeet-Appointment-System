import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>🎓 Unimeet</Link>

      <div style={styles.links}>
        {!user ? (
          <>
            <Link to="/login"    style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/faculty" style={styles.link}>Faculty</Link>

            {user.role === 'student' && (
              <Link to="/student-dashboard" style={styles.link}>Dashboard</Link>
            )}
            {user.role === 'faculty' && (
              <Link to="/faculty-dashboard" style={styles.link}>Dashboard</Link>
            )}
            {user.role === 'admin' && (
              <Link to="/admin-dashboard" style={styles.link}>Admin Panel</Link>
            )}

            <Link to="/history"       style={styles.link}>History</Link>
            <Link to="/notifications" style={styles.link}>🔔 Alerts</Link>

            <div style={styles.userChip}>
              <span style={styles.avatar}>{user.name?.charAt(0).toUpperCase()}</span>
              <span style={styles.userName}>{user.name}</span>
            </div>

            <button onClick={logout} style={styles.logoutBtn}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 32px',
    backgroundColor: '#1a73e8',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  brand: {
    color: '#fff',
    fontSize: '22px',
    fontWeight: '800',
    letterSpacing: '0.5px',
  },
  links: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  link: {
    color: '#fff',
    fontSize: '14px',
    fontWeight: '500',
    padding: '6px 10px',
    borderRadius: '6px',
    transition: 'background 0.2s',
  },
  registerBtn: {
    color: '#1a73e8',
    background: '#fff',
    fontSize: '14px',
    fontWeight: '700',
    padding: '7px 16px',
    borderRadius: '20px',
  },
  userChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '20px',
    padding: '5px 12px',
  },
  avatar: {
    width: '28px',
    height: '28px',
    background: '#fff',
    color: '#1a73e8',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '13px',
  },
  userName: {
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
  },
  logoutBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.5)',
    padding: '6px 16px',
    borderRadius: '20px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
  },
};

export default Navbar;
