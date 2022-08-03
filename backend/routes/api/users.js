const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('firstName')
  .exists({ checkFalsy: true })
  .isLength({ min: 1, max:50 })
  .withMessage('Please provide a first name between 1 - 50 characters.'),
  check('lastName')
  .exists({ checkFalsy: true })
  .isLength({ min: 1, max:50 })
  .withMessage('Please provide a last name between 1 - 50 characters.'),
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const image = req.files;
    const picUrl = image[0].location;
    const user = await User.signup({ firstName, lastName, email, password, picUrl });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// Grabbing single user for profile page
// router.get(
//   '/:id(\\d+)',
//   requireAuth,
//   asyncHandler(async, (req, res) => {
//     const user = await User.findByPk(req.params.id);
//     return res.json(user);
//   })
// )

module.exports = router;
