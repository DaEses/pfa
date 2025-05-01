// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import { FaSearch, FaBell, FaEnvelope, FaChevronDown, FaUserCircle, FaCog, FaQuestionCircle, FaSignOutAlt, FaThLarge, FaCalendarCheck, FaComments, FaCreditCard, FaStar, FaMapMarkerAlt, FaHeadset, FaFilter, FaPlus, FaArrowUp, FaMinus, FaUserCheck, FaClock, FaInfoCircle, FaCalendarAlt, FaArrowRight, FaCheckCircle, FaComment } from 'react-icons/fa';

// const CustomerDashboard = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user data is available in localStorage
//     const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
//     const token = localStorage.getItem('token');

//     if (storedUser) {
//       setUser(storedUser); // Already have user info from login response
//     } else if (token) {
//       // Fetch fresh user info if not stored in localStorage
//       axios.get('/api/auth/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         }
//       })
//       .then(res => {
//         setUser(res.data); // Set the user data
//       })
//       .catch(err => {
//         console.error("Unable to fetch user:", err);
//         // Optionally handle error by setting a default state or showing a message
//       });
//     }
//   }, []);

//   if (!user) {
//     return <div>Loading...</div>; // Show loading state if user data is not yet fetched
//   }

//   const { fullName } = user; // Destructure to get the user's full name directly

//   return (
//     <div className="dashboard-body">
//       <nav className="navbar dashboard-nav">
//         <div className="container">
//           <a href="index.html" className="logo">SkillBridge</a>
//           <div className="nav-right">
//             <div className="search-bar">
//               <FaSearch />
//               <input type="text" placeholder="Search for services..." />
//             </div>
//             <div className="nav-icons">
//               <div className="notification-bell">
//                 <FaBell />
//                 <span className="notification-badge">3</span>
//               </div>
//               <div className="messages-icon">
//                 <FaEnvelope />
//                 <span className="notification-badge">2</span>
//               </div>
//             </div>
//             <div className="user-menu">
//               <div className="user-info">
//                 <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="Profile" className="user-avatar" />
//                 <span className="user-name">{fullName}</span>
//                 <FaChevronDown />
//               </div>
//               <ul className="dropdown">
//                 <li><a href="profile.html"><FaUserCircle /> My Profile</a></li>
//                 <li><a href="#settings"><FaCog /> Settings</a></li>
//                 <li><a href="#help"><FaQuestionCircle /> Help Center</a></li>
//                 <li className="divider"></li>
//                 <li><a href="index.html" className="logout"><FaSignOutAlt /> Go back</a></li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="dashboard-container">
//         <aside className="dashboard-sidebar">
//           <div className="sidebar-header">
//             <span className="welcome-text">Welcome back,</span>
//             <h3>{fullName}</h3> {/* Use dynamic fullName */}
//           </div>
//           <ul className="sidebar-menu">
//             <li className="active">
//               <a href="#overview"><FaThLarge /> Overview</a>
//             </li>
//             <li>
//               <a href="#bookings"><FaCalendarCheck /> My Bookings</a>
//             </li>
//             <li>
//               <a href="#messages"><FaComments /> Messages</a>
//             </li>
//             <li>
//               <a href="#payments"><FaCreditCard /> Payments</a>
//             </li>
//             <li>
//               <a href="#reviews"><FaStar /> My Reviews</a>
//             </li>
//             <li>
//               <a href="#addresses"><FaMapMarkerAlt /> Addresses</a>
//             </li>
//           </ul>
//           <div className="sidebar-footer">
//             <div className="help-card">
//               <FaHeadset />
//               <h4>Need Help?</h4>
//               <p>Contact our 24/7 customer support</p>
//               <button className="btn btn-outline btn-sm">Contact Support</button>
//             </div>
//           </div>
//         </aside>

//         <main className="dashboard-main">
//           <div className="dashboard-header">
//             <div className="header-content">
//               <h1>Dashboard Overview</h1>
//               <p className="text-muted">Here's what's happening with your service bookings</p>
//             </div>
//             <div className="quick-actions">
//               <button className="btn btn-outline"><FaFilter /> Filter</button>
//               <button className="btn btn-primary"><FaPlus /> Book New Service</button>
//             </div>
//           </div>

