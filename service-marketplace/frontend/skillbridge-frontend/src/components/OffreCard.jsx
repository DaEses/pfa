import React from 'react';
import { Link } from 'react-router-dom';

function OffreCard({ offre }) {
  return (
    <div className="offre-card">
      <h3>{offre.title}</h3>
      {offre.description && <p>{offre.description.substring(0, 100)}...</p>}
      
      <div className="offre-details">
        <span className="category">{offre.categorie}</span>
        <span className="location">{offre.ville}</span>
      </div>
      
      <Link to={`/services/${offre._id}`} className="view-details">
        Voir détails
      </Link>
    </div>
  );
}

export default OffreCard;