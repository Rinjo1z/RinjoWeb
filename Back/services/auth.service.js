const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function login(email, password) {
    const usuarioEncontrado = await User.findOne({ email });
    if (!usuarioEncontrado) {
        throw new Error('Credenciales inválidas');
    }

    const match = await bcrypt.compare(password, usuarioEncontrado.password);
    if (!match) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
        { id: usuarioEncontrado.id, email: usuarioEncontrado.email, role: usuarioEncontrado.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { mensaje: 'Login exitoso', token: token };
};

async function register(name, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { mensaje: 'Usuario registrado exitosamente', token };
}

async function obtenerPerfil(userFromToken) {
    // Buscar usuario en BD para asegurar que existe y tener datos frescos
    const user = await User.findById(userFromToken.id).select('-password');
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
};

module.exports = { login, register, obtenerPerfil };