const Order = require('../models/order.model');
const User = require('../models/user.model');
const sessionFlash = require('../util/session-flash');
const authvalidation = require('../util/validation');
const ecpay_payment = require('../node_modules/ecpay_aio_nodejs/lib/ecpay_payment')
const crypto = require('crypto');


async function getAllOrdersForUsers(req, res, next){
    try{
        const orders = await Order.findAllOrdersForUsers(res.locals.uid);
        res.render('./customer/order-list', {orders: orders})
    }catch(error){
        next(error);
    }
}


async function getAllOrders(req, res, next){
    try{
        const orders = await Order.findAllOrders();
        res.render('./admin/order-list', {orders: orders})
    }catch(error){
        next(error);
    }
}


function confirmOrder(req, res, next){
    let sessionData = sessionFlash.getSessionData(req);
    if(!sessionData){
        sessionData ={
            name: '',
            email: '',
            phone: '',
            address: '',
            postal: ''
        };
    }

    res.render('./customer/order-process', {inputData: sessionData} )
}

function finalcheck(req,res, next){

    const receiverdata = req.session.receiverData



    res.render('./customer/order-confirm-receiver', {receiverdata: receiverdata} )
}


async function addOrder(req, res, next){
    const cart = res.locals.cart;
    let userDocument;
    try {
        userDocument = await User.findById(res.locals.uid);
        
    }catch(error){
        next(error);
    }

    const receiverData = req.session.receiverData;

    
    // const receiverData = {
    //     name: req.body.receiver,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     address: req.body.address,
    //     postal: req.body.postal

    // }

    // if(!authvalidation.receiverEamilAreValid(receiverData.email)){
    //     sessionFlash.flashDataToSession(req, {
    //         errorMessage: '需填入正確的電子郵件格式',
    //         ...receiverData},
    //         function (){
    //             res.redirect('/orders/confirm')
    //         }
    //     );
    //     return
    // }else if(!authvalidation.receiverPhoneAreValid(receiverData.phone)){
    //     sessionFlash.flashDataToSession(req, {
    //         errorMessage: '需填入正確的手機號碼',
    //         ...receiverData},
    //         function (){
    //             res.redirect('/orders/confirm')
    //         }
    //     );
    //     return
    // }else if(authvalidation.userPostalAreValid(receiverData.postal)){

    //     sessionFlash.flashDataToSession(req, {
    //         errorMessage: '郵遞區號只能為數字，必為3碼',
    //         ...receiverData},
    //         function (){
    //             res.redirect('/orders/confirm')
    //         }
    //     );
    //     return


    // }else if(!authvalidation.receiverDataAreValid(
    //     receiverData.name,
    //     receiverData.email,
    //     receiverData.phone,
    //     receiverData.address,
    //     receiverData.postal
    // )){

    //     sessionFlash.flashDataToSession(req, {
    //         errorMessage: '欄位未填寫完整，請確認欄位無留空',
    //         ...receiverData},
    //         function (){
    //             res.redirect('/orders/confirm')
    //         }
    //     );
    //     return

    // }

    const order = new Order(cart, userDocument, receiverData);

    try {
        const orderdata = await order.saveOrder();

    let base_param = {
        MerchantTradeNo: orderdata.orderuid, 
        MerchantTradeDate: orderdata.date, 
        TotalAmount: String(cart.totalPrice),
        TradeDesc: 'test',
        ItemName: 'testproduct',
        ReturnURL: `${process.env.HOST}/cart/return`,
        ClientBackURL: `${process.env.HOST}/cart/clientReturn`,
        

      }

     

      const options = {
        OperationMode: "Test", //Test or Production
        MercProfile: {
          MerchantID: process.env.MERCHANTID,
          HashKey: process.env.HASHKEY,
          HashIV: process.env.HASHIV
        },
        IgnorePayment: [
      //    "Credit",
      //    "WebATM",
      //    "ATM",
      //    "CVS",
      //    "BARCODE",
      //    "AndroidPay"
        ],
        IsProjectContractor: false
      }
      



    const create = new ecpay_payment(options);
    const htm = create.payment_client.aio_check_out_credit_onetime(base_param);
    console.log(htm)

    req.session.cart = null;
    req.session.receiverData = null;
    req.session.save(() => {res.render('./demo', {title: 'express', htm})});
    


    } catch (error) {
        next(error);
    }

    
}



