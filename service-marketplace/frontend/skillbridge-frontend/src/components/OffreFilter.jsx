import React, { useState } from 'react';
import axios from 'axios';

function OffreFilter({ onFilterResults }) {
  const [filters, setFilters] = useState({
    categorie: '',
    ville: '',
    keyword: ''
  });
  const [loading, setLoading] = useState(false);

  const categories = ['Plumbing', 'AC Repair', 'Electrical', 'Carpentry'];
  const villes = ['Sousse', 'Monastir', 'Sfax'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      if (filters.categorie) params.append('categorie', filters.categorie);
      if (filters.ville) params.append('ville', filters.ville);
      if (filters.keyword) params.append('keyword', filters.keyword);
      
      const response = await axios.get(`http://localhost:5000/api/offres?${params.toString()}`);
      onFilterResults(response.data);
    } catch (error) {
      console.error('Error filtering offres:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <div className="filter-controls">
        <input
          type="text"
          name="keyword"
          placeholder="Search by keywords"
          value={filters.keyword}
          onChange={handleInputChange}
        />
        
        <select 
          name="categorie"
          value={filters.categorie}
          onChange={handleInputChange}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        
        <select 
          name="ville"
          value={filters.ville}
          onChange={handleInputChange}
        >
          <option value="">All Cities</option>
          {villes.map(ville => (
            <option key={ville} value={ville}>{ville}</option>
          ))}
        </select>
        
        <button id="filter-button" type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Apply Filter'}
        </button>
      </div>
    </form>
  );
}

export default OffreFilter;
