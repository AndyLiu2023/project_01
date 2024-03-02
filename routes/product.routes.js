const express =require('express');
const router = express.Router();
const productctrl =require ('../controllers/product.controller');
const imageUpload = require('../middlewares/image-upload');



// router.get('/plist', function(req, res){
//     res.render('./admin/includes/product-item');
// })


// for admin
// router.get('/plist', productctrl.getproduct);


// router.get('/newproduct', productctrl.getNewProductPage);
// router.post('/createproduct', imageUpload, productctrl.createProduct);

// router.get('/product/edit/:uid', productctrl.getSingleproductToUpdate );
// router.post('/product/edit/update/:uid', imageUpload, productctrl.updateProduct);

// router.post('/product/delete/:uid', productctrl.deleteProduct);


// router.get('/plist/:group', productctrl.getGroupOfProduct);


// for customer

router.get('/productlist', productctrl.getproductForUser);
router.get('/productlist/:group', productctrl.getGroupOfProductForUser);
router.get('/product/:uid', productctrl.getSingleProductForUser);
router.get('/search', productctrl.searchProductForUser );
router.get('/search', productctrl.searchProductForUser );
// router.post('/item/:uid', productctrl.quickGetSingleProductForUser);
router.get('/item/:uid', productctrl.quickGetSingleProductForUserGET);

module.exports = router;