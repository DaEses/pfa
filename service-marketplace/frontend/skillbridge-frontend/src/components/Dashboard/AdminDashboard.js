import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../../css/dashboard.css';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Check if user data is available in localStorage
      const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
      const token = localStorage.getItem('token'); // Get the token from localStorage
  
      if (storedUser) {
        setUser(storedUser); // Already have user info from login response
      } else if (token) {
        // Fetch fresh user info if not stored in localStorage
        axios.get('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        .then(res => {
          setUser(res.data); // Set the user data
        })
        .catch(err => {
          console.error("Unable to fetch user:", err);
          // Optionally handle error by setting a default state or showing a message
        });
      }
    }, []);
  
    if (!user) {
      return <div>Loading...</div>; // Show loading state if user data is not yet fetched
    }
  
    const { fullName } = user; // Destructure to get the user's full name directly
    return (
        <div className="dashboard-body">
            <nav className="navbar dashboard-nav">
                <div className="container">
                    <a href="index.html" className="logo">SkillBridge</a>
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
                                    <span className="user-name">{fullName}</span>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                                <ul className="dropdown">
                                    <li><a href="#profile"><i className="fas fa-user-circle"></i> Profile</a></li>
                                    <li><a href="#settings"><i className="fas fa-cog"></i> Settings</a></li>
                                    <li><a href="#help"><i className="fas fa-question-circle"></i> Help Center</a></li>
                                    <li className="divider"></li>
                                    <li><a href="login.html" className="logout"><i className="fas fa-sign-out-alt"></i> Go Back</a></li>
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
                        <h3>{fullName}</h3>
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
                    </div>

                    <div className="dashboard-grid">
                        <section className="dashboard-card verification-requests">
                        </section>
                        <section className="dashboard-card recent-activities">
                        </section>
                    </div>

                    <div className="dashboard-grid">
                        <section className="dashboard-card performance-chart">
                        </section>

                        <section className="dashboard-card quick-actions">
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
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
