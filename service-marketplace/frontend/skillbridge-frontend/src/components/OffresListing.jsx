import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OffreFilter from './OffreFilter';
import OffreCard from './OffreCard';

function OffresListing() {
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOffres();
  }, []);

  const fetchOffres = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/offres');
      setOffres(response.data);
    } catch (err) {
      setError('Erreur lors du chargement des offres');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilteredResults = (filteredOffres) => {
    setOffres(filteredOffres);
  };

  return (
    <div className="offres-container">
      <h1 className="title">Find your dream job in a flash</h1>

      {/* Filter component */}
      <OffreFilter onFilterResults={handleFilteredResults} />

      {/* Display offers */}
      {loading ? (
        <div className="loading">Loading offers...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="offres-list">
          {offres.length === 0 ? (
            <p className="no-results">No offers match your criteria...</p>
          ) : (
            offres.map(offre => (
              <OffreCard key={offre._id} offre={offre} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default OffresListing;