async function confirmReceiver(req, res , next){
 
    const receiverData = {
        name: req.body.receiver,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        postal: req.body.postal

    }

    if(!authvalidation.receiverEamilAreValid(receiverData.email)){
        sessionFlash.flashDataToSession(req, {
            errorMessage: '需填入正確的電子郵件格式',
            ...receiverData},
            function (){
                res.redirect('/orders/confirm')
            }
        );
        return
    }else if(!authvalidation.receiverPhoneAreValid(receiverData.phone)){
        sessionFlash.flashDataToSession(req, {
            errorMessage: '需填入正確的手機號碼',
            ...receiverData},
            function (){
                res.redirect('/orders/confirm')
            }
        );
        return
    }else if(authvalidation.userPostalAreValid(receiverData.postal)){

        sessionFlash.flashDataToSession(req, {
            errorMessage: '郵遞區號只能為數字，必為3碼',
            ...receiverData},
            function (){
                res.redirect('/orders/confirm')
            }
        );
        return


    }else if(!authvalidation.receiverDataAreValid(
        receiverData.name,
        receiverData.email,
        receiverData.phone,
        receiverData.address,
        receiverData.postal
    )){

        sessionFlash.flashDataToSession(req, {
            errorMessage: '欄位未填寫完整，請確認欄位無留空',
            ...receiverData},
            function (){
                res.redirect('/orders/confirm')
            }
        );
        return

    }


      req.session.receiverData = receiverData;

     console.log(req.session.receiverData);

     req.session.save(() => {res.redirect('/orders/finalcheck');});


}

async function updateOrder(req, res, next){
  
    const orderId = req.params.id;
    const newStatus = req.body.newStatus;
    const csrfToken = req.body.CSRFToken;
    

    try {
        const order = await Order.findById(orderId);

        order[0].status = newStatus;
        await order[0].saveOrder();

        res.json({ message: '訂單狀態已更新', newStatus: newStatus, CSRFToken: csrfToken  });

    } catch (error) {
        next(error);
        
    }

}


async function filterOrders(req, res, next){

    try {
       
        const orders = await Order.filterorder(req.params.condition);
        console.log(orders);
        res.render('./admin/order-list', {orders: orders})


    } catch (error) {
        console.log('error');
        next(error);
    }
}

// 接收金流回傳

async function eypayReturn(req, res, next){

    const options = {
        OperationMode: "Test", //Test or Production
        MercProfile: {
          MerchantID: process.env.MERCHANTID,
          HashKey: process.env.HASHKEY,
          HashIV: process.env.HASHIV
        },
        IgnorePayment: [
      //    "Credit",
      //    "WebATM",
      //    "ATM",
      //    "CVS",
      //    "BARCODE",
      //    "AndroidPay"
        ],
        IsProjectContractor: false
      };

    console.log('req.body:', req.body);

    const { CheckMacValue } = req.body;
    const data = { ...req.body };
    console.log(data.RtnCode);
    delete data.CheckMacValue;

    const create = new ecpay_payment(options);
    const checkValue = create.payment_client.helper.gen_chk_mac_value(data);
    
    console.log(
      '確認交易正確性：',
      CheckMacValue === checkValue,
      CheckMacValue,
      checkValue,
    );
  
    
    res.send('1|OK');

    if(data.RtnCode === '1'){
        await Order.updatePayStatus(data.MerchantTradeNo);
    }else{
        return;
    }

    
  
}




module.exports = {
    addOrder: addOrder,
    confirmOrder: confirmOrder,
    getAllOrdersForUsers: getAllOrdersForUsers,
    getAllOrders: getAllOrders,
    updateOrder: updateOrder,
    filterOrders: filterOrders,
    confirmReceiver: confirmReceiver,
    finalcheck: finalcheck,
    eypayReturn: eypayReturn
}