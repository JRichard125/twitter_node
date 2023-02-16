const mongoose = require('mongoose')
const schema = mongoose.Schema;

const tweetSchema = schema({
    content: {
        type: String,
        maxlength: 146,
        minlength:1,
        required: (true, "Le contenu ne peut etre vide")
    }
},{
    timestamps: true
})

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;