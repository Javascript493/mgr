const mongoose =require('mongoose');
const { getMate } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const UserSchema =new mongoose.Schema({

    account:String,
    password:String,
    meta:getMate(),

});

//-----注册UserSchema-------
//定义一个模型 名字叫User 传入UserSchema
mongoose.model('User',UserSchema);
