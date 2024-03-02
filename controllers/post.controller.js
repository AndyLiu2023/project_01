const Post = require('../models/post.model');

const mysql = require('mysql2/promise');
const db = require ('../data/database');
const moment = require('moment');


const { csrfSync } = require("csrf-sync");

const {
    invalidCsrfTokenError, 
    generateToken, 
    getTokenFromRequest, 
    getTokenFromState, 
    storeTokenInState, 
    revokeToken, 
    csrfSynchronisedProtection, 
} = csrfSync();


 async function getallpost(req, res, next){


    try{
        const [posts] =  await Post.getposts();


        res.render('./admin/post-list', {posts: posts});
    }catch(error){
        console.log('error');
        next(error);
    }
    
    
    
}

async function createPosts(req, res, next){
    const posts = new Post(
        req.body.title,
        req.body.content
    )
        try{
            await posts.createpost();
            res.redirect('/admin/posts');
        }catch(error){
            next(error);
            return;
        }
        
}


async function getPostDetail(req, res, next){

    try {
        const [postDetail] = await Post.findPostById(req.params.id);
        res.render('./admin/post-detail', {posts: postDetail});
    }catch(error){
        next(error);
        return;
    }
    
}

async function getPostDetailToUpdate(req, res, next){

    try {
        const [postDetail] = await Post.findPostById(req.params.id);
        res.render('./admin/post-update', {posts: postDetail});
    }catch(error){
        next(error);
        return;
    }
    
}

async function updatePost(req, res, next){
    const postdata = new Post(
        req.body.title,
        req.body.content,
    )

    try{
         await postdata.updatePost(req.params.id);
         res.redirect('./detail');

    }catch(error){
        next(error);
        return;
    }
    
    

}

async function deletePost(req, res, next){
    try{    

        await Post.deletepost(req.params.id);
        res.redirect('/admin/posts');

        }catch(error){
        next(error);
        return;
        }
    
}


//一般使用者

async function getallpostForCustomer(req, res, next){



    try{
        const [posts] =  await Post.getposts();


        res.render('./customer/post-list', {posts: posts});
    }catch(error){
        console.log('error');
        next(error);
    }
    
}

async function getallpostForHomepage(req, res, next){


    try{
        const [posts] =  await Post.getposts();

        res.render('./home',{posts: posts});
    }catch(error){
        console.log('error');
        next(error);
    }
    
}

module.exports = {
    getallpost: getallpost,
    createPosts: createPosts,
    getPostDetail: getPostDetail,
    getPostDetailToUpdate: getPostDetailToUpdate,
    updatePost: updatePost,
    deletePost: deletePost,
    getallpostForCustomer: getallpostForCustomer,
    getallpostForHomepage: getallpostForHomepage

}