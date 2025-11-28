const router = require('express').Router();

const {createReview, getReviews} = require('../controllers/review.controllers');
router.post('/review', createReview);
router.get('/review', getReviews);


module.exports = router;