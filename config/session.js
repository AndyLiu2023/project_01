

const mysql = require('mysql2');
const session = require('express-session');

const MySQLstore = require('express-mysql-session')(session);

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

}

 function createSessionStore(){
    const connection = mysql.createPool(options);
    const sessionStore =  new MySQLstore({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SESSION_NAME,
        
    
    }, connection);
    
     sessionStore.close().then(() => {
        console.log('MysqlStore closed');
    }).catch(error => {
        console.error(error);
    });

    return sessionStore;
    

}



module.exports = createSessionStore;