const router = require('express').Router();
const tweetRoute = require('./tweet.routes');
const userRoute = require('./user.routes');
const authRoute = require('./auth.routes')
const { tweetList } = require('../controllers/tweet.controllers');

router.use('/tweet', tweetRoute);
router.use('/user', userRoute);
router.use('/auth', authRoute)

router.get('/', tweetList);

module.exports = router;