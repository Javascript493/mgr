const mongoose =require('mongoose');
const { getMeta ,preSave} =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const InventoryLogSchema =new mongoose.Schema({
    //出库or入库
    type:String,
    //出入库的数量
    num:Number,
    //谁操作的
    user:String,
    meta:getMeta(),

});
//钩子 设置在保存之前要做什么事情 就是去更新这个meta时间 但是在当前schema有效
InventoryLogSchema.pre('save',preSave);
//-----注册UserSchema-------
//定义一个模型 名字叫User 传入UserSchema
mongoose.model('InventoryLog',InventoryLogSchema);
