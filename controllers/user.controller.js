const { createNewUser, findUserByUsername, findUsersByQuerySearch } = require("../queries/user.queries");
const multer = require('multer');
const path = require('path');
const { findTweetsFromUsername } = require("../queries/tweet.queries");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../public/images/avatars'))
        },
        filename: (req,file,cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
})

exports.signupForm = async (req, res, next) => {
    try {
        res.render('users/signup-form', {errors: null})
    } catch (error) {
        next(error)
    }
}

exports.signup = async (req, res, next) => {
    try {
        const body = req.body;
        await createNewUser(body);
        res.redirect('/')

    } catch (error) {
        res.render('users/signup-form', {
            errors: [error.message],
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        })
    }
}

exports.uploadImage = [
    upload.single('avatar'),
    async (req,res,next) => {
    try {
        const user= req.user;
        user.avatar= `/images/avatars/${req.file.filename}`;
        await user.save();
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}]

exports.displayProfile = async (req,res,next) => {
    try {
        const username = req.params.username;
        const user = await findUserByUsername(username)
        const tweets = await findTweetsFromUsername(user._id)

        res.render("users/profile-show", {tweets, user, isAuthenticated: req.isAuthenticated(), currentUser: req.user})
    } catch (error) {
        next(error)
    }
}

exports.userList = async (req,res,next) => {
    try {
        const search = req.query.search;
        const users = await findUsersByQuerySearch(search);
        res.render('includes/search-result', {users})
    } catch (error) {
        next(error)
    }
}