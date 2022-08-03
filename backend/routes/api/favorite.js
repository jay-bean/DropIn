const express = require('express');
const asyncHandler = require('express-async-handler');
const { Favorite } = require('../../db/models');

const router = express.Router();

router.get('/',
  asyncHandler(async (req, res) => {

    const { user } = req;
    console.log(res.locals, 'req')
    console.log(user, 'this is the session user');
    if (user) {
      const favorites = await Favorite.findAll({
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

    const newFavorite = {
      userId,
      skateparkId
    }

    const result = await newFavorite.save();
    return res.status(200).json(result);
  })
);

router.delete('/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const favorite = await Favorite.findByPk(req.params.id);
    await favorite.destroy();
    return res.json(favorite);
  })
);

module.exports = router;
