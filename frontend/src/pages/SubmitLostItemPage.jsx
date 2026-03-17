import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';

const SubmitLostItemPage = () => {
  const [form, setForm] = useState({
    title: '',
    itemName: '',
    description: '',
    category: 'ELECTRONICS',
    location: '',
    date: new Date().toISOString().slice(0, 10),
    tags: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (image) {
        data.append('image', image);
      }
      const res = await api.post('/lost', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Lost item submitted successfully. We will suggest potential matches.');
      setForm((prev) => ({ ...prev, title: '', itemName: '', description: '', location: '', tags: '' }));
      setImage(null);
      return res;
    } catch (err) {
      setError(err.response?.data || 'Failed to submit item');
    }
  };

  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="content">
        <h2 className="section-title">Submit Lost Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input name="title" className="form-input" value={form.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label className="form-label">Item Name</label>
            <input
              name="itemName"
              className="form-input"
              value={form.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input"
              style={{ minHeight: '80px', resize: 'vertical' }}
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              name="category"
              className="form-input"
              value={form.category}
              onChange={handleChange}
            >
              <option value="ELECTRONICS">Electronics</option>
              <option value="DOCUMENTS">Documents</option>
              <option value="CLOTHING">Clothing</option>
              <option value="ACCESSORIES">Accessories</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date Lost</label>
            <input
              type="date"
              name="date"
              className="form-input"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input
              name="location"
              className="form-input"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Library, CSE block"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input
              name="tags"
              className="form-input"
              value={form.tags}
              onChange={handleChange}
              placeholder="e.g. laptop, black, dell"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <button className="primary-button" type="submit">
            Submit Lost Item
          </button>
          {error && <div className="error-text">{error}</div>}
          {message && <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#15803d' }}>{message}</div>}
        </form>
      </main>
    </div>
  );
};

export default SubmitLostItemPage;

