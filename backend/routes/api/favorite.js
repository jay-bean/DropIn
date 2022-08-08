const express = require('express');
const asyncHandler = require('express-async-handler');
const { Favorite, Skatepark, Image } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.get('/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (user) {
      const favorites = await Favorite.findAll({
        attributes: { include: ['id'] },
        include: [{model: Skatepark, include: [{model: Image, as: 'images'}]}],
        where: {
          userId: user.id
        }
      })
      return res.status(200).json(favorites);
    }
  })
);

router.post('/',
  asyncHandler(async (req, res) => {
    const { userId, skateparkId } = req.body;

    const newFavorite = await Favorite.build({
      userId,
      skateparkId
    });

    const result = await newFavorite.save();
    return res.status(200).json(result);
  })
);

router.delete('/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const favorite = await Favorite.findOne({ where: { id: req.params.id } });
    await favorite.destroy();
    return res.json(req.params.id);
  })
);

module.exports = router;
