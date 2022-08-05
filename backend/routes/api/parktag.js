const express = require('express');
const asyncHandler = require('express-async-handler');
const { Parktag, Tag } = require('../../db/models');

const router = express.Router();

router.get('/',
  asyncHandler(async (_req, res) => {
    const parktags = await Parktag.findAll({
      attributes: { include: ['id'] },
      include: [{ model: Tag }]
    });
    console.log(parktags, 'backend')
    return res.status(200).json(parktags);
  })
);

router.get('/tags',
  asyncHandler(async (_req, res) => {
    const tags = await Tag.findAll();
    console.log(tags, 'backend')
    return res.status(200).json(tags);
  })
);

module.exports = router;
