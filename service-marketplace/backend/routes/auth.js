const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

router.post(
  '/register',
  [
    body('fullName').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['customer', 'provider']),
  ],
  register
);

router.post('/login', login);

module.exports = router;
