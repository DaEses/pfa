const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Import bcryptjs
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { fullName, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // Use bcrypt to hash password

    user = new User({ fullName, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user.id, fullName: user.fullName, role: user.role } });
  } catch (err) {
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password); // Use bcrypt to compare password
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ token, user: { id: user.id, fullName: user.fullName, role: user.role } });
  } catch (err) {
    res.status(500).send('Server error');
  }
};
