const express = require('express');
const asyncHandler = require('express-async-handler');
const { Skatepark, Image, Parktag } = require('../../db/models');
const { skateparkValidators, editSkateparkValidators } = require('../../validations/validations');

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
    const skatepark = await Skatepark.findByPk(req.params.id);
    return res.status(200).json(skatepark);
  })
);

router.post('/',
  skateparkValidators,
  asyncHandler( async (req, res) => {
    const { name, description, address, city, state, zipcode, userId, tag } = req.body;

    if (!req.files.length) {
      return res.status(400).json(['You must provide at least one photo.']);
    }
    // lat long check here
    const skatePark = await Skatepark.build({
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

    const resImages = await Promise.all(imageObjs.map(async (image) => await image.save()));

    const resTags = tag.map(async (singleTag) => {
      const newParktag = Parktag.create({
        skateparkId: result.id,
        tagId: singleTag
      });
      return newParktag;
    })

    const response = {
        ...result.dataValues,
        images: resImages,
        tags: resTags
    }

    return res.status(200).json(response);

  })
);

router.put(`/:id(\\d+)`,
  editSkateparkValidators,
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
        skateparkId: skatepark.id,
      });
      return image;
    })

    const tags = req.body.tag;

    const oldTags = await Parktag.findAll({
      attributes: ['tagId'],
      where: {
        skateparkId: req.params.id
      },
      raw: true
    })

    console.log(oldTags, 'oldtags');
    console.log(tags);

    const removeTags = oldTags.filter(tag => !tags.includes(String(tag.tagId)));
    const oldTagsIds = oldTags.map(tag => tag.tagId);
    const addTags = tags.filter(tag => !oldTagsIds.includes(Number(tag)));

    console.log(oldTagsIds, 'goodness')

    console.log(addTags.length, 'added tags');
    console.log(removeTags.length, 'deleted tags');

    console.log(typeof addTags[0], 'added tags');
    console.log(typeof removeTags[0].tagId, 'deleted tags');

    const destroyedTags = await Promise.all(removeTags.map(async tag => {
      console.log(tag, 'tag inside destroyer')
      const deleteTag = await Parktag.findOne({
        where: {
          tagId: tag.tagId,
          skateparkId: req.params.id
        }
      });
      return await deleteTag.destroy();
    }));

    const resTags = await Promise.all(addTags.map(async tag => {
      console.log(tag, 'tag inside of restags')
      const newParktag = await Parktag.create({
          tagId: tag,
          skateparkId: req.params.id
      });
      return newParktag;
    }));

    console.log(resTags, resTags[0], 'res tags added tags')
    console.log(destroyedTags, destroyedTags[0], 'destroyed tags')


    const resImages = await Promise.all(imageObjs.map(async (image) => await image.save()))

    const response = {
      ...result.dataValues,
      images: resImages,
      tags: resTags
  }
    return res.status(200).json(response);
  })
);

router.delete('/:id(\\d+)',
  asyncHandler(async (req, res) => {
    const skatepark = await Skatepark.findByPk(req.params.id);
    await skatepark.destroy();
    return res.json(skatepark);
  })

);

module.exports = router;
