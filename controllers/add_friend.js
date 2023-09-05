const mongoose = require('mongoose');
const login_details=require('../models/signup_model');
const conversation=require('../models/msg');
mongoose.connect(process.env.MDB_URL);
async function add_friend(req,resp){
    const u_id=req.body.u_id;
    const ps_wd=req.body.ps_wd;
    const friend=req.body.friend;
    const user_acc=await login_details.findOne({u_id:u_id});
    if(user_acc!=null){
           if(ps_wd==user_acc.ps_wd){
              var friend_index=-1;
              for(let i=0;i<user_acc.friends.length;i++){
                if(user_acc.friends[i].friend.uid==friend){
                    friend_index=i;
                    break;
                }
              }
              if(friend_index==-1){
                  
                        const friend_acc=await login_details.findOne({u_id:friend})
                         friend_index=-1;
                        for(let i=0;i<friend_acc.friends.length;i++){
                          if(friend_acc.friends[i].friend.uid==u_id){
                              friend_index=i;
                              break;
                          }
                        }
                        if(friend_index==-1){
                        await conversation.create({conversation_uid:{p1:friend,p2:u_id},chat:[]});
                        console.log("conversation created")
                        const id=  await conversation.findOne({conversation_uid:{p1:friend,p2:u_id}});
                        console.log(id._id);
                        await login_details.updateOne({u_id:u_id},{"$push":{friends:{friend:{uid:friend,id:id._id}}}});
                        resp.json({msg:true,status:"requested"});
                        }
                        else{
                            const id=friend_acc.friends[friend_index].friend.id;
                          
                            await login_details.updateOne({u_id:u_id},{"$push":{friends:{friend:{uid:friend,id:id}}}});
                            resp.json({msg:"accepted"})
                        }
              }
              else{resp.send({msg:"alrady added to your friend list"})}
           }
           else{resp.json({msg:"wrong password"})}
    }
    else{resp.json({msg:"invalid user id"})};
}
module.exports=add_friend;