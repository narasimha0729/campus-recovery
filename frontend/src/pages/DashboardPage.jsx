import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="content">
        <h2 className="section-title">Dashboard</h2>
        <p style={{ marginBottom: '1.25rem', color: '#4b5563', fontSize: '0.9rem' }}>
          Quickly access your campus lost &amp; found tools.
        </p>
        <div className="cards-grid">
          <Link to="/submit-lost">
            <div className="item-card">
              <div className="item-body">
                <div className="item-title-row">
                  <div>
                    <div className="item-title">Report Lost Item</div>
                    <div className="item-meta">Create a lost item alert so others can help.</div>
                  </div>
                  <span className="item-pill item-pill-lost">Lost</span>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/submit-found">
            <div className="item-card">
              <div className="item-body">
                <div className="item-title-row">
                  <div>
                    <div className="item-title">Report Found Item</div>
                    <div className="item-meta">List an item you&apos;ve discovered on campus.</div>
                  </div>
                  <span className="item-pill item-pill-found">Found</span>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/lost">
            <div className="item-card">
              <div className="item-body">
                <div className="item-title-row">
                  <div>
                    <div className="item-title">Browse Lost Items</div>
                    <div className="item-meta">See what others are missing.</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/found">
            <div className="item-card">
              <div className="item-body">
                <div className="item-title-row">
                  <div>
                    <div className="item-title">Browse Found Items</div>
                    <div className="item-meta">Look for items similar to yours.</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;

