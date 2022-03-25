const mongoose =require('mongoose');
const { getMeta, preSave } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const CharacterSchema =new mongoose.Schema({
    //标记 是 member 还是 admin
    name:String,
    //用来展示的文案  成员和管理员
    title:String,
    //权限
    power:Object,
    meta:getMeta(),

});
CharacterSchema.pre('save',preSave)
//-----注册UserSchema-------
//定义一个模型 名字叫User 传入UserSchema
mongoose.model('Character',CharacterSchema);
