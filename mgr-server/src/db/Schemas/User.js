const mongoose =require('mongoose');
const { getMeta, preSave } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const UserSchema =new mongoose.Schema({

    account:String,
    password:String,
    meta:getMeta(),

});
UserSchema.pre('save',preSave)
//-----注册UserSchema-------
//定义一个模型 名字叫User 传入UserSchema
mongoose.model('User',UserSchema);
