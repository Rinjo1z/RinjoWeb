const express = require('express');
const router = express.Router();

// Importamos el Controlador
const authController = require('../controllers/authController');

// Importamos el Middleware (Cadenero)
const verificarToken = require('../middleware/authMiddleware');

// --- RUTAS PÚBLICAS ---
// Cualquiera puede entrar aquí
router.post('/login', authController.login);

// --- RUTAS PRIVADAS ---
// Solo entran los que tengan token válido.
// Estructura: router.get('RUTA', MIDDLEWARE, CONTROLADOR)

router.get('/perfil', verificarToken, authController.obtenerPerfil);

// Otro ejemplo:
// router.put('/editar', verificarToken, authController.editarUsuario);

module.exports = router;