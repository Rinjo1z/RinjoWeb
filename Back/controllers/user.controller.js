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
        const userData = req.body;
        const user = new User(userData);
        const savedUser = await user.save();
        return res.status(201).json({ ok: true, data: savedUser });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error creando al usuario', error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedUser = await user.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ ok: true, data: 'usuario actualizado' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: 'Error actualizando al usuario' });
    
    }
};

module.exports = { newUser, updateUser, getUser };