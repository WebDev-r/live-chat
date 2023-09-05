const mongoose = require('mongoose');
const signup_details=require('../models/signup_model');
mongoose.connect(process.env.MDB_URL);
async function login_controller(req,resp){
       let u_id=req.body.u_id;
       let ps_wd=req.body.ps_wd;
       if(await signup_details.findOne({u_id:u_id})!=null){
        const password=await signup_details.findOne({u_id:u_id})
              if(password.ps_wd==ps_wd){
                console.log(`${u_id} loggedin sucessfully`)
                resp.json({loggedin:true});
              }
              else{resp.json({loggedin:false,error:"wrong password"});}
       }
       else{resp.json({loggedin:false,error:"invalid user id"})}
}
module.exports=login_controller;