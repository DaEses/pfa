const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Vérification des champs requis
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: 'Tous les champs sont requis.' });
  }

  // Validation de l'email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Format d\'email invalide.' });
  }

  // Validation du rôle
  const allowedRoles = ['admin', 'provider', 'customer'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ msg: 'Rôle invalide.' });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email déjà utilisé.' });
    }

    // Hasher le mot de passe avec Argon2
    const hashedPassword = await argon2.hash(password);

    // Créer et sauvegarder l'utilisateur
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ msg: 'Utilisateur enregistré avec succès.' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur.');
  }
});

// @route   POST /api/auth/login
// @desc    Authentifier l'utilisateur et retourner un token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Vérification des champs
  if (!email || !password) {
    return res.status(400).json({ msg: 'Tous les champs sont requis.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "L'utilisateur n'existe pas." });
    }

    // Vérification du mot de passe en utilisant argon2 pour le comparer avec le mot de passe haché
    const isMatch = await argon2.verify(user.password, password);

    // Si les mots de passe ne correspondent pas
    if (!isMatch) {
      return res.status(400).json({ msg: 'Mot de passe incorrect.' });
    }

    // Créer le token JWT
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };

    // Signer et renvoyer le token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur.');
  }
});

module.exports = router;
