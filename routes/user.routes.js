const router = require('express').Router();
const { ensureAuthenticated } = require('../config/security.config');
const {signup, signupForm, uploadImage, displayProfile, userList} = require('../controllers/user.controller');

// routes pour inscrire un utilisateur
router.get('/', userList);
router.get('/signup/form', signupForm);
router.post('/signup', signup)
router.post('/update/image', ensureAuthenticated, uploadImage)
router.get('/:username', ensureAuthenticated, displayProfile)

module.exports = router;