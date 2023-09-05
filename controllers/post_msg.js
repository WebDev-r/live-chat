const mongoose = require('mongoose');
const details=require('../models/signup_model')
const conversation=require('../models/msg');
mongoose.connect(process.env.MDB_URL);
const date=new Date();
async function post_msg(req,resp){
      const u_id=req.body.u_id;
      const password=req.body.ps_wd;
      const to=req.body.to;
      user_acc=await details.findOne({u_id:u_id,ps_wd:password})
      if(user_acc!=null){
        var friend_index=-1;
             for(i=0;i<user_acc.friends.length;i++){
              if(user_acc.friends[i].friend.uid==to){
                friend_index=i;
                break;
              }
             }
             if(friend_index!=-1){
              await conversation.updateOne({_id:user_acc.friends[friend_index].friend.id},{"$push":
              {chat:{
                  chat:req.body.msg,
                  year:req.body.time.year,
                  month:req.body.time.month,
                  date:req.body.time.date,
                  hours:req.body.time.hours,
                  min:req.body.time.min,
                  sec:req.body.time.sec,
                  from:u_id
      }}})
      resp.json({status:"msg sent"})
             }else{resp.json({msg:"not sent",error:"not yor friend"})}         
      }else{resp.json({status:"invalid user"})}
     
}

module.exports=post_msg;