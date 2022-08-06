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
      return res.status(400).json({errors: ['You must provide at least one photo.']});
    }

    if (!tag) {
      return res.status(400).json({errors: ['You must provide at least one tag to describe your park.']});
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
    if (!req.body.tag) {
      return res.status(400).json({errors: ['You must provide at least one tag to describe your park.']});
    }

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

    let tags;
    if (typeof req.body.tag === 'string') {
      tags = [req.body.tag];
    }
    else {
      tags = req.body.tag;
    }

    const oldTags = await Parktag.findAll({
      attributes: ['tagId'],
      where: {
        skateparkId: req.params.id
      },
      raw: true
    })

    let addTags;
    let removeTags;
    let oldTagsIds;
    let resTags;
    let destroyedTags;
    if (tags) {
      removeTags = oldTags.filter(tag => !tags.includes(String(tag.tagId)));
      oldTagsIds = oldTags.map(tag => tag.tagId);
      addTags = tags.filter(tag => !oldTagsIds.includes(Number(tag)));
      destroyedTags = await Promise.all(removeTags.map(async tag => {
        const deleteTag = await Parktag.findOne({
          where: {
            tagId: tag.tagId,
            skateparkId: req.params.id
          }
        });
       await deleteTag.destroy();
       return ;
      }));

      resTags = await Promise.all(addTags.map(async tag => {
        const newParktag = await Parktag.create({
            tagId: tag,
            skateparkId: req.params.id
        });
        return newParktag;
      }));
    }


    const resImages = await Promise.all(imageObjs.map(async (image) => await image.save()))

    const response = {
      ...result.dataValues,
      images: resImages,
      tags: resTags,
      destroyedTags
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
