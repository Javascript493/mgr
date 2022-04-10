const Router = require('@koa/router');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { saveFileToDisk,getUploadFileExt } = require('../../helpers/upload')
const config = require('../../helpers/upload');
const { UPLOAD_DIR } = require('../../project.config');
const path = require('path')
const { v4: uuidv4}  = require('uuid')


//表示当前的路由实例全部是处理auth相关请求的
const router = new Router({
    prefix: '/upload'
});

router.post('/file',async(ctx)=>{
    //获取文件后缀
    const ext = getUploadFileExt(ctx);
    //随机文件名拼接文件后缀
    const filename = `${uuidv4()}.${ext}`;
    //在helper中封装的文件读写流方法，将文件存入本地
    await saveFileToDisk(ctx,path.resolve(UPLOAD_DIR,filename));

    ctx.body ={
        data:filename,
        code:1,
        msg:''
    }
})



module.exports = router;