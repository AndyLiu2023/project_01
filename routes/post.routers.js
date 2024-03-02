const express =require('express');
const router = express.Router();
const postctrl= require('../controllers/post.controller');



// router.get('/posts', postctrl.getallpost);
// router.post('/newposts', postctrl.createPosts);

// router.get('/posts/:id/detail', postctrl.getPostDetail);
// router.get('/posts/:id/edit', postctrl.getPostDetailToUpdate);

// router.post('/posts/:id/edit', postctrl.updatePost);
// router.post('/posts/:id/delete', postctrl.deletePost);



router.get('/latestnews', postctrl.getallpostForCustomer);

module.exports = router;