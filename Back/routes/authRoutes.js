const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // tu modelo

const router = express.Router();

// Ruta de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    // Validar contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ mensaje: 'Error en login', error: err.message });
  }
});

module.exports = router;
