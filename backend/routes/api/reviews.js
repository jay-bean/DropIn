const express = require('express');
const asyncHandler = require('express-async-handler');
const { Review, Skatepark, Image } = require('../../db/models');
const { reviewValidators } = require('../../validations/validations');

const router = express.Router();

router.get('/',
  asyncHandler(async (_req, res) => {
    const reviews = await Review.findAll({
      include: [{model: Skatepark, include: [{model: Image, as: 'images'}]}],
    });
    return res.status(200).json(reviews);
  })
);

router.post('/',
  reviewValidators,
  asyncHandler(async (req, res) => {
    const { rating, comment, userId, skateparkId } = req.body;
    console.log(req.body, 'reqbodyyy');
    const newReview = await Review.build({
      rating,
      comment,
      userId,
      skateparkId
    });
    console.log(newReview, 'new reviewwww');
    const result = await newReview.save();
    console.log(result, 'this is result')
    return res.status(200).json(result);
  })
);

router.put('/:id(\\d+)',
  reviewValidators,
  asyncHandler(async (req, res) => {
    const { rating , comment } = req.body;
    const updatedReview = await Review.findByPk(req.params.id);
    updatedReview.rating = rating;
    updatedReview.comment = comment;

    const result = await updatedReview.save();
    return res.status(200).json(result);
  })
);

router.delete('/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const review = await Review.findByPk(req.params.id);
    await review.destroy();
    return res.json(review);
  })
);

module.exports = router;
