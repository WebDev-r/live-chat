const mongoose = require('mongoose');
const server=require('../models/signup_model');
mongoose.connect(process.env.MDB_URL);
async function get_fnd_msg(req,resp){
    const u_id=req.body.u_id;
    const ps_wd=req.body.ps_wd;
    const account_details=await server.findOne({u_id:u_id});
    if(account_details!=null && account_details.ps_wd==ps_wd){
       const frinde_uid=req.body.fnd_uid;
      
       const fnd_acc_details=await server.findOne({u_id:frinde_uid})

       if(fnd_acc_details.frindes.indexOf(u_id)!=-1){
         resp.json(fnd_acc_details.chat[fnd_acc_details.chat.length-1]);
       }
       else{resp.json({error:"not in frind list"})};
    }
    else{resp.json({loggedin:'failed'})}
}
module.exports=get_fnd_msg;