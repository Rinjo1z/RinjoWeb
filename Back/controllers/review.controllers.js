const { newReview, getReviews: getReviewsService, deleteReview: deleteReviewService } = require('../services/review.service');

const createReview = async (req, res) => {
    try {
        const review = await newReview(req.body);
        return res.status(201).json({ ok: true, data: review });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const getReviews = async (req, res) => {
    try {
        const items = await getReviewsService();
        return res.status(200).json({ ok: true, data: items });
    } catch (error) {
        if (error.message.includes('No se encontro la reseña')) {
            return res.status(404).json({ ok: false, message: error.message });
        }
        return res.status(500).json({ ok: false, message: error.message });
    }
}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedReview = await deleteReviewService(id);
        return res.status(200).json({ ok: true, data: deletedReview });
    } catch (error) {
        if (error.message.includes('No se encontro la reseña')) {
            return res.status(404).json({ ok: false, message: error.message });
        }
        return res.status(500).json({ ok: false, message: error.message });
    }
};

module.exports = { createReview, getReviews, deleteReview };