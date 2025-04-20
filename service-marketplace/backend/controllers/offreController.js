const Offre = require('../models/Offre');

// POST /api/offres — Créer une offre
exports.createOffre = async (req, res) => {
  const { titre, typeMission, competences, description } = req.body;

  if (!titre || !typeMission || !competences || !description) {
    return res.status(400).json({ msg: 'Tous les champs sont obligatoires.' });
  }

  try {
    const offre = new Offre({
      titre,
      typeMission,
      competences,
      description,
      recruteur: req.user.id // grâce au middleware d’authentification
    });

    const saved = await offre.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur lors de la création de l\'offre.' });
  }
};

// GET /api/offres — Voir toutes les offres
exports.getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.find().populate('recruteur', 'fullName email role');
    res.json(offres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur lors de la récupération des offres.' });
  }
};
