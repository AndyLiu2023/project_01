const express = require('express');
const router = express.Router();

const postctrl= require('../controllers/post.controller');


const productctrl =require ('../controllers/product.controller');
const imageUpload = require('../middlewares/image-upload');

const orderctrl = require('../controllers/order.controller');

const csrfSynchronisedProtection = require('../middlewares/csrf-check');


 


//post//
router.get('/posts', postctrl.getallpost);
router.post('/newposts',csrfSynchronisedProtection, postctrl.createPosts );



router.get('/posts/:id/detail', postctrl.getPostDetail);
router.get('/posts/:id/edit', postctrl.getPostDetailToUpdate);

router.post('/posts/:id/edit',csrfSynchronisedProtection, postctrl.updatePost);
router.post('/posts/:id/delete', csrfSynchronisedProtection, postctrl.deletePost);

//product//

router.get('/plist', productctrl.getproduct);


router.get('/newproduct', productctrl.getNewProductPage);
router.post('/createproduct', imageUpload,csrfSynchronisedProtection, productctrl.createProduct);

router.get('/product/edit/:uid', productctrl.getSingleproductToUpdate );
router.post('/product/edit/update/:uid', imageUpload,  csrfSynchronisedProtection, productctrl.updateProduct);

router.post('/product/delete/:uid', csrfSynchronisedProtection, productctrl.deleteProduct);


router.get('/plist/:group', productctrl.getGroupOfProduct);


router.get('/samplePage', function(req, res){res.render('')})

//order//

router.get('/adminorder', orderctrl.getAllOrders);

router.patch('/changestatus/:id', csrfSynchronisedProtection, orderctrl.updateOrder);

router.get('/filter/:condition', orderctrl.filterOrders);



module.exports = router;