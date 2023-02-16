const router = require('express').Router()
const Tweet = require('../../database/models/Tweet.model')

router.post('/new', (req,res) => { // localhost:4000/api/tweet/new 
    const body = req.body;
    const newTweet = new Tweet(body)

    newTweet
        .save()
        .then( _ => res.redirect('/'))
        .catch(err => {
            const errors = Object.keys(err.errors).map(key => err.errors[key].message)
            Tweet
                .find({})
                .exec()
                .then(tweets => res.status(400).render('tweets/tweet-list', {errors, tweets}) )
        })
})

module.exports = router;