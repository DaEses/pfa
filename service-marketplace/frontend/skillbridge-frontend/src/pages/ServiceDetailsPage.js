import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/style.css';

const ServiceDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingMessage, setBookingMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState('');

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/services/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch service details');
        }
        const data = await response.json();
        setService(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      setBookingError('');
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceId: id,
          date: bookingDate,
          time: bookingTime,
          message: bookingMessage
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Booking failed');
      }
      
      setBookingSuccess(true);
      // Clear form
      setBookingDate('');
      setBookingTime('');
      setBookingMessage('');
      
      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/customer-dashboard');
      }, 3000);
      
    } catch (err) {
      setBookingError(err.message);
    }
  };

  if (loading) {
    return <div className="loading">Loading service details...</div>;
  }
  
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  
  if (!service) {
    return <div className="not-found">Service not found</div>;
  }

  return (
    <div className="service-details-page">
      <div className="service-details-hero">
        <div className="container">
          <Link to="/services" className="back-link">← Back to Services</Link>
        </div>
      </div>

      <div className="service-details-container container">
        <div className="service-details-main">
          <div className="service-image">
            <img src={service.image || '/placeholder.jpg'} alt={service.title} />
          </div>
          
          <div className="service-info">
            <h1>{service.title}</h1>
            
            <div className="service-meta">
              <span className="service-category">{service.category}</span>
              <span className="service-provider">By {service.provider?.name || 'Unknown Provider'}</span>
              <span className="service-rating">★ {service.rating || '0'} ({service.reviews?.length || '0'} reviews)</span>
            </div>
            
            <div className="service-price">${service.price}</div>
            
            <div className="service-description">
              <h3>Description</h3>
              <p>{service.description}</p>
            </div>
            
            {service.features && service.features.length > 0 && (
              <div className="service-features">
                <h3>Features</h3>
                <ul>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="service-details-sidebar">
          <div className="booking-form-container">
            <h3>Book This Service</h3>
            
            {bookingSuccess ? (
              <div className="booking-success">
                <p>Booking successful! Redirecting to dashboard...</p>
              </div>
            ) : (
              <>
                {bookingError && <div className="booking-error">{bookingError}</div>}
                
                <form className="booking-form" onSubmit={handleBooking}>
                  <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      id="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      id="time"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Additional Information</label>
                    <textarea
                      id="message"
                      value={bookingMessage}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      rows="4"
                      placeholder="Any specific requirements or details..."
                    ></textarea>
                  </div>
                  
                  {isAuthenticated ? (
                    <button type="submit" className="btn btn-primary btn-block">Book Now</button>
                  ) : (
                    <div>
                      <p>Please log in to book this service</p>
                      <Link to="/login" className="btn btn-primary btn-block">Log In</Link>
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
          
          <div className="provider-info">
            <h3>About the Provider</h3>
            {service.provider ? (
              <>
                <div className="provider-profile">
                  <img src={service.provider.avatar || '/avatar-placeholder.jpg'} alt={service.provider.name} />
                  <div>
                    <h4>{service.provider.name}</h4>
                    <p>Member since {new Date(service.provider.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p>{service.provider.bio || 'No bio available'}</p>
              </>
            ) : (
              <p>Provider information not available</p>
            )}
          </div>
        </div>
        
        <div className="service-reviews">
          <h3>Reviews</h3>
          
          {service.reviews && service.reviews.length > 0 ? (
            <div className="reviews-list">
              {service.reviews.map(review => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <img src={review.user?.avatar || '/avatar-placeholder.jpg'} alt={review.user?.name} />
                      <div>
                        <h4>{review.user?.name || 'Anonymous'}</h4>
                        <span className="review-date">{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="review-rating">★ {review.rating}</div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;