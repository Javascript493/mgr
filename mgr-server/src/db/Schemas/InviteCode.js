const mongoose =require('mongoose');
const { getMate } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const InviteCodeSchema =new mongoose.Schema({
    //邀请码
    code:String,
    //用来注册哪个账户
    user:String,

    meta:getMate(),

});

//-----注册Schema-------
//定义一个模型 名字叫
mongoose.model('InviteCode',InviteCodeSchema);
