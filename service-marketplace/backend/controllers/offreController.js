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
  const { categorie, ville, keyword } = req.query;

  const filters = {};

  if (categorie) {
    filters.typeMission = categorie;
  }

  if (keyword) {
    filters.$or = [
      { titre: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
      { competences: { $regex: keyword, $options: 'i' } },
    ];
  }

  try {
    let offresQuery = Offre.find(filters).populate({
      path: 'recruteur',
      select: 'fullName email role ville', // pour accéder à la ville du recruteur
    });

    let offres = await offresQuery.exec();

    if (ville) {
      offres = offres.filter(offre =>
        offre.recruteur?.ville?.toLowerCase() === ville.toLowerCase()
      );
    }

    res.json(offres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erreur serveur lors de la récupération des offres.' });
  }
};

