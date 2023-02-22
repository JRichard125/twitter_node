const { createTweet } = require('../controllers/tweet.controllers')
const router = require('express').Router()

router.post('/new', createTweet)

module.exports = router