const express = require('express');
const asyncHandler = require('express-async-handler');
const { Parktag, Tag } = require('../../db/models');

const router = express.Router();

router.get('/',
  asyncHandler(async (_req, res) => {
    const parktags = await Parktag.findAll({
      attributes: { include: ['id'] },
      include: [{
        model: Tag
      }]
    });
    return res.status(200).json(parktags);
  })
);

module.exports = router;
