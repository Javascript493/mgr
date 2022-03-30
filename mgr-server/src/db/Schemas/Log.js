const mongoose =require('mongoose');
const { getMeta, preSave } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const LogSchema =new mongoose.Schema({
    user:{
        account: String,
        id:String,
    },

    request:{
        method:String,
        url:String,
        body:String,
    },
    
    meta:getMeta(),

});
LogSchema.pre('save',preSave)
//-----注册UserSchema-------
//定义一个模型 名字叫User 传入UserSchema
mongoose.model('Log',LogSchema);
