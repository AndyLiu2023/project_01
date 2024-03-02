const Product = require('./product.model');

class Cart{
    constructor(items = [], totalQuantity = 0, totalPrice = 0){
        this.items = items;
        this.totalQuantity = totalQuantity;
        this.totalPrice = totalPrice;
    }


addItem(product, buydata){
    const cartItem ={
        product: product,
        quantity: +buydata.buyNumber,
        totalPrice: product.price * buydata.buyNumber ,
        size: buydata.size,
        color: buydata.color,
    };

    for (let i = 0; i < this.items.length; i++){
        const item = this.items[i];
        if(item.product.uid === product.uid && 
            item.size === cartItem.size && 
            item.color === cartItem.color){

            cartItem.quantity = item.quantity + cartItem.quantity;
            cartItem.totalPrice = item.totalPrice + cartItem.totalPrice;
            this.items[i] = cartItem;
            this.totalQuantity = cartItem.quantity - item.quantity + this.totalQuantity;
            this.totalPrice = cartItem.totalPrice - item.totalPrice + this.totalPrice;

            return;

        }

    }
    

    this.items.push(cartItem);
    this.totalQuantity = cartItem.quantity + this.totalQuantity;
    this.totalPrice = cartItem.totalPrice + this.totalPrice;
    // console.log(cartItem.quantity);
    // console.log(cartItem.totalPrice);
    // console.log( this.totalQuantity);
    // console.log( this.totalPrice);

}

 updateItem(productUid, newQuantity, size, color){

    for(let i = 0; i < this.items.length; i++){
        const item = this.items[i];

        if(item.product.uid === productUid && 
            item.size === size &&
            item.color === color &&
            newQuantity > 0 ){
            const cartItem = {...item};
            
            const quantityChange = newQuantity - item.quantity;
            cartItem.quantity = newQuantity;
            cartItem.totalPrice = newQuantity * item.product.price;
            this.items[i] = cartItem;

            this.totalQuantity = this.totalQuantity + quantityChange;
            this.totalPrice += quantityChange * item.product.price;
            return{ updatedItemPrice: cartItem.totalPrice };

        }else if(item.product.uid === productUid && 
            item.size === size &&
            item.color === color &&
            newQuantity <= 0 ){
            this.items.splice(i, 1);
            this.totalQuantity = this.totalQuantity - item.quantity;
            this.totalPrice -= item.totalPrice;

            return { updatedItemPrice: 0 };

        }
    }
 }

 async updatePrices(){
   
    const productUid = this.items.map(function(item){
        return item.product.uid
    });

    if(productUid.length === 0){
        return;
    }else{

    
        const products = await Product.findMultiple(productUid);
    
        const deletableCartItemProductIds = [];
    
        for (const cartItem of this.items){
            const product = products.find(function (prod){
                return prod.uid === cartItem.product.uid;
            });
            
    
            if(!product){
                deletableCartItemProductIds.push(cartItem.product.uid);
                continue;
            }
            console.log(deletableCartItemProductIds);
            cartItem.product = product;
            cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    
        }
    
            if (deletableCartItemProductIds.length > 0){
                this.items =this.items.filter(function(item){
                    return deletableCartItemProductIds.indexOf(item.product.uid) < 0;
                });
            }
    
            this.totalQuantity = 0;
            this.totalPrice = 0;
    
            for (const item of this.items){
                this.totalQuantity = this.totalQuantity + item.quantity;
                this.totalPrice = this.totalPrice + item.totalPrice;
    
            }
    
    

    }
    



 }

}

module.exports = Cart;