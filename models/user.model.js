const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const db = require ('../data/database');


class User  {
    constructor(username, email, password){
        this.username = username;
        this.email = email;
        this.password = password;
        // this.city = city;
        // this.street = street;
        // this.postal = postal;
    }

static async findById(userId){
    const connection = mysql.createPool(db);
    const [result] = await connection.query('SELECT * FROM users WHERE id = ?', [userId]);
    return [result];

}

   async signup(){

        const hasedPassword = await bcrypt.hash(this.password, 10);


        const connection = mysql.createPool(db);
        // await connection.query('INSERT INTO address (city, street, postal) VALUES (?)', [addressData]);
        // const result = await connection.query(`SELECT id FROM address where city = ? 
        // AND street = ? AND postal = ?`, [this.city, this.street, this.postal]);
        await connection.query('INSERT INTO users (name, email, password, isadmin) VALUES (?, ?, ?, ?)', [this.username, this.email, hasedPassword, 0]);
       
        
        
    
    }

    matchingPassword(hasedPassword){
       return bcrypt.compare(this.password, hasedPassword)
    }


     async getUserWithSameEmail(){
        const connection = mysql.createPool(db);
        try{
             const results =  await connection.query(`SELECT * FROM users WHERE email = ?`, [this.email])
            const resultsar = results[0][0];
             if(resultsar){
                console.log('Same Email Found!');
                return resultsar;
             }else{
                console.log('No Same Email!');
                return false;
             }
        
        }catch(err){
            console.log(err);
        }
        
        
       
    }


 

    async existAlready(){
        const existingUser = await this.getUserWithSameEmail();
        if(existingUser){

            return true;
        }

        return false;

    }


    // static async saveReceiver(){

    //     const receiverData = [
    //         this.name,
    //         this.email,
    //         this.phone,
    //         this.address,
    //         this.postal

    //     ]


    //     const connection = mysql.createPool(db);

    //     try {
    //         await connection.query('INSERT INTO receivers (name, email, phone, address, postal) VALUES (?)',[receiverData] );
    //         const [result] = await connection.query (`SELECT id FROM receivers where name = ? 
    //          AND email = ? AND phone = ? AND address = ? AND postal =?`, [this.name, this.email, this.phone, this.address, this.postal]
    //          )
    //     } catch (error) {
            
    //     }
    // }



}



module.exports = User;