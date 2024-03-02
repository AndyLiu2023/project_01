const mysql = require('mysql2/promise');
const db = require ('../data/database');
const moment = require('moment');


class Order{
    constructor(cart, userData, receiverData, status = '處理中', date, orderId, paystatus = '未付款'){
        this.productData = cart;
        this.userData = userData;
        this.status = status;
        this.date = new Date(date).toLocaleDateString('zh-TW', {
            day: 'numeric',
            month: '2-digit',
            year: 'numeric'
          });
        this.id = orderId;
        this.receiverData = receiverData;
        this.paystatus = paystatus;
    }

    static transformOrderDocument(orderDoc) {
      
      const parsedProductData = JSON.parse(orderDoc.productData);  
      const parseduserData = JSON.parse(orderDoc.userData);  
      const receiverDocument = {
          name: orderDoc.name,
          email: orderDoc.email,
          phone: orderDoc.phone,
          address: orderDoc.address,
          postal: orderDoc.postal
      }
      

        return new Order(
          parsedProductData,
          parseduserData,
          receiverDocument,
          orderDoc.status,
          orderDoc.date,
          orderDoc.orderuid,
          orderDoc.paystatus
        );
      }
    
      static transformOrderDocuments(orderDocs) {
        return orderDocs.map(this.transformOrderDocument);
         
      }


      static async findAllOrdersForUsers(userId){
    
        const connection = mysql.createPool(db);

        const orders = await connection.query(`SELECT * FROM orders JOIN receivers ON orders.receiverid = receivers.id WHERE userData LIKE ? `, [`%{"id":${userId}%`]);

        

        return this.transformOrderDocuments(orders[0]);

      }

      static async findAllOrders(){
       
        const connection = mysql.createPool(db);

        const orders = await connection.query(`SELECT * FROM orders JOIN receivers ON orders.receiverid = receivers.id `);

        

        return this.transformOrderDocuments(orders[0]);

      }

      static async findById(orderId){
        
        const connection = mysql.createPool(db);
        
        const orders = await connection.query(`SELECT * FROM orders JOIN receivers ON orders.receiverid = receivers.id WHERE orderuid = ?  `, [orderId]);

        return this.transformOrderDocuments(orders[0]);
     

      }

      static async filterorder(condition){
       
        const connection = mysql.createPool(db);
        const orders = await connection.query(`SELECT * FROM orders JOIN receivers ON orders.receiverid = receivers.id WHERE status = ?  `, [condition]);
        return this.transformOrderDocuments(orders[0]);


      }


      async saveOrder(){
     
        if(this.id) {

          const connection = mysql.createPool(db);
          await connection.query('UPDATE orders SET status = ? WHERE orderuid = ?', [this.status, this.id]);
          return
           
        }else{
          const randomNum = 1 + Math.floor(Math.random() * 9) + Math.random().toFixed(10 - 1).split('.')[1];
          const orderuid = `Gtest10000${randomNum}`;
            const orderDocument = {
                userData : JSON.stringify(this.userData[0][0]),
                productData: JSON.stringify(this.productData),
                date: moment().format('YYYY/MM/DD HH:mm:ss'),
                status: this.status,
                paystatus: this.paystatus,
                orderuid: orderuid
            };


            const receiverDataArray = Object.values(this.receiverData);
          
            const connection = mysql.createPool(db);

            await connection.query('INSERT INTO receivers (name, email, phone, address, postal) VALUES (?)',[receiverDataArray] );
            const [result] = await connection.query (`SELECT id FROM receivers where name = ? 
             AND email = ? AND phone = ? AND address = ? AND postal =?`, [this.receiverData.name, this.receiverData.email, this.receiverData.phone, this.receiverData.address, this.receiverData.postal]
             )

              await connection.query('INSERT INTO orders (userData, productData, date, status, orderuid, receiverid, paystatus) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [orderDocument.userData, orderDocument.productData, orderDocument.date, orderDocument.status, orderDocument.orderuid, result[0].id, orderDocument.paystatus]);

            return orderDocument;
        }

      }

      static async updatePayStatus(orderuid){
        const paidStatus ='已付款';
        const connection = mysql.createPool(db);
        await connection.query(`UPDATE orders SET paystatus = ? WHERE orderuid = ?`, [paidStatus, orderuid ])
      }
      


}

module.exports = Order;