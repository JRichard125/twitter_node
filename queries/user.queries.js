const User = require("../database/models/User.model")


exports.createNewUser = async (user) => {
   try {
    const hashedPassword = await User.hashPassword(user.password)

    const newUser = User({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        local: {
            email: user.email,
            password: hashedPassword, 
        }
    })
    return newUser.save();
    
   } catch (error) {
        throw error
   }
}