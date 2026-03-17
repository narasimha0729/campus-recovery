import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const initials = user?.name ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'CC';

  return (
    <header className="navbar">
      <div className="navbar-brand">CampusConnect</div>
      <nav className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/lost">Lost</Link>
        <Link to="/found">Found</Link>
        <Link to="/submit-lost">Report Lost</Link>
        <Link to="/submit-found">Report Found</Link>
        {user?.role === 'ADMIN' && <Link to="/admin">Admin</Link>}
      </nav>
      <div className="navbar-user">
        {user && (
          <>
            <div className="navbar-avatar">{initials}</div>
            <span>{user.name}</span>
            <button className="navbar-logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

