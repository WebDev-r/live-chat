const mongoose = require('mongoose');
const server=require('../models/signup_model');
const conversation=require('../models/msg');
mongoose.connect(process.env.MDB_URL);
async function getconversation(req,resp){
    const u_id=req.body.u_id;
    const password=req.body.ps_wd;
    const friend_uid=req.body.friend_uid;
    const user_acc=await server.findOne({u_id:u_id});
    if(user_acc.u_id==u_id){
        if(user_acc.ps_wd==password){
           var friend_index=-1;
           for(i=0;i<user_acc.friends.length;i++){
            if(user_acc.friends[i].friend.uid==friend_uid){
                friend_index=i;
                break;
            }
           }
           const conversation_id=user_acc.friends[friend_index].friend.id;
           const conversation_info=await conversation.findOne({_id:conversation_id})
           resp.json({chat:conversation_info.chat})
        }
        else{resp.json({status:"wrong password"})}
    }else{resp.json({status:"invalid user id"})}
}
module.exports=getconversation;