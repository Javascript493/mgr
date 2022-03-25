const Router = require('@koa/router');

const mongoose = require('mongoose');
const { getToken ,verify} = require('../../helpers/token');
const User = mongoose.model('User')
const Character = mongoose.model('Character')
const config = require('../../project.config')
const router = new Router({
    prefix:'/user',
});

router.get('/list',async(ctx)=>{
    let { page,size,keyword} = ctx.query;
    page=Number(page);
    size=Number(size);

    const query ={};
    //如果传入keyword表示这时是在按用户名查找用户，否则就是寻找全部用户
    if(keyword){
        query.account=keyword;
    }

    const list = await User.find(query)
    .sort({
        _id:-1,
    })
    .skip((page-1) * size)
    .limit(size)
    .exec();

    const total = await User.countDocuments().exec();
    ctx.body= {
        code:1,
        msg:'获取列表成功',
        data:{
            list,
            page,
            size,
            total
        },
        
    }
});

router.delete('/:id',async(ctx)=>{
    const { id } = ctx.params;

    const delMsg = await User.deleteOne({
        _id:id
    });

    ctx.body={
        code:1,
        data:delMsg,
        msg:'删除用户成功'
    }
});

router.post('/add',async(ctx)=>{
    const { account, password='123123' ,character} = ctx.request.body;

    const char = await Character.findOne({
        _id:character,
    });
    if(!char){
        ctx.body = {
            code:0,
            msg:'出错啦',
            data:null
        }
        return;
    }

    const user = new User({
        account,
        password:password || '123123',
        character,
    });

    

    const res = await user.save();

    ctx.body ={
        code:1,
        data:res,
        msg:'添加成功'
    }

});

router.post('/reset/password',async(ctx)=>{
    const { id } = ctx.request.body;
    const user = await User.findOne({ _id:id }).exec();

    if(!user){
        ctx.body={
            code:0,
            msg:'找不到该用户'
        }
        return;
    }

    user.password= config.DEFAULT_PASSWORD;

    const res = await user.save();
    ctx.body={
        code:1,
        data:{
            account:res.account,
            _id:res._id,
        },
        msg:'修改成功'
    }
});

router.post('/update/character',async (ctx)=>{
    const {character , userId} = ctx.request.body;
    //判断当前角色是否存在
    const char = await Character.findOne({
        _id:character,
    });
    if(!char){
        ctx.body = {
            code:0,
            msg:'出错啦',
            data:null
        }
        return;
    }
    //寻找当前要修改的角色的信息项
    const user = await User.findOne({
        _id:userId,
    });

    if(!user){
        ctx.body = {
            code:0,
            msg:'出错啦',
            data:null
        }
        return;
    }
    //通过校验后 把该用户的character更新为上传上来的character
    user.character = character;

    const res = await user.save();

    ctx.body = {
        code:1,
        data:res,
        msg:'修改成功'
    }

});

router.get('/info',async(ctx)=>{
    ctx.body = {
        //解析token
        code:1,
        msg:'获取成功',
        data:await verify(getToken(ctx)),
    }
});



module.exports = router;