//           {/* Dashboard Stats Section */}
//           <div className="dashboard-stats">
//             <div className="stat-card">
//               <div className="stat-icon">
//                 <FaCalendarCheck />
//               </div>
//               <div className="stat-details">
//                 <h3>Active Bookings</h3>
//                 <p className="stat-value">5</p>
//                 <p className="stat-change positive">
//                   <FaArrowUp />
//                   +2 from last month
//                 </p>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">
//                 <FaClock />
//               </div>
//               <div className="stat-details">
//                 <h3>Hours Booked</h3>
//                 <p className="stat-value">24</p>
//                 <p className="stat-change positive">
//                   <FaArrowUp />
//                   +8 from last month
//                 </p>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">
//                 <i className="fas fa-dollar-sign"></i>
//               </div>
//               <div className="stat-details">
//                 <h3>Total Spent</h3>
//                 <p className="stat-value">$580</p>
//                 <p className="stat-change neutral">
//                   <FaMinus />
//                   Same as last month
//                 </p>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">
//                 <FaStar />
//               </div>
//               <div className="stat-details">
//                 <h3>Average Rating</h3>
//                 <p className="stat-value">4.8</p>
//                 <p className="stat-change positive">
//                   <FaArrowUp />
//                   +0.2 from last month
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Services Section */}
//           <section className="upcoming-services">
//             <div className="section-header">
//               <div className="header-left">
//                 <h2>Upcoming Services</h2>
//                 <p className="text-muted">Your next 7 days of scheduled services</p>
//               </div>
//               <div className="header-right">
//                 <div className="view-options">
//                   <button className="btn btn-icon active"><i className="fas fa-th-large"></i></button>
//                   <button className="btn btn-icon"><i className="fas fa-list"></i></button>
//                 </div>
//                 <a href="#" className="btn btn-link">View Calendar <FaArrowRight /></a>
//               </div>
//             </div>
//             {/* Upcoming Services List */}
//             <div className="service-cards">
//               {/* Example service card */}
//               <div className="service-card upcoming">
//                 <div className="service-date">
//                   <span className="day">15</span>
//                   <span className="month">Feb</span>
//                 </div>
//                 <div className="service-info">
//                   <h3>House Cleaning</h3>
//                   <p className="provider">
//                     <FaUserCheck />
//                     Clean Pro Services
//                   </p>
//                   <p className="time">
//                     <FaClock />
//                     09:00 AM - 11:00 AM
//                   </p>
//                   <p className="location">
//                     <FaMapMarkerAlt />
//                     123 Main St, Apt 4B
//                   </p>
//                 </div>
//                 <div className="service-actions">
//                   <button className="btn btn-primary">
//                     <FaInfoCircle />
//                     Information
//                   </button>
//                   <button className="btn btn-outline">
//                     <FaComment />
//                     Chat
//                   </button>
//                 </div>
//               </div>
//               {/* Repeat for other upcoming services */}
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default CustomerDashboard;
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaEnvelope, FaChevronDown, FaUserCircle, FaCog, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

import {
  FaThLarge,
  FaCalendarCheck,
  FaComments,
  FaCreditCard,
  FaStar,
  FaMapMarkerAlt,
  FaHeadset,
  FaFilter,
  FaPlus,
  FaArrowUp,
  FaClock,
  FaMinus,
  FaArrowRight,
  FaUserCheck,
  FaInfoCircle,
  FaComment
} from 'react-icons/fa';

