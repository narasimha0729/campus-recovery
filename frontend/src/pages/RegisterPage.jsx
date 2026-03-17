import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    rollNumber: '',
    password: '',
    role: 'STUDENT'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        rollNumber: form.rollNumber,
        password: form.password,
        role: form.role
      });
      setMessage(res.data);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Join your campus lost &amp; found network</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              name="name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Campus Email</label>
            <input
              name="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              placeholder="you@college.edu"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Roll Number</label>
            <input
              name="rollNumber"
              className="form-input"
              value={form.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-input"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              name="role"
              className="form-input"
              value={form.role}
              onChange={handleChange}
            >
              <option value="STUDENT">Student</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
          {error && <div className="error-text">{error}</div>}
          {message && <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#15803d' }}>{message}</div>}
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

