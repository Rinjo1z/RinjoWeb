const User = require('../models/user');

const getUser = async (req, res) => {
    try {
        const items = await User.find();
        return res.status(200).json({ ok: true, data: items });
    }catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
}


const newUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;

    // Verificar si ya existe
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    // Guardar directamente la contraseña en texto plano (⚠️ inseguro)
    const nuevoUsuario = new User({ name, email, password });
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ ok: true, data: 'usuario actualizado' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error actualizando al usuario', error: error.message });
    
    }
};

module.exports = { newUser, updateUser, getUser };