const express = require('express');
const login=express();
const login_controller=require('../controllers/login')
const post_msg=require('../controllers/post_msg')
const getFriendMsg=require('../controllers/getfriendmsg')
const getConvertation=require('../controllers/getconversation')
const add_friend=require('../controllers/add_friend');
login.post('/',login_controller);
login.post('/msg',post_msg)
login.post('/getFndMsg',getFriendMsg)
login.post('/convertation',getConvertation)
login.post('/addfriend',add_friend)
module.exports=login;
