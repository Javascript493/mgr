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

router.get('/add',async(ctx)=>{
    const code = new InviteCode({
        code:uuidv4(),
        user:'',
        
    });
    //等待创建完成后会返回信息
    const saved= await code.save();

    ctx.body={
        code:1,
        data:saved,
        msg:'创建成功',
    }
});

module.exports = router;