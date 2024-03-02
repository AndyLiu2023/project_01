const Product = require('../models/product.model');

async function getcart(req, res, next){
    res.render('./customer/cart-list');
}

async function addCartItem(req, res, next){
    let product;
   
    try {
        product = await Product.getSingleProductInfo(req.body.productUid);
        
    } catch (error) {
        next(error);
        return;
    }
    const a = product[0][0];
  
    const cart = res.locals.cart;
    cart.addItem(a, req.body);

    req.session.cart = cart;
  

    res.status(201).json({
        message: 'Cart updated!',
        newTotalItems: cart.totalQuantity,
        CSRFToken: req.body.CSRFToken,
    });



}

function updateCartItem(req, res){
    const cart = res.locals.cart;
    const updatedItemData = cart.updateItem(
        req.body.productUid,
        +req.body.quantity,
        req.body.size,
        req.body.color
    )
    req.session.cart = cart;

    res.json({

        message: '商品購買數量已更新！',
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice,
            CSRFToken: req.body.CSRFToken
        },

        });


}


function deleteCartItem(req, res){
    const cart = res.locals.cart;
    const updatedItemData = cart.updateItem(
        req.body.productUid,
        +req.body.quantity,
        req.body.size,
        req.body.color
    )
    req.session.cart = cart;

    console.log(req.body.CSRFToken);

    res.json({

        message: '商品已從購物車移除！',
        updatedCartData: {
            newTotalQuantity: cart.totalQuantity,
            newTotalPrice: cart.totalPrice,
            updatedItemPrice: updatedItemData.updatedItemPrice,
            CSRFToken: req.body.CSRFToken
        },

        });


}


module.exports = {
    addCartItem: addCartItem,
    getcart: getcart,
    updateCartItem: updateCartItem,
    deleteCartItem: deleteCartItem


}