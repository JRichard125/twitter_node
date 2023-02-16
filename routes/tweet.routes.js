const router = require('express').Router()


router.get('/new', (req,res) => {
    res.render('tweets/tweet-form')
})

module.exports = router