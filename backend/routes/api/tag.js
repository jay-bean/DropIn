const express = require('express');
const asyncHandler = require('express-async-handler');
const { Tag } = require('../../db/models');

const router = express.Router();

router.get('/',
  asyncHandler(async (req, res) => {
    const tags = await Tag.findAll();
    return res.status(200).json(tags);
  })
);

module.exports = router;
