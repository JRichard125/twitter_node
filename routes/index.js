const router = require('express').Router()
const tweet = require('./tweet.routes')
const api = require('./api')
const Tweet = require('../database/models/Tweet.model')

router.use('/tweet', tweet)
router.use('/api', api)

router.get('/', (req,res) => {
    Tweet
        .find({})
        .exec()
        .then(tweets => {
            res.render('tweets/tweet-list', {tweets})
        })
})

module.exports = router;