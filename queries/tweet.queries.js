const Tweet = require("../database/models/Tweet.model")


exports.createNewTweet = (body) => {
    const newTweet = new  Tweet(body)
    return newTweet.save()
}

exports.findAllTweets =() => {
    return Tweet.find({}).populate('author').exec();
}

exports.findTweetandDelete = (tweetId) => {
    return Tweet.findByIdAndDelete(tweetId).exec();
}

exports.findTweetById = (tweetId) => {
    return Tweet.findById(tweetId).exec();
}

exports.findTweetAndUpdate = (tweetId, body) => {
    return Tweet.findByIdAndUpdate(tweetId, {$set: body}).exec();
}