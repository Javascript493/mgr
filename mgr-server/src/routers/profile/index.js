const Router = require('@koa/router');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { verify , getToken } = require('../../helpers/token')

//表示当前的路由实例全部是处理auth相关请求的
const router = new Router({
    prefix: '/profile'
});

router.post('/update/password',async(ctx)=>{
    const { password , oldPassword } = ctx.request.body;

    const { id } = await verify(getToken(ctx));

    const user = await User.findOne({ _id: id}).exec();

    if(!user){
        ctx.body={
            code:0,
            msg:'用户不存在'
        }
        return;
    }

    if(user.password !== oldPassword){
        ctx.body ={
            code:0,
            msg:'密码校验失败',
        }
        return;
    }

    user.password = password;

    user.save();

    ctx.body={
        code:1,
        msg:'修改成功'
    }
    
});



module.exports = router;