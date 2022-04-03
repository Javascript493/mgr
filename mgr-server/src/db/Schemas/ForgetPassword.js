const mongoose =require('mongoose');
const { getMeta, preSave } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const ForgetPasswordSchema =new mongoose.Schema({
    account :String,

    status:Number, //1 已处理，2已重置，3已忽略

    meta:getMeta(),

});

ForgetPasswordSchema.pre('save',preSave)
//-----注册UserSchema-------
//定义一个模型 名字叫User 传入UserSchema
mongoose.model('ForgetPassword',ForgetPasswordSchema);
