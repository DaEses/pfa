const express = require('express');
const router = express.Router();
const offreController = require('../controllers/offreController');
const { protect } = require('../middleware/authMiddleware');

// Ajouter une offre (protégée)
router.post('/', protect, offreController.createOffre);

// Voir toutes les offres
router.get('/', offreController.getAllOffres);

module.exports = router;
