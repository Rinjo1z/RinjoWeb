const router = require('express').Router();
const { newUser, updateUser, getUser } = require('../controllers/user.controller');
const { allowRoles } = require('../middleware/roles');

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

// Ruta solo para administradores

// Otro ejemplo:
// router.put('/editar', verificarToken, authController.editarUsuario);

router.post('/user', newUser);
router.get('/user', getUser);
router.put('/user/:id', updateUser);

module.exports = router;