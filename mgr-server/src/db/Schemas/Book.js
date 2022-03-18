const mongoose =require('mongoose');
const { getMate } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const BookSchema =new mongoose.Schema({

    //材料名
    name:String,
    //价格
    price:Number,
    //操作者
    author:String,
    //生产日期
    publishDate:String,
    //分类
    classify:String,
    //库存
    count:Number,

    meta:getMate(),

});

//-----注册Schema-------
mongoose.model('Book',BookSchema);
