const {
    createNewTweet,
    findAllTweets,
    findTweetandDelete,
    findTweetById,
    findTweetAndUpdate,
    getCurentUserTweetsWithFollowing,
    likedTweet,
    retweet
} = require("../queries/tweet.queries");

exports.createTweet = async (req, res, next) => { // localhost:4000/tweet/new 
    try {
        const body = req.body;
        await createNewTweet({...body, author: req.user._id, retweeted: {status: false, initialAuthor: req.user._id}});
        res.redirect('/')
    } catch (err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message)
        const tweets = await findAllTweets()
        res.status(400).render('tweets/tweet-list', {errors, tweets, isAuthenticated: req.isAuthenticated, currentUser: req.user})
    }
}


exports.tweetList = async (req, res, next) => {
    try {
        if(!req.user) {
            const tweets = await findAllTweets()
            res.render('tweets/tweet-list', {tweets})
        } else {
            const tweets = await getCurentUserTweetsWithFollowing(req.user)
            res.render('tweets/tweet-list', {tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user})

        }
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

exports.editTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const tweet = await findTweetById(tweetId);
        if (tweet.author._id.toString() == req.user._id.toString()) {
            res.render('tweets/tweet-edit', {tweet, isAuthenticated: req.isAuthenticated, currentUser: req.user})
        } else {
            res.redirect('/')
        }
    } catch (error) {
        next(error)
    }
}

exports.updateTweet = async (req,res,next) => {
    try {
        const tweetId = req.params.tweetId;
        const body = req.body;
        await findTweetAndUpdate(tweetId, body);
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}

exports.showTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        const tweet = await findTweetById(tweetId)
        res.render('tweets/tweet-show', {tweet,comments: tweet.comments , isAuthenticated: req.isAuthenticated(), currentUser: req.user})
    } catch (error) {
        next(error)
    }
}

exports.likeTweet = async (req,res,next) => {
    try {
        const tweetId = req.params.tweetId;
        const user = req.user
        await likedTweet(tweetId,user)
        const tweets = await findAllTweets()
        res.render("includes/tweet-list", {tweets, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
    } catch (error) {
        res.redirect('/')
    }
}

exports.shareTweet = async (req, res, next) => {
    try {
        const tweetId = req.params.tweetId;
        await retweet(tweetId, req.user._id)
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}