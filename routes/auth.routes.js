
const router =require('express').Router();
const { ensureAuthenticated } = require('../config/security.config');
const { signinForm, signin, signout } = require('../controllers/auth.controller')

router.get('/signin/form', signinForm);
router.post('/signin', signin);
router.get('/signout', ensureAuthenticated, signout);

module.exports = router;