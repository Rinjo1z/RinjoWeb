const { login: loginService, register: registerService, obtenerPerfil: obtenerPerfilService } = require('../services/auth.service');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const resultado = await loginService(email, password);
        res.json(resultado);
    } catch (error) {
        if (error.message === 'Credenciales inválidas') {
            return res.status(401).json({ mensaje: error.message });
        }
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Default name if not provided (since register form might only have email/password based on previous context)
        const userName = name || email.split('@')[0];

        const resultado = await registerService(userName, email, password);
        res.status(201).json(resultado);
    } catch (error) {
        if (error.message === 'El usuario ya existe') {
            return res.status(400).json({ mensaje: error.message });
        }
        res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
};

const obtenerPerfil = async (req, res) => {
    try {
        const perfilUsuario = await obtenerPerfilService(req.user);
        res.json(perfilUsuario);
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ mensaje: error.message });
        }
        res.status(500).json({ mensaje: 'Error al obtener perfil', error: error.message });
    }
};

module.exports = { login, register, obtenerPerfil };