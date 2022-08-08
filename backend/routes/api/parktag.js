const express = require('express');
const asyncHandler = require('express-async-handler');
const { Parktag, Tag, Skatepark, Image } = require('../../db/models');

const router = express.Router();

router.get('/',
  asyncHandler(async (_req, res) => {
    const parktags = await Parktag.findAll({
      attributes: { include: ['id'] },
      include: [{ model: Tag }, {model: Skatepark, include: [{model: Image, as: 'images'}]}]
    });
    return res.status(200).json(parktags);
  })
);

router.get('/tags',
  asyncHandler(async (_req, res) => {
    const tags = await Tag.findAll();
    return res.status(200).json(tags);
  })
);

module.exports = router;
