const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const skateparksRouter = require('./skateparks.js');
const reviewsRouter = require('./reviews.js');
const favoritesRouter = require('./favorite.js');
const tagsRouter = require('./tag.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/skateparks', skateparksRouter);
router.use('/reviews', reviewsRouter);
router.use('/favorites', favoritesRouter);
router.use('/tags', tagsRouter);

module.exports = router;
