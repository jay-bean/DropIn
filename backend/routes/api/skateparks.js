const express = require('express');
const asyncHandler = require('express-async-handler');
const { handleValidationErrors } = require('../../utils/validation');
const { Skatepark, Image } = require('../../db/models');
const { skateparkValidators, editSkateparkValidators } = require('../../validations');

const router = express.Router();

router.get('/',
  asyncHandler(async (_req, res) => {
    const skateparks = await Skatepark.findAll({
      include: [{model: Image, as: 'images'}]
    });
    return res.status(200).json(skateparks);
  })
);

router.get('/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const skatepark = await Skatepark.findOne(req.params.id);
    return res.status(200).json(skatepark);
  })
);

router.post('/',
  skateparkValidators,
  handleValidationErrors,
  asyncHandler( async (req, res) => {
    const { name, description, address, city, state, zipcode, userId } = req.body;
    handleValidationErrors

    if (!req.files.length) {
      return res.status(400).json(['You must provide at least one photo.']);
    }
    // lat long check here
    const skatePark = Skatepark.build({
      name,
      description,
      address,
      city,
      state,
      zipcode,
      userId,
      lat: 1,
      long: 1,
    });

    const result = await skatePark.save({raw: true});

    const images = req.files;
    const imageObjs = images.map(el => {
      const image = Image.build({
        url: el.location,
        skateparkId: result.id
      });
      return image;
    })

    const resImages = await Promise.all(imageObjs.map(async (image) => await image.save()))

    const response = {
        ...result.dataValues,
        images: resImages
    }

    return res.status(200).json(response);

  })
);

router.put(`/:id(\\d+)`,
  editSkateparkValidators,
  handleValidationErrors,
  asyncHandler(async (req, res) => {

    const skatepark = await Skatepark.findByPk(req.params.id);
    skatepark.name = req.body.name;
    skatepark.description = req.body.description;
    skatepark.address = req.body.address;
    skatepark.city = req.body.city;
    skatepark.state = req.body.state;
    skatepark.zipcode = req.body.zipcode;
    // if they change the address i'll need to do a lat/long check

    const result = await skatepark.save();

    const images = req.files;
    const imageObjs = images.map(el => {
      const image = Image.build({
        url: el.location,
        digId: result.id
      });
      return image;
    })

    const resImages = await Promise.all(imageObjs.map(async (image) => await image.save()))

    const response = {
      ...result.dataValues,
      images: resImages
  }
    return res.status(200).json(response);
  })
);

router.delete('/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const skatepark = await Skatepark.findByPk(req.params.id);
    await skatepark.destroy();
    return res.json({id});
  })

);
