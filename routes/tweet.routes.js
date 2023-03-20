const { ensureAuthenticated } = require('../config/security.config');
const { createTweet, deleteTweet, editTweet, updateTweet, showTweet, likeTweet } = require('../controllers/tweet.controllers')
const router = require('express').Router()

router.post('/new', createTweet); // creation d'un tweet
router.get('/like/:tweetId', likeTweet)
router.get('/delete/:tweetId', deleteTweet); // supprimer un tweet
router.get('/edit/:tweetId', editTweet); // affiche le tweet pour la modification
router.post('/edit/:tweetId', updateTweet); //mise a jour
router.get('/:tweetId', showTweet);

module.exports = router