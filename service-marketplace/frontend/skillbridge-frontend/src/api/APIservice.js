import axios from 'axios';

// Create a single axios instance for all API calls
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export API functions
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
};

export const servicesAPI = {
  getAllServices: (params) => api.get('/services', { params }),
  getServiceById: (id) => api.get(`/services/${id}`),
  createService: (serviceData) => api.post('/services', serviceData),
  updateService: (id, serviceData) => api.put(`/services/${id}`, serviceData),
  deleteService: (id) => api.delete(`/services/${id}`),
  getProviderServices: () => api.get('/services/provider'),
};

export const bookingsAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getCustomerBookings: () => api.get('/bookings'),
  getProviderBookings: () => api.get('/bookings/provider'),
  updateBookingStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
};

// Add your offres API functions using the same api instance
export const offresAPI = {
  // Get all offers with optional filters
  getOffres: (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.categorie) params.append('categorie', filters.categorie);
    if (filters.ville) params.append('ville', filters.ville);
    if (filters.keyword) params.append('keyword', filters.keyword);
    
    return api.get(`/offres?${params.toString()}`);
  },
  
  // Get all categories for filtering
  getCategories: () => api.get('/categories'),
  
  // Get all cities for filtering
  getVilles: () => api.get('/villes')
};

// Export the api instance as default
export default api;