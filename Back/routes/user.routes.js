const router = require('express').Router();
const { newUser, updateUser, getUser } = require('../controllers/user.controller');

router.post('/user', newUser);
router.get('/user', getUser);
router.put('/user/:id', updateUser);

module.exports = router;