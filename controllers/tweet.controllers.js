const { createNewTweet, findAllTweets, findTweetandDelete } = require("../queries/tweet.queries");

exports.createTweet = async (req, res, next) => { // localhost:4000/tweet/new 
    try {
        const body = req.body;
        await createNewTweet(body);
        res.redirect('/')
    } catch (err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        const tweets = await findAllTweets()
        res.status(400).render('tweets/tweet-list', {errors, tweets})
    }
}


exports.tweetList = async (req, res, next) => {
    try {
        const tweets = await findAllTweets()
        res.render('tweets/tweet-list', {
            tweets,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        })
    } catch (error) {
        next(error)
    }
}


exports.deleteTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        await findTweetandDelete(tweetId);
        res.redirect('/');
    } catch (error) {
        next(error);
    }
}