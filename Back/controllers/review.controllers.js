const Review = require('../models/review');

const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        const newReview = await review.save();
        return res.status(201).json({ok: true, data: newReview });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const items = await Review.find();
        return res.status(200).json({ ok: true, data: items });
    }catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await Review.findByIdAndDelete(id);
        if (!deletedReview) {
            return res.status(404).json({ ok: false, message: 'No se encontro la reseña' });
        }
        return res.status(200).json({ 'reseña eliminada': deletedReview });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

module.exports = { createReview, getReviews, deleteReview };