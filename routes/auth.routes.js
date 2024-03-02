const express = require('express');
const router = express.Router();
const userController = require('../controllers/auth.controller');

const csrfSynchronisedProtection = require('../middlewares/csrf-check');


// router.get('/signup', function(req, res){
 
// res.render('./signup');
// })

router.get('/signup', userController.getSignup);

router.post('/signup', csrfSynchronisedProtection ,userController.signup);



router.get('/login', userController.getlogin);
router.post('/login', csrfSynchronisedProtection, userController.login);
router.post('/logout', csrfSynchronisedProtection ,userController.logout);


module.exports = router;