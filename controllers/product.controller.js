const Product = require('../models/product.model');
const productProcess = require('../util/product-process');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');
const deleteImg = require('../util/delete-img');
const { json } = require('express');


async function getproduct(req, res, next){

    try{
        const [products] = await Product.getproductinfo();
        const [categories] = await Product.getproductcatogory(); 
        res.render('./admin/product-list', {products: products, categories: categories});

    }catch(error){
        console.log('error');
        next(error);
    }     

}

async function getproductForUser(req, res, next){

    try{
        const [products] = await Product.getproductinfo();
        const [categories] = await Product.getproductcatogory(); 
        res.render('./customer/product-list', {products: products, categories: categories});

    }catch(error){
        console.log('error');
        next(error);
    }     

}


async function getGroupOfProduct(req, res, next){

    try {
        const [products] = await Product.getGroupOfProductInfo(req.params.group);
        const [categories] = await Product.getproductcatogory(); 
       
        res.render('./admin/product-list', {products: products, categories: categories });

    } catch (error) {
        console.log('error');
        next(error);
    }

    

}

async function getGroupOfProductForUser(req, res, next){

    try {
        const [products] = await Product.getGroupOfProductInfo(req.params.group);
        const [categories] = await Product.getproductcatogory(); 
       
        res.render('./customer/product-list', {products: products, categories: categories });

    } catch (error) {
        console.log('error');
        next(error);
    }

    

}


async function getSingleProductForUser(req, res, next){


    try {
        const [productdata] = await Product.getSingleProductInfo(req.params.uid);
        const [categories] = await Product.getproductcatogory();

        res.render('./customer/product-detail', {products: productdata, categories: categories});
    }catch(error){
        next(error);
        return;
    }

   

}


// async function quickGetSingleProductForUser(req, res, next){
//     let product;
//     console.log(req.params.uid)
//     try {
//         [product] = await Product.getSingleProductInfo(req.body.productUid);
//         console.log(product);
//     } catch (error) {
//         next(error);
//         return;
        
//     }


//     res.json({
//         message: '商品快速選取視窗開啟！',
//         name: product[0].name,
//         price: product[0].price,
//         size01: product[0].size_1,
//         size02: product[0].size_2,
//         size03: product[0].size_3,
//         size04: product[0].size_4,
//         size05: product[0].size_5,
//         color01: product[0].color_1,
//         color02: product[0].color_2,
//         color03: product[0].color_3,
//         color04: product[0].color_4,
//         color05: product[0].color_5,
        


//     })

// }


async function quickGetSingleProductForUserGET(req, res, next){
    let product;
    try {
        [product] = await Product.getSingleProductInfo(req.params.uid);
       
    } catch (error) {
        next(error);
        return;
        
    }


    res.json({
        message: '商品快速選取視窗開啟！',
        name: product[0].name,
        price: product[0].price,
        image: product[0].image,
        uid: product[0].uid,
        sizes: [
        product[0].size_1,
        product[0].size_2,
        product[0].size_3,
        product[0].size_4,
        product[0].size_5],
        colors: [
        product[0].color_1,
        product[0].color_2,
        product[0].color_3,
        product[0].color_4,
        product[0].color_5]

        


    })


}





async function getSingleproductToUpdate(req, res, next){
    

    let sessionData = sessionFlash.getSessionData(req);
    

    if(!sessionData){
        sessionData ={
            // productName: '',
            // price: '',
            // sizes: '',
            // colors: '',
            // description: '',
            // categories:'',
            errorMessage: ''

        };
    }


    try {
        const [productdata] = await Product.getSingleProductInfo(req.params.uid);
        const [categories] = await Product.getproductcatogory();

        res.render('./admin/product-update', {productdata: productdata, categories: categories, inputData: sessionData, submitPath: '/admin/product/edit/update/' + productdata[0].uid});
    }catch(error){
        next(error);
        return;
    }

   

}

async function searchProductForUser(req, res, next){

    try {
        
        const [products] = await Product.searchProduct(req.query.productname);
        const [categories] = await Product.getproductcatogory(); 
       
        res.render('./customer/product-list', {products: products, categories: categories });

    } catch (error) {
        console.log('error');
        next(error);
    }


}

