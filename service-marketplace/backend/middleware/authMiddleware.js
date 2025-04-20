const jwt = require('jsonwebtoken');

// Middleware pour protéger les routes avec JWT
const protect = (req, res, next) => {
  const token = req.header('Authorization')?.split(" ")[1]; // Récupérer le token depuis les headers

  if (!token) {
    return res.status(401).json({ msg: 'Aucun token, accès refusé' }); // Si le token est absent
  }

  try {
    // Vérification du token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Ajouter les informations de l'utilisateur (id, rôle, etc.)
    next(); // Passer à la prochaine étape (route)
  } catch (err) {
    res.status(401).json({ msg: 'Token invalide' }); // Si le token est invalide
  }
};

module.exports = { protect };
