const Router = require('@koa/router');
const mongoose = require('mongoose')
// const { getBody } = require('../../helpers/utils');
// const { route } = require('../book');
//拿到Schema下注册的User这个model
const Book = mongoose.model('Book')

const InventoryLog =mongoose.model('InventoryLog')

const router = new Router({
    prefix:'/inventory-log',
});

router.get('/list',async(ctx)=>{
    const { type } = ctx.query;
    let {size,page} = ctx.query;
    size = Number(size);
    page = Number(page);

    //例如 我们要拿第三页的数据 拿10条
    //那么就要跳过数据库的前20条数据 拿十条
    const list = await InventoryLog.find({
        type,
    })
    .sort({
        _id:-1
    })
    .skip((page-1)*size).limit(size).exec();

    const total = await InventoryLog.find({
        type,
    }).countDocuments().exec();
    ctx.body={
        data:{
            total,
            list,
            page,
            size
        },
        code:1,
        msg:'获取列表成功'
    }
})

module.exports = router;