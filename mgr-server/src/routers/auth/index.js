const Router = require('@koa/router');
const mongoose = require('mongoose')

//拿到Schema下注册的User这个model
const User = mongoose.model('User')
//表示当前的路由实例全部是处理auth相关请求的
const router = new Router({
    prefix: '/auth'
});


//接收register请求
router.post('/register', async (ctx) => {
    //将请求数据中的 account和password 解构取出 
    const {account , password } = ctx.request.body
    console.log(ctx.request.body);
    //
    const user = new User({
        account,
        password
    });

    //查寻传上来的account是否和自己库里的account一样
    const one =await User.findOne({
        account
    }).exec();

    if(one){
        //已经有用户注册过
        ctx.body = {
            code: 0,
            msg: '已存在该用户',
            data: null
        }
        return;
    }

    const res = await user.save();
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res
    }
});

router.post('/login', async (ctx) => {
    ctx.body = '登入成功'
});

module.exports = router;