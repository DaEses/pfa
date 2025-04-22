const API_BASE_URL = 'http://localhost:5000/api';

// Récupérer les services
function fetchServices() {
  return fetch(`${API_BASE_URL}/services`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des services:', error);
      throw error;
    });
}

// Exemple : créer un utilisateur
function createUser(payload) {
  return fetch(`${API_BASE_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi des données:', error);
      throw error;
    });
}
function loginUser(credentials) {
  return fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login échoué');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    });
}

export { fetchServices, createUser, loginUser };

