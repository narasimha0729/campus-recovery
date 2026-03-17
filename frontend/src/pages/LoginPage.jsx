import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.role, res.data.name);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to CampusConnect</h1>
        <p className="auth-subtitle">Please sign in to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@college.edu"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem' }}>
            <span className="link-inline">Forgot password?</span>
          </div>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          {error && <div className="error-text">{error}</div>}
        </form>
        <div className="auth-footer">
          New to CampusConnect? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

