import React from 'react';
import { Link } from 'react-router-dom';
import '../css/style.css';
import '../css/dashboard.css';

const AdminDashboard = () => {
  return (
    <div className="dashboard-body">
      <nav className="navbar dashboard-nav">
        <div className="container">
          <Link to="/" className="logo">SkillBridge</Link>
          <div className="nav-right">
            <div className="search-bar">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search users, services, or transactions..." />
            </div>
            <div className="nav-icons">
              <div className="notification-bell">
                <i className="fas fa-bell"></i>
                <span className="notification-badge">5</span>
              </div>
              <div className="messages-icon">
                <i className="fas fa-envelope"></i>
                <span className="notification-badge">3</span>
              </div>
              <div className="user-menu">
                <div className="user-info">
                  <img src="https://ui-avatars.com/api/?name=Admin&background=FF5722&color=fff" alt="Profile" className="user-avatar" />
                  <span className="user-name">Admin</span>
                  <i className="fas fa-chevron-down"></i>
                </div>
                <ul className="dropdown">
                  <li><a href="#profile"><i className="fas fa-user-circle"></i> Profile</a></li>
                  <li><a href="#settings"><i className="fas fa-cog"></i> Settings</a></li>
                  <li><a href="#help"><i className="fas fa-question-circle"></i> Help Center</a></li>
                  <li className="divider"></li>
                  <li><Link to="/login" className="logout"><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <span className="welcome-text">Welcome,</span>
            <h3>Administrator</h3>
            <p className="status-text"><i className="fas fa-circle online"></i> Super Admin</p>
          </div>
          <ul className="sidebar-menu">
            <li className="active">
              <a href="#overview">
                <i className="fas fa-th-large"></i> Overview
              </a>
            </li>
            <li>
              <a href="#users">
                <i className="fas fa-users"></i> Users
                <span className="menu-badge">1.2k</span>
              </a>
            </li>
            <li>
              <a href="#services">
                <i className="fas fa-briefcase"></i> Services
                <span className="menu-badge">450</span>
              </a>
            </li>
            <li>
              <a href="#providers">
                <i className="fas fa-user-tie"></i> Service Providers
                <span className="menu-badge">280</span>
              </a>
            </li>
            <li>
              <a href="#transactions">
                <i className="fas fa-money-bill-wave"></i> Transactions
                <span className="menu-badge">89</span>
              </a>
            </li>
            <li>
              <a href="#reports">
                <i className="fas fa-chart-bar"></i> Reports
              </a>
            </li>
            <li>
              <a href="#verification">
                <i className="fas fa-check-circle"></i> Verifications
                <span className="menu-badge warning">12</span>
              </a>
            </li>
            <li>
              <a href="#support">
                <i className="fas fa-headset"></i> Support Tickets
                <span className="menu-badge danger">8</span>
              </a>
            </li>
            <li>
              <a href="#settings">
                <i className="fas fa-cog"></i> Settings
              </a>
            </li>
          </ul>
          <div className="sidebar-footer">
            <div className="help-card">
              <i className="fas fa-shield-alt"></i>
              <h4>Admin Support</h4>
              <p>Need technical assistance?</p>
              <button className="btn btn-outline btn-sm">Contact IT Support</button>
            </div>
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-header">
            <div className="header-content">
              <h1>Admin Dashboard</h1>
              <p className="text-muted">Platform overview and management</p>
            </div>
            <div className="quick-actions">
              <button className="btn btn-outline"><i className="fas fa-download"></i> Export Report</button>
              <button className="btn btn-primary"><i className="fas fa-plus"></i> Add New Admin</button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Users</p>
                <h3 className="stat-value">1,234</h3>
                <p className="stat-change positive">
                  <i className="fas fa-arrow-up"></i> 15% this month
                </p>
              </div>
            </div>
            <div className="stat-card success">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-content">
                <p className="stat-label">Revenue</p>
                <h3 className="stat-value">$52,389</h3>
                <p className="stat-change positive">
                  <i className="fas fa-arrow-up"></i> 8% this month
                </p>
              </div>
            </div>
            <div className="stat-card warning">
              <div className="stat-icon">
                <i className="fas fa-briefcase"></i>
              </div>
              <div className="stat-content">
                <p className="stat-label">Active Services</p>
                <h3 className="stat-value">450</h3>
                <p className="stat-change positive">
                  <i className="fas fa-arrow-up"></i> 12 new today
                </p>
              </div>
            </div>
            <div className="stat-card info">
              <div className="stat-icon">
                <i className="fas fa-ticket-alt"></i>
              </div>
              <div className="stat-content">
                <p className="stat-label">Support Tickets</p>
                <h3 className="stat-value">8</h3>
                <p className="stat-change negative">
                  <i className="fas fa-arrow-down"></i> 3 resolved today
                </p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <section className="dashboard-card verification-requests">
              <div className="card-header">
                <h2><i className="fas fa-user-check"></i> Pending Verifications</h2>
                <div className="card-actions">
                  <button className="btn btn-icon"><i className="fas fa-ellipsis-v"></i></button>
                </div>
              </div>
              <div className="verification-list">
                <div className="verification-item">
                  <img src="https://ui-avatars.com/api/?name=John+Smith&background=4CAF50&color=fff" alt="Provider" className="provider-avatar" />
                  <div className="verification-details">
                    <h4>John Smith</h4>
                    <p className="service-type">Plumbing Services</p>
                    <div className="document-list">
                      <span className="document"><i className="fas fa-file-alt"></i> Business License</span>
                      <span className="document"><i className="fas fa-id-card"></i> ID Verification</span>
                    </div>
                  </div>
                  <div className="verification-actions">
                    <button className="btn btn-sm btn-success">Approve</button>
                    <button className="btn btn-sm btn-danger">Reject</button>
                    <button className="btn btn-sm btn-outline">Review</button>
                  </div>
                </div>
                <div className="verification-item">
                  <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=2196F3&color=fff" alt="Provider" className="provider-avatar" />
                  <div className="verification-details">
                    <h4>Sarah Johnson</h4>
                    <p className="service-type">Home Cleaning</p>
                    <div className="document-list">
                      <span className="document"><i className="fas fa-file-alt"></i> Insurance Document</span>
                      <span className="document"><i className="fas fa-id-card"></i> ID Verification</span>
                    </div>
                  </div>
                  <div className="verification-actions">
                    <button className="btn btn-sm btn-success">Approve</button>
                    <button className="btn btn-sm btn-danger">Reject</button>
                    <button className="btn btn-sm btn-outline">Review</button>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <a href="#verifications" className="btn btn-link">View All Requests <i className="fas fa-arrow-right"></i></a>
              </div>
            </section>

            <section className="dashboard-card recent-activities">
              <div className="card-header">
                <h2><i className="fas fa-history"></i> Recent Activities</h2>
                <div className="card-actions">
                  <button className="btn btn-icon"><i className="fas fa-ellipsis-v"></i></button>
                </div>
              </div>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon success">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">New provider registration: <strong>Elite Cleaning Services</strong></p>
                    <p className="activity-meta">
                      <span className="time">2 hours ago</span>
                      <span className="location">New York, USA</span>
                    </p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon warning">
                    <i className="fas fa-exclamation-triangle"></i>
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">Support ticket opened: <strong>Payment Issue #123</strong></p>
                    <p className="activity-meta">
                      <span className="time">3 hours ago</span>
                      <span className="priority high">High Priority</span>
                    </p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon info">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">Large transaction: <strong>$2,500</strong></p>
                    <p className="activity-meta">
                      <span className="time">5 hours ago</span>
                      <span className="status">Completed</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <a href="#activities" className="btn btn-link">View All Activities <i className="fas fa-arrow-right"></i></a>
              </div>
            </section>
          </div>

          <div className="dashboard-grid">
            <section className="dashboard-card performance-chart">
              <div className="card-header">
                <h2><i className="fas fa-chart-line"></i> Platform Performance</h2>
                <div className="card-actions">
                  <select className="form-select">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 3 Months</option>
                  </select>
                </div>
              </div>
              <div className="chart-container">
                {/* Chart will be rendered here by JavaScript */}
                <div className="placeholder-chart">
                  <div className="chart-bars">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '40%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '50%' }}></div>
                    <div className="chart-bar" style={{ height: '75%' }}></div>
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-card quick-actions">
              <div className="card-header">
                <h2><i className="fas fa-bolt"></i> Quick Actions</h2>
              </div>
              <div className="quick-actions-grid">
                <button className="quick-action-btn">
                  <i className="fas fa-user-plus"></i>
                  <span>Add User</span>
                </button>
                <button className="quick-action-btn">
                  <i className="fas fa-cog"></i>
                  <span>Settings</span>
                </button>
                <button className="quick-action-btn">
                  <i className="fas fa-file-alt"></i>
                  <span>Reports</span>
                </button>
                <button className="quick-action-btn">
                  <i className="fas fa-bell"></i>
                  <span>Notifications</span>
                </button>
                <button className="quick-action-btn">
                  <i className="fas fa-envelope"></i>
                  <span>Messages</span>
                </button>
                <button className="quick-action-btn">
                  <i className="fas fa-chart-pie"></i>
                  <span>Analytics</span>
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;