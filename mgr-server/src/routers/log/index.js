const Router = require('@koa/router');
const mongoose = require('mongoose');



const Log = mongoose.model('Log')





//表示当前的路由实例全部是处理auth相关请求的
const router = new Router({
    prefix: '/log'
});

router.get('/list',async(ctx)=>{
    let {page,size} = ctx.query;
    page = Number(page);
    size = Number(size);

    const list = await Log.find()
     .skip((page-1)*size)
     .limit(size)
     .exec();

    const total = await Log.countDocuments().exec();

    ctx.body ={
        code:1,
        data:{list,page,size,total},
        msg:'获取列表成功'

    }
})

module.exports = router;