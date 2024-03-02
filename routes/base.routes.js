const express =require('express');
const router = express.Router();

const postctrl= require('../controllers/post.controller');



// router.get('/', function(req, res){
    
 
//     res.render('./home');

// })


router.get('/', postctrl.getallpostForHomepage)

router.get('/about', function(req, res){  res.render('./about')});

router.get('/timetable', function(req, res){  res.render('./timetable')});

router.get('/trafficguide', function(req, res){  res.render('./trafficguide')});

router.get('/QA', function(req, res){  res.render('./QA')});

router.get('/ticket', function(req, res){  res.render('./ticketinfo')});



module.exports = router;