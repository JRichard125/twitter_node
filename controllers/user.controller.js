const { createNewUser } = require("../queries/user.queries");
const multer = require('multer');
const path = require('path');

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