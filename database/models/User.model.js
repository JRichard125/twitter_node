const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = schema({
    username: {type: String, required:true},
    firstname: {type: String, required:true},
    lastname: {type: String, required:true},
    local: {
        email: {type: String, required: true},
        password: {type: String, required: true}
    }
}, {
    timestamps: true
})

userSchema.statics.hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return bcrypt.hash(password, salt)
    } catch (error) {
       throw error; 
    }
}

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.local.password)
}

const User = mongoose.model('user', userSchema)


module.exports = User