const express = require('express');
const mongoose = require('mongoose');
const signup_details=require('../models/signup_model');
const signUp=express();

let u_id="";
let ps_wd="";
let name="";

mongoose.connect(process.env.MDB_URL);



signUp.post('/',(req,resp)=>{
     u_id=req.body.u_id;
     ps_wd=req.body.ps_wd;
     name=req.body.name;
     mdb();
     async function mdb(){
        if(await signup_details.findOne({u_id:u_id})==null && await signup_details.findOne({ps_wd:ps_wd})==null){
        await signup_details.create({u_id:u_id,ps_wd:ps_wd,name:name});
        console.log("signed up")
        resp.json({signedup:true});
        }
        else{
            console.log("failed to sign up")
            resp.json({signedup:false})
        }
        }
   
})
module.exports=signUp
