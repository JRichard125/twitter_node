const mongoose = require('mongoose')
const schema = mongoose.Schema;

const tweetSchema = schema({
    content: {
        type: String,
        maxlength: [146, 'le tweet est trop long !'],
        minlength:[4, 'le tweet est trop court !'],
        required: (true, "Le contenu ne peut etre vide")
    }
},{
    timestamps: true
})

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;