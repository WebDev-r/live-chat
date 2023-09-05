const mongoose = require('mongoose');
const chatschema=new mongoose.Schema({chat:{type:String,required:true},
    year:{type:Number,required:true},
    month:{type:Number,required:true},
    day:{type:String,required:true},
    hours:{type:Number,required:true},
    min:{type:Number,required:true},
    sec:{type:Number,required:true},
    from:{type:String,required:true}})
    const model={conversation_uid:{p1:{type:String,required:true},p2:{type:String,required:true}},
                 chat:[chatschema]};
const schema=new mongoose.Schema(model);
const conversation=mongoose.model('conversation',schema);
module.exports=conversation;