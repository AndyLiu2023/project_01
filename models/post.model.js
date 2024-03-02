const mysql = require('mysql2/promise');
const db = require ('../data/database');


class Post {
    constructor(title, content, date){
        this.title = title,
        this.content = content,
        this.date = new Date(date).toLocaleDateString('zh-TW', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });

    }

  static async getposts(){

        const connection = mysql.createPool(db);
        const [result] = await connection.query('SELECT * FROM `posts`');

        connection.releaseConnection();

        const newResult = result.map((postdata) => ({
          ...postdata,
          date: postdata.date.toLocaleDateString('zh-TW', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
          })
        })).reverse();


    
        return [newResult];
       

  }

  async createpost(){
 
      const connection = mysql.createPool(db);
      await connection.query('INSERT INTO posts (title, content) VALUES(?, ?)', [this.title, this.content]);
      connection.releaseConnection();
  }

static async findPostById(postId){

  const connection = mysql.createPool(db);
  const [result]  = await connection.query('SELECT * FROM posts where id = ?', [postId]);
  connection.releaseConnection();
  const newResult = result.map((postdata) => ({
    ...postdata,
    date: postdata.date.toLocaleDateString('zh-TW', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }));  
  return [newResult[0]];

}


 async updatePost(postId){

  const connection = mysql.createPool(db);
  await connection.query('UPDATE posts SET title = ?, content = ? WHERE id = ?', [this.title, this.content, postId]);
  connection.releaseConnection();

}

static async deletepost(postId){
  const connection = mysql.createPool(db);
  await connection.query('DELETE FROM posts WHERE id = ?', [postId]);
  connection.releaseConnection();
}


    
}

module.exports = Post;