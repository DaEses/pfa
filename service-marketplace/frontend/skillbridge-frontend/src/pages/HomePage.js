import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>SkillBridge - Your Service Marketplace</h1>
            <p>Find skilled professionals for all your needs or offer your services to others.</p>
            
            {!isAuthenticated ? (
              <div className="cta-buttons">
                <Link to="/services" className="btn btn-primary">Explore Services</Link>
                <Link to="/register" className="btn btn-secondary">Get Started</Link>
              </div>
            ) : (
              <div className="cta-buttons">
                <Link to="/services" className="btn btn-primary">Explore Services</Link>
                <Link to={localStorage.getItem('userType') === 'provider' ? "/provider-dashboard" : "/customer-dashboard"} className="btn btn-secondary">
                  Go to Dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="featured-services">
        <div className="container">
          <h2>Featured Services</h2>
          <div className="service-grid">
            {/* This would typically be populated from an API */}
            <div className="service-card">
              <h3>Home Cleaning</h3>
              <p>Professional cleaning services for your home</p>
              <Link to="/services/home-cleaning" className="btn btn-small">Learn More</Link>
            </div>
            <div className="service-card">
              <h3>Plumbing</h3>
              <p>Expert plumbing services for any issue</p>
              <Link to="/services/plumbing" className="btn btn-small">Learn More</Link>
            </div>
            <div className="service-card">
              <h3>Tutoring</h3>
              <p>Academic support for all subjects</p>
              <Link to="/services/tutoring" className="btn btn-small">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Search Services</h3>
              <p>Browse through our marketplace of services</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Choose a Provider</h3>
              <p>Select the best service provider for your needs</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Book and Pay</h3>
              <p>Schedule your service and make secure payments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <h3>SkillBridge</h3>
              <p>Your Service Marketplace</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <p>Email: info@skillbridge.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2025 SkillBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;