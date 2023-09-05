const express = require('express');

const app=express();
const cors=require('cors')
const dotenv = require('dotenv').config();
const port=process.env.PORT || 4000;
const signUp = require('./routes/sign up');
const login=require('./routes/login');
app.use(cors())
app.use(express.json());
app.use('/signup',signUp);
app.use('/login',login);
app.listen(port,()=>{
    console.log("server started")
})