const router = require('express').Router();

const {newUser, updateUser} = require('./controllers/user.controller');

router.post('/user', newUser);
router.put('/user/:id', updateUser);

module.exports = router;