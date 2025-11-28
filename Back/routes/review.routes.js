const router = require('express').Router();

const {createReview, getReviews, deleteReview} = require('../controllers/review.controllers');
router.post('/review', createReview);
router.get('/review', getReviews);
router.delete('/review/:id', deleteReview);



module.exports = router;