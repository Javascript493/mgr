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

    const list = await Log.find({
        show: true,
    })
    // .sort({
    //     _id:-1
    // })
     .skip((page-1)*size)
     .limit(size)
     .exec();

    const total = await Log.countDocuments().exec();

    ctx.body ={
        code:1,
        data:{list,page,size,total},
        msg:'获取列表成功'

    }
});

router.post('/delete',async(ctx)=>{
    const { id } = ctx.request.body;

    const one = await Log.findOne({_id:id }).exec();
    if(!one){
        ctx.body = {
            code:0,
            data:{},
            msg:'删除成功'
        }
    }

    one.show = false;

    await one.save();

    ctx.body = {
        code : 1,
        msg:'删除成功',
    }
})

module.exports = router;