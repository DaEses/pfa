import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/dashboard.css';

const CustomerDashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch user profile
        const userResponse = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await userResponse.json();
        setUser(userData);
        
        // Fetch bookings
        const bookingsResponse = await fetch('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!bookingsResponse.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bookings':
        return (
          <div className="bookings-section">
            <h2>My Bookings</h2>
            
            {bookings.length === 0 ? (
              <div className="empty-state">
                <p>You don't have any bookings yet.</p>
                <Link to="/services" className="btn btn-primary">Browse Services</Link>
              </div>
            ) : (
              <div className="bookings-list">
                {bookings.map(booking => (
                  <div key={booking._id} className="booking-card">
                    <div className="booking-header">
                      <h3>{booking.service?.title || 'Service Name'}</h3>
                      <span className={`status status-${booking.status.toLowerCase()}`}>{booking.status}</span>
                    </div>
                    
                    <div className="booking-details">
                      <div className="booking-info">
                        <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {booking.time}</p>
                        <p><strong>Provider:</strong> {booking.provider?.name || 'Provider Name'}</p>
                        <p><strong>Price:</strong> ${booking.service?.price || '0'}</p>
                      </div>
                      
                      <div className="booking-actions">
                        {booking.status === 'CONFIRMED' && (
                          <button className="btn btn-danger">Cancel</button>
                        )}
                        
                        {booking.status === 'COMPLETED' && !booking.reviewed && (
                          <button className="btn btn-primary">Leave Review</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'profile':
        return (
          <div className="profile-section">
            <h2>My Profile</h2>
            
            {user && (
              <div className="profile-form">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" value={user.name} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" value={user.email} readOnly />
                </div>
                
                <div className="form-group">
                  <label>Member Since</label>
                  <input type="text" value={new Date(user.createdAt).toLocaleDateString()} readOnly />
                </div>
                
                <button className="btn btn-primary">Edit Profile</button>
              </div>
            )}
          </div>
        );
        
      case 'saved':
        return (
          <div className="saved-services-section">
            <h2>Saved Services</h2>
            
            <div className="empty-state">
              <p>You don't have any saved services yet.</p>
              <Link to="/services" className="btn btn-primary">Browse Services</Link>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }
  
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <h1>Customer Dashboard</h1>
        </div>
      </div>
      
      <div className="dashboard-container container">
        <div className="dashboard-sidebar">
          <div className="user-profile">
            <div className="user-avatar">
              <img src={user?.avatar || '/avatar-placeholder.jpg'} alt={user?.name} />
            </div>
            <div className="user-info">
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
            </div>
          </div>
          
          <ul className="dashboard-nav">
            <li className={activeTab === 'bookings' ? 'active' : ''}>
              <button onClick={() => setActiveTab('bookings')}>My Bookings</button>
            </li>
            <li className={activeTab === 'saved' ? 'active' : ''}>
              <button onClick={() => setActiveTab('saved')}>Saved Services</button>
            </li>
            <li className={activeTab === 'profile' ? 'active' : ''}>
              <button onClick={() => setActiveTab('profile')}>My Profile</button>
            </li>
          </ul>
        </div>
        
        <div className="dashboard-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;