import React, { useEffect, useState } from 'react';

const ServiceList = () => {
  const [services, setServices] = useState([]);  // État pour stocker les services
  const [loading, setLoading] = useState(true);  // État pour gérer le chargement
  const [error, setError] = useState(null);  // État pour gérer les erreurs

  useEffect(() => {
    // Appel à l'API pour récupérer les services
    fetch('http://localhost:5000/api/services')
      .then(response => response.json())
      .then(data => {
        setServices(data);  // Mettre à jour l'état avec les services
        setLoading(false);  // Désactiver le mode de chargement
      })
      .catch(err => {
        setError('Erreur lors de la récupération des services');  // Afficher l'erreur
        setLoading(false);  // Désactiver le mode de chargement
      });
  }, []);  // Le tableau vide signifie que l'effet est exécuté uniquement une fois au montage du composant

  if (loading) {
    return <div>Chargement des services...</div>;  // Message de chargement
  }

  if (error) {
    return <div>{error}</div>;  // Message d'erreur
  }

  return (
    <div>
      <h2>Liste des services</h2>
      <ul>
        {services.map(service => (
          <li key={service._id}>
            <h3>{service.titre}</h3>
            <p>{service.description}</p>
            <p><strong>Categorie:</strong> {service.categorie}</p>
            <p><strong>Ville:</strong> {service.ville}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
// Add auth check before booking
function handleBookNow(serviceId) {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html'; // Redirect to login, not register
    return;
  }
  window.location.href = `/service-details.html?id=${serviceId}`;
}