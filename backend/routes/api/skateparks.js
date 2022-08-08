const express = require('express');
const asyncHandler = require('express-async-handler');
const { Skatepark, Image, Parktag } = require('../../db/models');
const { skateparkValidators, editSkateparkValidators } = require('../../validations/validations');
const axios = require('axios').default;

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

    // construct full addresss
    const fullAddress = `${address}, ${city}, ${state}, ${zipcode}`;
    // construct full url
    const url = `${process.env.GEOCODING_BASE_URL}${fullAddress}&key=${process.env.GOOGLE_API_KEY}`;
    // make api request using axios
    const geocodeResponse = await axios.get(url);
    // if no worky
    if (!geocodeResponse.data.results.length) {
      return res.status(400).json({errors: ['You must provide a valid address.']});
    }
    // extract lat and long from respone
    const lat = geocodeResponse.data.results[0].geometry.location.lat;
    const long = geocodeResponse.data.results[0].geometry.location.lng;

    const formattedAddress = geocodeResponse.data.results[0].formatted_address.split(', ');
    const formattedStreetAddress = formattedAddress[0];
    const formattedCity = formattedAddress[1];
    const formattedState = formattedAddress[2].split(' ')[0];
    const formattedZipcode = formattedAddress[2].split(' ')[1];

    const skatePark = await Skatepark.build({
      name,
      description,
      address: formattedStreetAddress,
      city: formattedCity,
      state: formattedState,
      zipcode: formattedZipcode,
      userId,
      lat,
      long
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
    console.log(req.body, 'req.body');
    console.log(req.body.tag, 'tags')
    if (!req.body.tag) {
      return res.status(400).json({errors: ['You must provide at least one tag to describe your park.']});
    }

    // construct full addresss
    const fullAddress = `${req.body.address}, ${req.body.city}, ${req.body.state}, ${req.body.zipcode}`;
    console.log(fullAddress, 'fulladdy')
    // construct full url
    const url = `${process.env.GEOCODING_BASE_URL}${fullAddress}&key=${process.env.GOOGLE_API_KEY}`;
    console.log(url, 'url')
    // make api request using axios
    const geocodeResponse = await axios.get(url);
    console.log(geocodeResponse, 'this is geo response')
    // if no worky
    if (!geocodeResponse.data.results.length) {
      return res.status(400).json({errors: ['You must provide a valid address.']});
    }
    // extract lat and long from respone
    const lat = geocodeResponse.data.results[0].geometry.location.lat;
    const long = geocodeResponse.data.results[0].geometry.location.lng;
    console.log(lat, long, 'this is lat n long')
    const formattedAddress = geocodeResponse.data.results[0].formatted_address.split(', ');
    const formattedStreetAddress = formattedAddress[0];
    const formattedCity = formattedAddress[1];
    const formattedState = formattedAddress[2].split(' ')[0];
    const formattedZipcode = formattedAddress[2].split(' ')[1];
    console.log(formattedAddress, 'formatted address');
    console.log(formattedStreetAddress, 'street format');
    console.log(formattedCity, 'city format');
    console.log(formattedState, 'formatted state');
    console.log(formattedZipcode, 'formatted zipcode');

    const skatepark = await Skatepark.findByPk(req.params.id);
    skatepark.name = req.body.name;
    skatepark.description = req.body.description;
    skatepark.address = formattedStreetAddress;
    skatepark.city = formattedCity;
    skatepark.state = formattedState;
    skatepark.zipcode = formattedZipcode;
    skatepark.lat = lat;
    skatepark.long = long;

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
