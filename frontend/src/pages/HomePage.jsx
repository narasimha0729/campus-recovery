import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="home-hero">
        <div className="home-badge">
          <span>🎓</span>
          <span>Campus-wide Lost &amp; Found</span>
        </div>
        <h1 className="home-title">Reconnect students with their lost belongings.</h1>
        <p className="home-subtitle">
          CampusConnect intelligently matches lost and found reports across your campus, helping items find
          their way back to their owners faster.
        </p>
        <div className="home-actions">
          {user ? (
            <>
              <Link to="/dashboard">
                <button className="primary-button" style={{ width: 'auto' }}>
                  Go to Dashboard
                </button>
              </Link>
              <Link to="/submit-lost">
                <button className="secondary-button">Report Lost Item</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="primary-button" style={{ width: 'auto' }}>
                  Sign in
                </button>
              </Link>
              <Link to="/register">
                <button className="secondary-button">Create account</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