async function updateProduct(req, res, next){

    
    const array001 = productProcess.checkarray(req.body.sizes);
    const array002 = productProcess.checkarray(req.body.colors);

  
    productProcess.fillarray(array001);
    productProcess.fillarray(array002);

    const enteredData ={
        productName: req.body.name,
        price: req.body.price,
        sizes: req.body.sizes,
        colors: req.body.colors,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
      
    }

    if(validation.pricesAreValid(req.body.price)){
        sessionFlash.flashDataToSession(req, {
            errorMessage: '價格格式有誤，數字間並不能留白，僅能輸入阿拉伯數字',
            ...enteredData},
            function(){
                console.log('數字有錯');
                deleteImg.deletePreImg(req.file.filename);
                res.redirect(`/admin/product/edit/${req.params.uid}`);
            }
            );


         return;

    }else if(!req.body.category){

        sessionFlash.flashDataToSession(req, {
            errorMessage: '未選擇商品分類，請選擇。',
            ...enteredData},
            function(){
                console.log('未選擇商品分類');
                deleteImg.deletePreImg(req.file.filename);
                res.redirect(`/admin/product/edit/${req.params.uid}`);
            }
            );

            return;

    }else if(validation.arrayIsNotValid(array001)||
    validation.arrayIsNotValid(array002)){
        sessionFlash.flashDataToSession(req, {
            errorMessage: '尺寸規格/顏色欄位有留空，請刪除空白欄位',
            ...enteredData},
            function(){
                console.log('有空格');
                deleteImg.deletePreImg(req.file.filename);
                res.redirect(`/admin/product/edit/${req.params.uid}`);
            }
            );


         return
    }else if(!validation.productDataAreValid(
        req.body.name, req.body.price, req.body.description)){

            sessionFlash.flashDataToSession(req, {
                errorMessage: '欄位未填寫完整，請確認欄位無留空。',
                ...enteredData},
                function (){
                    deleteImg.deletePreImg(req.file.filename);
                    res.redirect(`/admin/product/edit/${req.params.uid}`);
                }
            );
            return;

    }
    

    try {
        const [productdata] = await Product.getSingleProductInfo(req.params.uid);

        function checkImgChanged(imgInput){
            if(!imgInput){
                return productdata[0].image
            }else {
                deleteImg.deletePreImg(productdata[0].image);
                return req.file.filename
            }
        }

        let imgName = checkImgChanged(req.file);

        const product = new Product({
            ...req.body,
            image: imgName,
            uid: req.params.uid
          },
          array001,
          array002)

        await product.saveProduct();
        res.redirect('/');

    }catch(error){
        next(error);
        return;
    }

 




    // try{
    //     await product.saveProduct();
    //     res.redirect('/');
    // } catch (error) {
    //     next(error);
    //     return;
    // }





}




 async function getNewProductPage(req, res, next){

    let sessionData = sessionFlash.getSessionData(req);


    if(!sessionData){
        sessionData ={
            productName: '',
            price: '',
            sizes: '',
            colors: '',
            description: '',
            categories:''

        };
    }

  
    try{
    const [categories] = await Product.getproductcatogory();
    res.render( './admin/product-create', {categories: categories, inputData: sessionData })
    } catch (error) {
    next(error);
    return;
}

}


async function createProduct(req, res, next){
    

    const array001 = productProcess.checkarray(req.body.sizes);
    const array002 = productProcess.checkarray(req.body.colors);

  
    productProcess.fillarray(array001);
    productProcess.fillarray(array002);

    const enteredData ={
        productName: req.body.name,
        price: req.body.price,
        sizes: req.body.sizes,
        colors: req.body.colors,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image
      
    }

    if(validation.pricesAreValid(req.body.price)){
        sessionFlash.flashDataToSession(req, {
            errorMessage: '價格格式有誤，數字間並不能留白，僅能輸入阿拉伯數字',
            ...enteredData},
            function(){
                console.log('數字有錯');
                deleteImg.deletePreImg(req.file.filename);
                res.redirect('/admin/newproduct');
            }
            );


         return;

    }else if(!req.body.category){

        sessionFlash.flashDataToSession(req, {
            errorMessage: '未選擇商品分類，請選擇。',
            ...enteredData},
            function(){
                console.log('未選擇商品分類');
                deleteImg.deletePreImg(req.file.filename);
                res.redirect('/admin/newproduct');
            }
            );

            return;

    }else if(validation.arrayIsNotValid(array001)||
    validation.arrayIsNotValid(array002)){
        sessionFlash.flashDataToSession(req, {
            errorMessage: '尺寸規格/顏色欄位有留空，請刪除空白欄位',
            ...enteredData},
            function(){
                console.log('有空格');
                deleteImg.deletePreImg(req.file.filename);
                res.redirect('/admin/newproduct');
            }
            );


         return
    }else if(!validation.productDataAreValid(
        req.body.name, req.body.price, req.body.description)){

            sessionFlash.flashDataToSession(req, {
                errorMessage: '欄位未填寫完整，請確認欄位無留空。',
                ...enteredData},
                function (){
                    deleteImg.deletePreImg(req.file.filename);
                    res.redirect('/admin/newproduct')
                }
            );
            return;

    }

    



    
    const product = new Product({
         ...req.body,
      image: req.file.filename,
    },
    array001,
    array002)


    try{
        await product.saveProduct();
        res.redirect('/');
    } catch (error) {
        next(error);
        return;
}



}

async function deleteProduct(req, res, next){

    try {
        await Product.deleteProduct(req.params.uid);
        res.redirect('/admin/plist')

    } catch (error) {
        next(error);
        return;
    }
    
}




module.exports = {
    getNewProductPage: getNewProductPage,
    createProduct: createProduct,
    getproduct: getproduct,
    getSingleproductToUpdate: getSingleproductToUpdate,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    getGroupOfProduct: getGroupOfProduct,
    getproductForUser: getproductForUser,
    getGroupOfProductForUser: getGroupOfProductForUser,
    getSingleProductForUser: getSingleProductForUser,
    searchProductForUser: searchProductForUser,
    // quickGetSingleProductForUser: quickGetSingleProductForUser,
    quickGetSingleProductForUserGET: quickGetSingleProductForUserGET,
 
  
}