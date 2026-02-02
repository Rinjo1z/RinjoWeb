const Review = require('../models/review');

async function newReview(data) {
    const review = new Review(data);
    return await review.save();
}

async function getReviews() {
    return await Review.find();
}

async function deleteReview(id) {
    const deletedReview = await Review.findByIdAndDelete(id);
    if (!deletedReview) {
        throw new Error('No se encontro la reseña');
    }
    return deletedReview;
}