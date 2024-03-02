const fs = require('fs');



function deletePreImg(imageFile){
    if(!imageFile){
      return;
    }

   fs.unlink( `./assets/product-images/${imageFile}`, (err) => {
    if (err) throw err;
    console.log(`${imageFile} was deleted`);
  }); 

}




module.exports = {
    deletePreImg: deletePreImg,

}