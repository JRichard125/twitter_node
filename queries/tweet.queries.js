const Tweet = require("../database/models/Tweet.model")


exports.createNewTweet = (body) => {
    const newTweet = new  Tweet(body)
    return newTweet.save()
}

exports.findAllTweets =() => {
    return Tweet.find().exec();
}

exports.findTweetandDelete = (tweetId) => {
    return Tweet.findByIdAndDelete(tweetId).exec();
}