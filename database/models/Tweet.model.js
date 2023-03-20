const mongoose = require('mongoose')
const schema = mongoose.Schema;

const tweetSchema = schema({
    content: {
        type: String,
        maxlength: [146, 'le tweet est trop long !'],
        minlength:[4, 'le tweet est trop court !'],
        required: (true, "Le contenu ne peut etre vide")
    },
    author: {
        type: schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    comments : {
        type: [schema.Types.ObjectId],
        ref : 'comment'
    },
    nbLikes : {type: Number, default:0}
},{
    timestamps: true
})

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;