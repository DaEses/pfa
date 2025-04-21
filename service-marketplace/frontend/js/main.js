document.addEventListener('DOMContentLoaded', function() {
    const servicesContainer = document.getElementById('services-container');
  
    // Function to load services
    async function loadServices() {
      try {
        const response = await fetch('http://localhost:5000/api/services');
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
  
        const services = await response.json();
  
        // Display services
        displayServices(services);
      } catch (error) {
        console.error('Erreur lors du chargement des services:', error);
        servicesContainer.innerHTML = '<p>Erreur lors du chargement des services.</p>';
      }
    }
  
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
        
        servicesContainer.appendChild(serviceCard);
      });
    }
    // Define the viewServiceDetails function
    function viewServiceDetails(serviceId) {
    // Logic to view service details (e.g., show a modal, navigate to a new page, etc.)
    console.log('Viewing details for service:', serviceId);
    
    // Example action: redirect to a details page
    window.location.href = `http://127.0.0.1:5000/service-details.html?id=${serviceId}`;
  }
  
  
    // Load the services when the page loads
    loadServices();
  });
  