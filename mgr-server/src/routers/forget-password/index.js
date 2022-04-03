const Router = require('@koa/router');
const mongoose = require('mongoose')
const User = mongoose.model('User')
const ForgetPassword = mongoose.model('ForgetPassword')
const config = require('../../project.config')


const router = new Router({
    prefix:'/forget-password',
});

router.get('/list',async(ctx)=>{
    let {
        page,
        size,
    } = ctx.request.query;
    page = Number(page);
    size = Number(size);

    const list = await ForgetPassword
    .find({ status:1 })
    .skip((page - 1)*size)
    .limit(size)
    .exec();

    const total = await ForgetPassword
    .find({ status:1 })
    .countDocuments()
    .exec();

    ctx.body = {
        code:1,
        data:{
            
            list,
            page,
            size,
            total,
            
        },
        msg:'获取列表成功'
    }
});

router.post('/add',async(ctx)=>{
    const {
        account
    }= ctx.request.body;

    //账户要存在，
    const user = await User.findOne({
        account,
    }).exec();
    
    if(!user){
        ctx.body ={
            code:1,
            msg:'申请成功啦'
        }
        return;
    }
    //并且在forget——password集合中不存在status为1的文档（已经申请过忘记密码了 不能重复申请）
    const one = await ForgetPassword.findOne({
        account,
        status:1,
    });

    if(one){
        ctx.body ={
            code:1,
            msg:'申请成功啦'
        }
        return;
    }

    //走到这里 说明条件合法 可以创建申请了
    const forgetPwd = new ForgetPassword({
        account,
        status:1,
    });

    await forgetPwd.save();
    ctx.body ={
        code:1,
        msg:'申请成功啦'
    }


});

//更新状态的接口
router.post('/update/status',async(ctx)=>{
    const {
        id,
        status,
    } = ctx.request.body;

    const one = await ForgetPassword.findOne({
        _id:id,
    }).exec();

    if(!one){
        ctx.body={
            code:0,
            msg:'找不到这条申请',
        }
        return;
    }

    one.status = status;

    if(status === 2 ){
        const user = await User.findOne({account:one.account}).exec();
        if(user){
            user.password = config.DEFAULT_PASSWORD;

            await user.save();
        }
    }
    await one.save();

    ctx.body = {
        code:1,
        msg:'处理成功'
    }
});

module.exports = router;