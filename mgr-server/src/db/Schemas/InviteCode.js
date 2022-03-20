const mongoose =require('mongoose');
const { getMeta, preSave } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const InviteCodeSchema =new mongoose.Schema({
    //邀请码
    code:String,
    //用来注册哪个账户
    user:String,

    meta:getMeta(),

});
//钩子 设置在保存之前要做什么事情 就是去更新这个meta时间 但是在当前schema有效
InviteCodeSchema.pre('save',preSave);
//-----注册Schema-------
//定义一个模型 名字叫
mongoose.model('InviteCode',InviteCodeSchema);
