const mysql = require('mysql2/promise');
const db = require ('../data/database');
const uuid = require('uuid');

class Product{
    constructor(productdata, sizes, colors){
        this.name = productdata.name,
        this.description = productdata.description,
        this.price = +productdata.price,
        this.image = productdata.image,
        this.imagePath = `assets/product-images/${this.image}`,
        this.imageUrl = `/product-data/product-images/${this.image}`,
        this.category = productdata.category,
        this.sizes = sizes,
        this.colors = colors,
        this.uid = productdata.uid 

        
    }


static async getproductcatogory(){
    const connection = mysql.createPool(db);    
    const [result] = await connection.query('SELECT * FROM categories');
    return [result];

}





async saveProduct(){

    const connection = mysql.createPool(db);
    const sizes = this.sizes;
    const colors = this.colors;
    const category = this.category;
    const [categoryCustomNum] = await connection.query(`SELECT custom_number FROM categories where category_name = ?`, [category])
    
    if(this.uid){

        await connection.query(`UPDATE products, sizes, colors
        SET products.name = ?, products.description = ?, products.price = ?, products.category_id = ?, products.image =?,
        sizes.size_1 = ?, sizes.size_2 = ?, sizes.size_3 = ?, sizes.size_4 = ?, sizes.size_5 = ?,
        colors.color_1 =?, colors.color_2 =?, colors.color_3 =?, colors.color_4 =?, colors.color_5 =?
        WHERE products.color_id = colors.id AND products.size_id = sizes.id AND products.uid = ? `, 
        [this.name, this.description, this.price, categoryCustomNum[0].custom_number, this.image, 
        sizes[0], sizes[1], sizes[2],sizes[3],sizes[4], 
        colors[0], colors[1], colors[2],colors[3],colors[4], 
        this.uid ]);


    }else{

        const uid = uuid.v4();
        
    
        await connection.query('INSERT INTO sizes (size_1, size_2, size_3, size_4, size_5) VALUES (?, ?, ?, ?, ?)', [sizes[0], sizes[1], sizes[2],sizes[3],sizes[4]]);
        await connection.query('INSERT INTO colors (color_1, color_2, color_3, color_4, color_5) VALUES (? ,? ,? ,? ,?)', [colors[0], colors[1], colors[2],colors[3],colors[4]]);
    
        const [sizesId] =  await connection.query(`SELECT id FROM sizes where size_1 = ? 
        AND size_2 = ? AND size_3 = ? AND size_4=? AND size_5 =?`, [sizes[0], sizes[1], sizes[2],sizes[3],sizes[4]]);
        let sizesIdArray = sizesId.map((i) => i.id );
        const sizesMaxId = Math.max(...sizesIdArray);
      
        const [colorId] =  await connection.query(`SELECT id FROM colors where color_1 = ? 
        AND color_2 = ? AND color_3 = ? AND color_4=? AND color_5 =?`, [colors[0], colors[1], colors[2],colors[3],colors[4]]);
        let colorIdArray = colorId.map((i) => i.id );
        const colorMaxId = Math.max(...colorIdArray);
        
        await connection.query('INSERT INTO products (name, description, price, category_id, image, size_id, color_id, uid ) VALUES (?, ?, ?, ?, ?,?, ?, ?)', [this.name, this.description, this.price, categoryCustomNum[0].custom_number, this.image, sizesMaxId, colorMaxId, uid]);

    }







}

static async getproductinfo(){

    const connection = mysql.createPool(db);
    const [result] = await connection.query('SELECT * FROM products JOIN categories ON products.category_id = categories.custom_number JOIN sizes ON products.size_id = sizes.id JOIN colors ON products.color_id = colors.id');
    return [result];


}


static async getGroupOfProductInfo(category){

    const connection = mysql.createPool(db);
    const [result] = await connection.query('SELECT * FROM products JOIN categories ON products.category_id = categories.custom_number JOIN sizes ON products.size_id = sizes.id JOIN colors ON products.color_id = colors.id WHERE custom_number = ?', [category]);
    return [result];

}


static async getSingleProductInfo(productUid){

    const connection = mysql.createPool(db);
    const [result] = await connection.query('SELECT * FROM products JOIN categories ON products.category_id = categories.custom_number JOIN sizes ON products.size_id = sizes.id JOIN colors ON products.color_id = colors.id where uid = ?', [productUid] );

    return [result];


}

static async searchProduct(searchText){
    
    const connection = mysql.createPool(db);
    const [result] = await connection.query('SELECT * FROM products WHERE name LIKE ?', [`%${searchText}%`]);
    return [result]

}

static async deleteProduct(productUid){
    const connection = mysql.createPool(db);
    await connection.query('DELETE FROM products WHERE uid = ?', [productUid]);

}


static async findMultiple(ids){

    const connection = mysql.createPool(db);

    const products = await connection.query(`SELECT * FROM products WHERE uid IN (?)`, [ids]);

    
    return products[0].map(function(productDocument){
        return new Product(productDocument);
    })


}



}

module.exports = Product;