document.addEventListener('DOMContentLoaded', function() {
  // Éléments du DOM
  const categorieSelect = document.getElementById('categorie');
  const villeSelect = document.getElementById('ville');
  const keywordsInput = document.getElementById('keywords');
  const applyButton = document.getElementById('apply-filters');
  const servicesContainer = document.getElementById('services-container');
  
  // Charger les catégories et villes disponibles
  loadFilterOptions();
  
  // Charger les services initiaux
  loadServices();
  
  // Événement pour appliquer les filtres
  applyButton.addEventListener('click', loadServices);
  
  // Fonction pour charger les options de filtre
  async function loadFilterOptions() {
    try {
      // Idéalement, vous récupéreriez ces données depuis votre API
      const categories = ['Informatique', 'Marketing', 'Design', 'Traduction'];
      const villes = ['Paris', 'Lyon', 'Marseille', 'Bordeaux'];
      
      // Remplir le select des catégories
      categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorieSelect.appendChild(option);
      });
      
      // Remplir le select des villes
      villes.forEach(ville => {
        const option = document.createElement('option');
        option.value = ville;
        option.textContent = ville;
        villeSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Erreur lors du chargement des options de filtre:', error);
    }
  }
  
  // Fonction pour charger les services avec filtres
  async function loadServices() {
    try {
      const categorie = categorieSelect.value;
      const ville = villeSelect.value;
      const keywords = keywordsInput.value;
      
      // Construire l'URL avec les paramètres de filtre
      let url = '/api/services?';
      if (categorie) url += `categorie=${encodeURIComponent(categorie)}&`;
      if (ville) url += `ville=${encodeURIComponent(ville)}&`;
      if (keywords) url += `keywords=${encodeURIComponent(keywords)}`;
      
      // Effectuer la requête à l'API
      const response = await fetch('http://localhost:5000/api/services');
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const services = await response.json();
      
      // Afficher les services
      displayServices(services);
    } catch (error) {
      console.error('Erreur lors du chargement des services:', error);
      servicesContainer.innerHTML = '<p>Erreur lors du chargement des services.</p>';
    }
  }
  
  // Fonction pour afficher les services
  // Function to display services
function displayServices(services) {
  servicesContainer.innerHTML = '';

  if (services.length === 0) {
    servicesContainer.innerHTML = '<p>Aucun service trouvé.</p>';
    return;
  }

  services.forEach(service => {
    const serviceCard = document.createElement('div');
    serviceCard.className = 'service-card';

    serviceCard.innerHTML = `
      <h3>${service.titre}</h3>
      <p class="service-category">${service.categorie}</p>
      <p class="service-location">${service.ville}</p>
      <p>${service.description}</p>
    `;

    // Dynamically create the button for each service
    const button = document.createElement('button');
    button.textContent = `Voir les détails de ${service.titre}`;
    button.onclick = function() {
      viewServiceDetails(service._id);
    };

    // Append the button to the service card
    serviceCard.appendChild(button);
    
    // Append the service card to the container
    servicesContainer.appendChild(serviceCard);
  });
}

// Define the viewServiceDetails function
function viewServiceDetails(serviceId) {
  // Logic to view service details (e.g., show a modal, navigate to a new page, etc.)
  console.log('Viewing details for service:', serviceId);
  
  // Example action: redirect to a details page
  window.location.href = `service-details.html?id=${serviceId}`;
}

});

// Fonction globale pour voir les détails d'un service
function viewServiceDetails(serviceId) {
  window.location.href = `/service-details.html?id=${serviceId}`;
}
