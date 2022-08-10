const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const { handleSingleUpload } = require('../../middleware/upload');

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

router.get('/',
  asyncHandler(async (_req, res) => {
    const users = await User.findAll();
    return res.status(200).json(users);
  })
)

// Sign up
router.post(
  '/',
  handleSingleUpload,
  validateSignup,
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let image;
    let picUrl;
    let user;
    if (req.files.length) {
      image = req.files;
      picUrl = image[0].location;
      user = await User.signup({ firstName, lastName, email, password, picUrl });
    }
    else {
      picUrl = 'https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/73-730477_first-name-profile-image-placeholder-png.png';
      user = await User.signup({ firstName, lastName, email, password, picUrl })
    }

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }),
);

// edit profile
router.put(
  '/:id(\\d+)',
  handleSingleUpload,
  validateSignup,
  asyncHandler(async (req, res) => {

    const user = await User.findByPk(req.params.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;

    if (req.files.length) {
      const image = req.files;
      user.picUrl = image[0].location;
    }

    const result = await user.save();

    return res.json({
      result,
    });
  }),
);

module.exports = router;
