const Router = require('@koa/router');
const mongoose = require('mongoose')
// const { getBody } = require('../../helpers/utils')
//拿到Schema下注册的User这个model
const InviteCode = mongoose.model('InviteCode')
//这里使用uuid来生成唯一的id
const { v4: uuidv4}  = require('uuid')




//表示当前的路由实例全部是处理auth相关请求的
const router = new Router({
    prefix: '/invite'
});

router.post('/add',async(ctx)=>{
    const { count=1 } = ctx.request.body;

    const arr =[];
    for(let i =0; i<count; i++){
        arr.push({
        code:uuidv4(),
        user:'',})
    }

    const res = await InviteCode.insertMany(arr);
    //等待创建完成后会返回信息
    ctx.body={
        code:1,
        data:res,
        msg:'创建成功',
    }
});

router.get('/list',async(ctx)=>{
    let {page ,size} = ctx.request.query;
    page = Number(page);
    size = Number(size);

    const list = await InviteCode
    .find()
    .sort({
        _id:-1
    })
    .skip((page-1)*size)
    .limit(size)
    .exec();

    const total = await InviteCode.countDocuments();

    ctx.body={
        code:1,
        data:{
            list,
            total,
            page,
            size,
        },
        msg:'获取成功'
    }
});

router.delete('/:id',async(ctx)=>{
    const { id } = ctx.params;

    const res = await InviteCode.deleteOne({_id:id });

    ctx.body={
        code:1,
        data:res,
        msg:'删除成功'
    }

})

module.exports = router;