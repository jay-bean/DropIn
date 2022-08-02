const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const skateparksRouter = require('./skateparks.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/skateparks', skateparksRouter);

module.exports = router;
