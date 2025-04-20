require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const listEndpoints = require('express-list-endpoints');
const serviceRoutes = require('./routes/serviceRoutes');

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/services', serviceRoutes);
app.use('/api/auth', require('./routes/auth'));

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré : http://localhost:${PORT}`);
  console.log(listEndpoints(app));
});
const offreRoutes = require('./routes/offreRoutes');
app.use('/api/offres', offreRoutes);
