const User = require('../models/user');

async function getUser() {
    return await User.find();
}

async function newUser(data) {
    const user = new User(data);
    return await user.save();
}

async function updateUser(id, data) {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
}

module.exports = { getUser, newUser, updateUser };