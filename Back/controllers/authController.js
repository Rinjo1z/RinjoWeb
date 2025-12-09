const jwt = require('jsonwebtoken');
const User = require('../models/user')

// 1. LOGIN: Crea el token
const login = async (req, res) => {
    const { email, password } = req.body;
    // ... Validar usuario y contraseña con BD ...
    const usuarioEncontrado = await User.findOne({ email, password });
    if (!usuarioEncontrado) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
        { id: usuarioEncontrado.id, email: usuarioEncontrado.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );

    res.json({ mensaje: 'Login exitoso', token: token });
};

// 2. PERFIL: Usa los datos del token
// Nota: Esta función asume que el "Cadenero" ya hizo su trabajo
const obtenerPerfil = async (req, res) => {
    try {
        // req.user existe gracias al middleware 'verificarToken'
        console.log("Usuario desde el token:", req.user);

        // Aquí podrías buscar detalles extra en la BD usando req.user.id
        const perfilUsuario = {
            id: req.user.id,
            email: req.user.email,
            nivel: 'Estudiante Experto',
            cursos: ['NodeJS', 'React']
        };

        res.json(perfilUsuario);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil' });
    }
};

module.exports = { login, obtenerPerfil };