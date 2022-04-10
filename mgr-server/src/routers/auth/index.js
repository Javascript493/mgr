const Router = require('@koa/router');
const mongoose = require('mongoose')
const { getBody } = require('../../helpers/utils')
//拿到Schema下注册的User这个model
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const InviteCode =mongoose.model('InviteCode')
const config = require('../../project.config')
const {verify } = require('../../helpers/token')

//表示当前的路由实例全部是处理auth相关请求的
const router = new Router({
    prefix: '/auth'
});


//接收register请求
router.post('/register', async (ctx) => {
    //将请求数据中的 account和password 解构取出 
    const { account, password,inviteCode, } = getBody(ctx);
    // console.log(ctx.request.body);
    

    //表单校验
    if(account === '' || password === '' || inviteCode===''){
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null
        }
        return;
    }

    //寻找有没有邀请码
    const findCode = await InviteCode.findOne({
        code: inviteCode
    }).exec();
    
    if(!findCode || findCode.user){
        ctx.body = {
            code: 0,
            msg: '邀请码不正确',
            data: null
        }
        return;
    }

    //查寻传上来的account是否和自己库里的account一样
    const findUser = await User.findOne({
        account
    }).exec();

    if (findUser ) {
        //已经有用户注册过
        ctx.body = {
            code: 0,
            msg: '已存在该用户',
            data: null
        }
        return;
    }

    //验证通过后 去创建一个用户
    const user = new User({
        account,
        password,
    });

    //把创建的用户同步到Mongodb
    const res = await user.save();

    //将找到的验证码的user值改为 该用户的id
    finCode.user = res._id;
    finCode.meta.updateAt = new Date().getTime();
    await finCode.save();

    //响应成功
    ctx.body = {
        code: 1,
        msg: '注册成功',
        data: res
    }
});

router.post('/login', async (ctx) => {
    
    const { account, password } = getBody(ctx);

    if(account === '' || password === ''){
        ctx.body = {
            code: 0,
            msg: '字段不能为空',
            data: null
        }
        return;
    }

    //在数据库中通过account查找该用户 返回一致的account信息
    //返回的是个promise 记得await一下 等它找完
    const one = await User.findOne({
        account,
    }).exec();

    // console.log(account, password);
    
    if (!one) {
        //设置响应体
        ctx.body = {
            code: 0,
            msg: '用户名或者密码错误',
            data: null
        }
        return;
    };

    const user = {
        account: one.account,
        //这个_id是mongodb自己生成的
        id: one._id,
        character:one.character,

    };
    if (one.password === password) {
        ctx.body = {
            code: 1,
            msg: '登入成功',
            data: {
                user: user,
                token: jwt.sign( user, config.JWT_SECRET),
            }
        }
        return;
    };
    //数据库中找不到用户或者密码不匹配 就登录失败
    ctx.body = {
        code: 0,
        msg: '用户名或者密码错误',
        data: null
    };
});


module.exports = router;