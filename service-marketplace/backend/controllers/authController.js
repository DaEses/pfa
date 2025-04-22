const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Register Controller
exports.register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  // Validate input
  if (!fullName || !email || !password || !role) {
    return res.status(400).json({ msg: 'Tous les champs sont requis.' });
  }

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Format d\'email invalide.' });
  }

  const allowedRoles = ['admin', 'provider', 'customer'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ msg: 'Rôle invalide.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email déjà utilisé.' });
    }

    const hashedPassword = await argon2.hash(password);

    const user = new User({ fullName, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      token,
      user: { id: user._id, fullName: user.fullName, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur.');
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Tous les champs sont requis.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "L'utilisateur n'existe pas." });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: { id: user._id, fullName: user.fullName, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur serveur.');
  }
};

