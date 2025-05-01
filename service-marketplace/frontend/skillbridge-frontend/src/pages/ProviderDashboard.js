import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/dashboard.css';

const ProviderDashboard = () => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('services');

  useEffect(() => {
    const fetchProviderData = async () => {
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
        
        // Fetch provider services
        const servicesResponse = await fetch('/api/services/provider', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!servicesResponse.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const servicesData = await servicesResponse.json();
        setServices(servicesData);
        
        // Fetch provider bookings
        const bookingsResponse = await fetch('/api/bookings/provider', {
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

    fetchProviderData();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <div className="services-section">
            <div className="section-header">
              <h2>My Services</h2>
              <Link to="/add-service" className="btn btn-primary">Add New Service</Link>
            </div>
            
            {services.length === 0 ? (
              <div className="empty-state">
                <p>You haven't added any services yet.</p>
                <Link to="/add-service" className="btn btn-primary">Create Your First Service</Link>
              </div>
            ) : (
              <div className="services-list">
                {services.map(service => (
                  <div key={service._id} className="service-card">
                    <div className="service-image">
                      <img src={service.image || '/placeholder.jpg'} alt={service.title} />
                    </div>
                    
                    <div className="service-content">
                      <h3>{service.title}</h3>
                      <div className="service-meta">
                        <span className="service-category">{service.category}</span>
                        <span className="service-rating">★ {service.rating || '0'}</span>
                      </div>
                      <p className="service-price">${service.price}</p>
                      
                      <div className="service-actions">
                        <Link to={`/edit-service/${service._id}`} className="btn btn-secondary">Edit</Link>
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        
      case 'bookings':
        return (
          <div className="bookings-section">
            <h2>Service Bookings</h2>
            
            {bookings.length === 0 ? (
              <div className="empty-state">
                <p>You don't have any bookings yet.</p>
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
                        <p><strong>Customer:</strong> {booking.customer?.name || 'Customer Name'}</p>
                        <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {booking.time}</p>
                        <p><strong>Message:</strong> {booking.message || 'No additional information'}</p>
                      </div>
                      
                      <div className="booking-actions">
                        {booking.status === 'PENDING' && (
                          <>
                            <button className="btn btn-primary">Accept</button>
                            <button className="btn btn-danger">Decline</button>
                          </>
                        )}
                        
                        {booking.status === 'CONFIRMED' && (
                          <button className="btn btn-primary">Mark as Complete</button>
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
            <h2>Provider Profile</h2>
            
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
                  <label>Bio</label>
                  <textarea readOnly>{user.bio || ''}</textarea>
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
        
      case 'earnings':
        return (
          <div className="earnings-section">
            <h2>My Earnings</h2>
            
            <div className="earnings-overview">
              <div className="earnings-card">
                <h3>Total Earnings</h3>
                <p className="amount">$0.00</p>
              </div>
              
              <div className="earnings-card">
                <h3>This Month</h3>
                <p className="amount">$0.00</p>
              </div>
              
              <div className="earnings-card">
                <h3>Pending</h3>
                <p className="amount">$0.00</p>
              </div>
            </div>
            
            <div className="transactions">
              <h3>Recent Transactions</h3>
              
              <div className="empty-state">
                <p>No transactions yet.</p>
              </div>
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
    <div className="dashboard provider-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <h1>Provider Dashboard</h1>
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
            <li className={activeTab === 'services' ? 'active' : ''}>
              <button onClick={() => setActiveTab('services')}>My Services</button>
            </li>
            <li className={activeTab === 'bookings' ? 'active' : ''}>
              <button onClick={() => setActiveTab('bookings')}>Bookings</button>
            </li>
            <li className={activeTab === 'earnings' ? 'active' : ''}>
              <button onClick={() => setActiveTab('earnings')}>Earnings</button>
            </li>
            <li className={activeTab === 'profile' ? 'active' : ''}>
              <button onClick={() => setActiveTab('profile')}>Provider Profile</button>
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

export default ProviderDashboard;