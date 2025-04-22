require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
const serviceRoutes = require('./routes/serviceRoutes');
const offreRoutes = require('./routes/offreRoutes');
const authRoutes = require('./routes/auth');
const path = require('path');  // Import de path pour gérer les chemins de fichiers

// Initialisation de l'application Express
const app = express();

// Connexion à la base de données
connectDB();

// Middleware
app.use(cors());  // Permet les requêtes CORS entre différents domaines
app.use(express.json());  // Parse le corps des requêtes en JSON
// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, 'frontend')));


// Routes API
app.use('/api/services', serviceRoutes);  // Route pour gérer les services
app.use('/api/offres', offreRoutes);  // Route pour gérer les offres
app.use('/api/auth', authRoutes);  // Route pour l'authentification

// Serveur en mode production : serveur des fichiers statiques
if (process.env.NODE_ENV === 'production') {
  // Servir les fichiers statiques du dossier 'frontend'
  app.use(express.static(path.join(__dirname, 'frontend')));
  app.use(express.static(path.join(__dirname, 'frontend', 'html')));
  
  // En cas de requête non API, renvoyer index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'html', 'index.html'));
  });
  
}

// Configuration du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur : http://localhost:${PORT}`);
  console.log(listEndpoints(app));  // Affiche toutes les routes disponibles
});
