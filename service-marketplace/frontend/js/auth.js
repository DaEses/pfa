const express = require('express');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Debug function to test argon2
async function testArgon2() {
  try {
    const testPassword = "test123";
    const hash = await argon2.hash(testPassword);
    console.log("Test hash created:", hash);
    
    const valid = await argon2.verify(hash, testPassword);
    console.log("Verification should be true:", valid);
  } catch (err) {
    console.error("Argon2 test failed:", err);
  }
}

// Run test on startup
testArgon2();

// @route   POST /api/auth/register and /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);
router.post('/signup', registerUser);

async function registerUser(req, res) {
  const { name, email, password, userType } = req.body;
  const role = userType || req.body.role;
  
  console.log("Registration attempt:", { name, email, role });
  
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: 'Tous les champs sont requis.' });
  }
  
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
    
    // Log original password for debugging
    console.log('Original password:', password);
    
    // Create user and let middleware handle hashing
    const newUser = new User({
      name,
      email,
      password,
      role
    });
    
    await newUser.save();
    
    // After saving, verify the hash was stored correctly
    const savedUser = await User.findOne({ email });
    console.log('Saved user password hash:', savedUser.password);
    
    // Test verification with the original password
    const verifyTest = await argon2.verify(savedUser.password, password);
    console.log('Verification test result:', verifyTest);
    
    const payload = {
      user: {
        id: newUser._id,
        role: newUser.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ 
          token,
          userType: newUser.role,
          msg: 'Utilisateur enregistré avec succès.' 
        });
      }
    );
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Erreur serveur: ' + err.message);
  }
}

// @route   POST /api/auth/login
// @desc    Authenticate user and return token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', { email, password });
  
  if (!email || !password) {
    return res.status(400).json({ msg: 'Tous les champs sont requis.' });
  }
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(400).json({ msg: "L'utilisateur n'existe pas." });
    }
    
    console.log('User found:', {
      id: user._id.toString(),
      email: user.email,
      passwordHash: user.password
    });
    
    console.log('Attempting to verify with password:', password);
    const isMatch = await argon2.verify(user.password, password);
    console.log('Password verification result:', isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ msg: 'Mot de passe incorrect.' });
    }
    
    const payload = {
      user: {
        id: user._id,
        role: user.role
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          userType: user.role
        });
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Erreur serveur: ' + err.message);
  }
});

// @route   GET /api/auth/verify
// @desc    Verify token and return user info
// @access  Private
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ valid: false, msg: 'No token, authorization denied' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ valid: false, msg: 'User not found' });
    }
    
    return res.json({ 
      valid: true, 
      userType: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ valid: false, msg: 'Token is not valid' });
  }
});

module.exports = router;