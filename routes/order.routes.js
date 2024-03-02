const express = require('express');

const orderctrl = require('../controllers/order.controller');

const router = express.Router();

const csrfSynchronisedProtection = require('../middlewares/csrf-check');


// router.post('/', csrfSynchronisedProtection, orderctrl.addOrder);

router.post('/', csrfSynchronisedProtection, orderctrl.confirmReceiver)

router.get('/confirm', orderctrl.confirmOrder);

router.get('/finalcheck', orderctrl.finalcheck );

router.get('/pay', orderctrl.addOrder );

router.get('/', orderctrl.getAllOrdersForUsers);

// router.get('/admin', orderctrl.getAllOrders);

// router.patch('/changestatus/:id', orderctrl.updateOrder);

// router.get('/filter/:condition', orderctrl.filterOrders);


//payment

// router.post('/return', orderctrl.eypayReturn);

// router.get('/clientReturn', (req, res) => {
    
//     res.render('success');
//   });


module.exports = router;