const CustomerDashboard = () => {
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
                  <FaSearch />
                  <input type="text" placeholder="Search for services..." />
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
                </div>
                <div className="user-menu">
                  <div className="user-info">
                    <img src="https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff" alt="Profile" className="user-avatar" />
                    <span className="user-name">{fullName}</span>
                    <FaChevronDown />
                  </div>
                  <ul className="dropdown">
                    <li><a href="profile.html"><FaUserCircle /> My Profile</a></li>
                    <li><a href="#settings"><FaCog /> Settings</a></li>
                    <li><a href="#help"><FaQuestionCircle /> Help Center</a></li>
                    <li className="divider"></li>
                    <li><a href="index.html" className="logout"><FaSignOutAlt /> Go back</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
    
          <div className="dashboard-container">
            <aside className="dashboard-sidebar">
              <div className="sidebar-header">
                <span className="welcome-text">Welcome back,</span>
                <h3>{fullName}</h3> {/* Use dynamic fullName */}
              </div>
              <ul className="sidebar-menu">
                <li className="active">
                  <a href="#overview"><FaThLarge /> Overview</a>
                </li>
                <li>
                  <a href="#bookings"><FaCalendarCheck /> My Bookings</a>
                </li>
                <li>
                  <a href="#messages"><FaComments /> Messages</a>
                </li>
                <li>
                  <a href="#payments"><FaCreditCard /> Payments</a>
                </li>
                <li>
                  <a href="#reviews"><FaStar /> My Reviews</a>
                </li>
                <li>
                  <a href="#addresses"><FaMapMarkerAlt /> Addresses</a>
                </li>
              </ul>
              <div className="sidebar-footer">
                <div className="help-card">
                  <FaHeadset />
                  <h4>Need Help?</h4>
                  <p>Contact our 24/7 customer support</p>
                  <button className="btn btn-outline btn-sm">Contact Support</button>
                </div>
              </div>
            </aside>
    
            <main className="dashboard-main">
              <div className="dashboard-header">
                <div className="header-content">
                  <h1>Dashboard Overview</h1>
                  <p className="text-muted">Here's what's happening with your service bookings</p>
                </div>
                <div className="quick-actions">
                  <button className="btn btn-outline"><FaFilter /> Filter</button>
                  <button className="btn btn-primary"><FaPlus /> Book New Service</button>
                </div>
              </div>
    
              {/* Dashboard Stats Section */}
              <div className="dashboard-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaCalendarCheck />
                  </div>
                  <div className="stat-details">
                    <h3>Active Bookings</h3>
                    <p className="stat-value">5</p>
                    <p className="stat-change positive">
                      <FaArrowUp />
                      +2 from last month
                    </p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaClock />
                  </div>
                  <div className="stat-details">
                    <h3>Hours Booked</h3>
                    <p className="stat-value">24</p>
                    <p className="stat-change positive">
                      <FaArrowUp />
                      +8 from last month
                    </p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="stat-details">
                    <h3>Total Spent</h3>
                    <p className="stat-value">$580</p>
                    <p className="stat-change neutral">
                      <FaMinus />
                      Same as last month
                    </p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaStar />
                  </div>
                  <div className="stat-details">
                    <h3>Average Rating</h3>
                    <p className="stat-value">4.8</p>
                    <p className="stat-change positive">
                      <FaArrowUp />
                      +0.2 from last month
                    </p>
                  </div>
                </div>
              </div>
    
              {/* Upcoming Services Section */}
              <section className="upcoming-services">
                <div className="section-header">
                  <div className="header-left">
                    <h2>Upcoming Services</h2>
                    <p className="text-muted">Your next 7 days of scheduled services</p>
                  </div>
                  <div className="header-right">
                    <div className="view-options">
                      <button className="btn btn-icon active"><i className="fas fa-th-large"></i></button>
                      <button className="btn btn-icon"><i className="fas fa-list"></i></button>
                    </div>
                    <a href="#" className="btn btn-link">View Calendar <FaArrowRight /></a>
                  </div>
                </div>
                {/* Upcoming Services List */}
                <div className="service-cards">
                  {/* Example service card */}
                  <div className="service-card upcoming">
                    <div className="service-date">
                      <span className="day">15</span>
                      <span className="month">Feb</span>
                    </div>
                    <div className="service-info">
                      <h3>House Cleaning</h3>
                      <p className="provider">
                        <FaUserCheck />
                        Clean Pro Services
                      </p>
                      <p className="time">
                        <FaClock />
                        09:00 AM - 11:00 AM
                      </p>
                      <p className="location">
                        <FaMapMarkerAlt />
                        123 Main St, Apt 4B
                      </p>
                    </div>
                    <div className="service-actions">
                      <button className="btn btn-primary">
                        <FaInfoCircle />
                        Information
                      </button>
                      <button className="btn btn-outline">
                        <FaComment />
                        Chat
                      </button>
                    </div>
                  </div>
                  {/* Repeat for other upcoming services */}
                </div>
              </section>
            </main>
          </div>
        </div>
      );
    };
    
    export default CustomerDashboard;