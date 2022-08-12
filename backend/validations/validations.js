const { check } = require('express-validator');
const { Skatepark } = require('../db/models');
const { handleValidationErrors } = require('../utils/validation');

const skateparkValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for the skatepark.')
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must not exceed 100 characters.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description for the skatepark.')
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must not exceed 500 characters.'),
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address.')
    .isLength({ min: 1, max: 100 })
    .withMessage('Address must not exceed 100 characters.')
    .custom((value) => {
      return Skatepark.findOne({ where: { address: value } })
        .then((skatepark) => {
          if (skatepark) {
            return Promise.reject('The provided address already exists.');
          }
        });
    }),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city.')
    .isLength({ min: 1, max: 100 })
    .withMessage('City must not exceed 100 characters.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state.')
    .isLength({ min: 1, max: 100 })
    .withMessage('State must not exceed 100 characters.'),
  check('zipcode')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a zipcode.')
    .isInt()
    .withMessage('Zipcode must be a number.')
    .isPostalCode('US')
    .withMessage('Zipcode must be a valid US Postal Code.'),
  handleValidationErrors
];


const editSkateparkValidators = [
  check('name')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a name for the skatepark.')
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must not exceed 100 characters.'),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a description for the skatepark.')
    .isLength({ min: 1, max: 500 })
    .withMessage('Description must not exceed 500 characters.'),
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Please provide an address.')
    .isLength({ min: 1, max: 100 })
    .withMessage('Address must not exceed 100 characters.'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a city.')
    .isLength({ min: 1, max: 100 })
    .withMessage('City must not exceed 100 characters.'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a state.')
    .isLength({ min: 1, max: 100 })
    .withMessage('State must not exceed 100 characters.'),
  check('zipcode')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a zipcode.')
    .isInt()
    .withMessage('Zipcode must be a number.')
    .isPostalCode('US')
    .withMessage('Zipcode must be a valid US Postal Code.'),
  handleValidationErrors
];

const reviewValidators = [
  check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a rating.')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be a star between 1 and 5.'),
  check('comment')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a review for the skatepark.')
    .isLength({ min: 1, max: 255 })
    .withMessage('Review must not exceed 255 characters.'),
  handleValidationErrors
];

module.exports = {
  skateparkValidators,
  editSkateparkValidators,
  reviewValidators
}
