const router = require('express').Router();
const { ensureAuthenticated } = require('../config/security.config');
const {signup, signupForm, uploadImage, displayProfile, userList, followUser, unfollowUser} = require('../controllers/user.controller');

// routes pour inscrire un utilisateur
router.get('/', ensureAuthenticated, userList);
router.get('/follow/:userId', ensureAuthenticated, followUser)
router.get('/unfollow/:userId', ensureAuthenticated, unfollowUser)
router.get('/signup/form', signupForm);
router.post('/signup', signup)
router.post('/update/image', ensureAuthenticated, uploadImage)
router.get('/:username', ensureAuthenticated, displayProfile)

module.exports = router;