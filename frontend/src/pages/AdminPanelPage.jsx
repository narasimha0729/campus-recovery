import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const AdminPanelPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      setError('Failed to load users');
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const updateStatus = async (userId, status) => {
    try {
      await api.put('/admin/approve-user', { userId, status });
      await loadUsers();
    } catch (err) {
      setError('Failed to update user status');
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="content">
        <h2 className="section-title">Admin Panel</h2>
        {error && <div className="error-text">{error}</div>}
        <div style={{ marginTop: '1rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '0.5rem' }}>Name</th>
                <th style={{ padding: '0.5rem' }}>Email</th>
                <th style={{ padding: '0.5rem' }}>Roll</th>
                <th style={{ padding: '0.5rem' }}>Role</th>
                <th style={{ padding: '0.5rem' }}>Status</th>
                <th style={{ padding: '0.5rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.5rem' }}>{u.name}</td>
                  <td style={{ padding: '0.5rem' }}>{u.email}</td>
                  <td style={{ padding: '0.5rem' }}>{u.rollNumber}</td>
                  <td style={{ padding: '0.5rem' }}>{u.role}</td>
                  <td style={{ padding: '0.5rem' }}>{u.status}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <button
                      className="secondary-button"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', marginRight: '0.25rem' }}
                      onClick={() => updateStatus(u.id, 'ACTIVE')}
                    >
                      Approve
                    </button>
                    <button
                      className="secondary-button"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                      onClick={() => updateStatus(u.id, 'REJECTED')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminPanelPage;

