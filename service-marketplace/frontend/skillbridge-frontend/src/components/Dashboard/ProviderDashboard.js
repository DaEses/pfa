import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { 
  FaSearch, FaBell, FaEnvelope, FaChevronDown, FaUserCircle, FaCog, 
  FaQuestionCircle, FaSignOutAlt, FaThLarge, FaTools, FaCalendarAlt, 
  FaWallet, FaStar, FaChartLine, FaHeadset, FaDownload, FaPlus, 
  FaArrowUp, FaUsers, FaCalendarDay, FaEllipsisV, FaMapMarkerAlt, 
  FaArrowRight, FaWrench 
} from 'react-icons/fa';

const ProviderDashboard = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Assuming token and basic user data are stored after login
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (storedUser) {
      setUser(storedUser); // already have user info from login response
    } else if (token) {
      // Optionally fetch fresh user info if not stored
      axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        setUser(res.data);
      }).catch(err => {
        console.error("Unable to fetch user:", err);
      });
    }
  }, []);
  return (
    <div className="dashboard-body">
      <nav className="navbar dashboard-nav">
        <div className="container">
          <a href="index.html" className="logo">SkillBridge</a>
          <div className="nav-right">
            <div className="search-bar">
              <FaSearch />
              <input type="text" placeholder="Search..." />
            </div>
            <div className="nav-icons">
              <div className="notification-bell">
                <FaBell />
                <span className="notification-badge">3</span>
              </div>
              <div className="messages-icon">
                <FaEnvelope />
                <span className="notification-badge">2</span>
              </div>
              <div className="user-menu">
                <div className="user-info">
                  <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="Profile" className="user-avatar" />
                  <span className="user-name">{user ? user.fullName : 'Chargement...'}</span>
                  <FaChevronDown />
                </div>
                <ul className="dropdown">
                  <li><a href="provider-profile.html"><FaUserCircle /> Profile</a></li>
                  <li><a href="provider-settings.html"><FaCog /> Settings</a></li>
                  <li><a href="#help"><FaQuestionCircle /> Help Center</a></li>
                  <li className="divider"></li>
                  <li><a href="login.html" className="logout"><FaSignOutAlt /> Go Back</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <span className="welcome-text">Welcome back,</span>
            <h3>{user ? user.fullName : 'Chargement...'}</h3>
            <p className="status-text"><i className="fas fa-circle online"></i> Online</p>
          </div>
          <ul className="sidebar-menu">
            <li className="active">
              <a href="provider-dashboard.html">
                <FaThLarge /> Dashboard
              </a>
            </li>
            <li>
              <a href="provider-services.html">
                <FaTools /> My Services
                <span className="menu-badge">12</span>
              </a>
            </li>
            <li>
              <a href="provider-bookings.html">
                <FaCalendarAlt /> Bookings
                <span className="menu-badge">5</span>
              </a>
            </li>
            <li>
              <a href="provider-earnings.html">
                <FaWallet /> Earnings
              </a>
            </li>
            <li>
              <a href="provider-reviews.html">
                <FaStar /> Reviews
                <span className="menu-badge">28</span>
              </a>
            </li>
            <li>
              <a href="provider-analytics.html">
                <FaChartLine /> Analytics
              </a>
            </li>
          </ul>
          <div className="sidebar-footer">
            <div className="help-card">
              <FaHeadset />
              <h4>Need Help?</h4>
              <p>Contact our 24/7 provider support</p>
              <button className="btn btn-outline btn-sm">Contact Support</button>
            </div>
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-header">
            <div className="header-content">
              <h1>Dashboard Overview</h1>
              <p className="text-muted">Here's how your business is performing</p>
            </div>
            <div className="quick-actions">
              <button className="btn btn-outline"><FaDownload /> Download Report</button>
              <button className="btn btn-primary"><FaPlus /> Add New Service</button>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card primary">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>
              <div className="stat-content">
                <p className="stat-label">Today's Bookings</p>
                <h3 className="stat-value">5</h3>
                <p className="stat-change positive">
                  <FaArrowUp /> 12% from yesterday
                </p>
              </div>
            </div>
            <div className="stat-card success">
              <div className="stat-icon">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-content">
                <p className="stat-label">Today's Earnings</p>
                <h3 className="stat-value">$350</h3>
                <p className="stat-change positive">
                  <FaArrowUp /> 8% from yesterday
                </p>
              </div>
            </div>
            <div className="stat-card warning">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-content">
                <p className="stat-label">Overall Rating</p>
                <h3 className="stat-value">4.8</h3>
                <p className="stat-change">
                  <FaStar /> 28 new reviews
                </p>
              </div>
            </div>
            <div className="stat-card info">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Customers</p>
                <h3 className="stat-value">128</h3>
                <p className="stat-change positive">
                  <FaArrowUp /> 5 new today
                </p>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <section className="dashboard-card upcoming-bookings">
              <div className="card-header">
                <h2><FaCalendarDay /> Today's Schedule</h2>
                <div className="card-actions">
                  <button className="btn btn-icon"><FaEllipsisV /></button>
                </div>
              </div>
              <div className="booking-timeline">
                <div className="timeline-item">
                  <div className="timeline-time">09:00 AM</div>
                  <div className="timeline-content">
                    <div className="booking-card">
                      <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=4CAF50&color=fff" alt="Customer" className="customer-avatar" />
                      <div className="booking-details">
                        <h4>AC Repair</h4>
                        <p className="customer-name">Sarah Johnson</p>
                        <p className="location"><FaMapMarkerAlt /> 123 Main St</p>
                      </div>
                      <div className="booking-actions">
                        <button className="btn btn-sm btn-outline">View Details</button>
                        <div className="status-badge pending">Pending</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">02:30 PM</div>
                  <div className="timeline-content">
                    <div className="booking-card">
                      <img src="https://ui-avatars.com/api/?name=Mike+Smith&background=2196F3&color=fff" alt="Customer" className="customer-avatar" />
                      <div className="booking-details">
                        <h4>Plumbing Service</h4>
                        <p className="customer-name">Mike Smith</p>
                        <p className="location"><FaMapMarkerAlt /> 456 Oak Ave</p>
                      </div>
                      <div className="booking-actions">
                        <button className="btn btn-sm btn-outline">View Details</button>
                        <div className="status-badge confirmed">Confirmed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <a href="provider-bookings.html" className="btn btn-link">View All Bookings <FaArrowRight /></a>
              </div>
            </section>

            <section className="dashboard-card recent-reviews">
              <div className="card-header">
                <h2><FaStar /> Recent Reviews</h2>
                <div className="card-actions">
                  <button className="btn btn-icon"><FaEllipsisV /></button>
                </div>
              </div>
              <div className="review-list">
                <div className="review-card">
                  <div className="review-header">
                    <img src="https://ui-avatars.com/api/?name=Emily+Brown&background=FF9800&color=fff" alt="Customer" className="customer-avatar" />
                    <div className="review-meta">
                      <h4>Emily Brown</h4>
                      <div className="review-rating">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        <span className="rating-date">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="review-text">"Excellent service! John was very professional and completed the job quickly. Would definitely recommend!"</p>
                  <div className="review-service">
                    <FaTools /> AC Repair Service
                  </div>
                </div>
                <div className="review-card">
                  <div className="review-header">
                    <img src="https://ui-avatars.com/api/?name=David+Wilson&background=9C27B0&color=fff" alt="Customer" className="customer-avatar" />
                    <div className="review-meta">
                      <h4>David Wilson</h4>
                      <div className="review-rating">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                        <span className="rating-date">1 day ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="review-text">"Great work on the plumbing issue. Fixed it right away and kept everything clean."</p>
                  <div className="review-service">
                    <FaWrench /> Plumbing Service
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <a href="provider-reviews.html" className="btn btn-link">View All Reviews <FaArrowRight /></a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;