const mongoose = require('mongoose');
const model={u_id:{
             type:String,
             required:true,
             unique:true
                  },
            ps_wd:{
             type:String,
             required:true,
             unique:true
                },
                name:{type:String}, 
            friends:[{friend:{uid:{type:String,required:true},id:{type:String,required:true}}}]
             }
const schema=new mongoose.Schema(model);
const signup_details=mongoose.model('details',schema);
module.exports=signup_details;