import React, { useState, useEffect } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    location: ''
  });

  // Update filters and trigger API fetch
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
  };

  // Build query and fetch services
  useEffect(() => {
    const fetchFilteredServices = async () => {
      try {
        const query = new URLSearchParams();

        if (filters.category) query.append('categorie', filters.category);
        if (filters.priceRange) {
          const [min, max] = filters.priceRange.split('-');
          if (min) query.append('minPrice', min);
          if (max) query.append('maxPrice', max);
        }
        if (filters.rating) query.append('rating', filters.rating);
        if (filters.location) query.append('ville', filters.location === 'local' ? 'Paris' : 'Remote');

        const response = await fetch(`http://localhost:5000/api/offres${query.toString() ? '?' + query.toString() : ''}`);
        const data = await response.json();

        onFilterChange(data); // Send results to parent component
      } catch (error) {
        console.error('Error fetching filtered services:', error);
      }
    };

    fetchFilteredServices();
  }, [filters]);

  return (
    <div className="filter-bar">
      <h3>Filter Services</h3>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All Categories</option>
          <option value="cleaning">Cleaning</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="tutoring">Tutoring</option>
          <option value="design">Design</option>
          <option value="landscaping">Landscaping</option>
          <option value="repairs">Repairs</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priceRange">Price Range</label>
        <select
          id="priceRange"
          name="priceRange"
          value={filters.priceRange}
          onChange={handleFilterChange}
        >
          <option value="">Any Price</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200-500">$200 - $500</option>
          <option value="500-">$500+</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating">Minimum Rating</label>
        <select
          id="rating"
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
        >
          <option value="">Any Rating</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Star</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="location">Location</label>
        <select
          id="location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
        >
          <option value="">Any Location</option>
          <option value="remote">Remote</option>
          <option value="local">Local Only</option>
        </select>
      </div>

      <button 
        className="btn btn-primary btn-block"
        onClick={() => {
          const resetFilters = {
            category: '',
            priceRange: '',
            rating: '',
            location: ''
          };
          setFilters(resetFilters);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;
