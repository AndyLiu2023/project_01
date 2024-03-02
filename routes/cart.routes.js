const express = require('express');


const cartctrl = require('../controllers/cart.controller');

const router = express.Router();

const orderctrl = require('../controllers/order.controller');

const csrfSynchronisedProtection = require('../middlewares/csrf-check');

router.get('/', cartctrl.getcart);

router.post('/items', csrfSynchronisedProtection, cartctrl.addCartItem);

router.patch('/items', csrfSynchronisedProtection, cartctrl.updateCartItem);

router.patch('/items/delete',csrfSynchronisedProtection, cartctrl.deleteCartItem);


//payment

router.post('/return', orderctrl.eypayReturn);

router.get('/clientReturn', (req, res) => {
    
    res.render('success');
  });


module.exports = router;