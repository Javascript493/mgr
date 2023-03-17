const koa = require('koa');
const koaBody = require('koa-body');
// const Body = require('koa-body')
const { connect } = require('./db')
//这里^ v 的代码顺序不能乱 因为要先注册UserSchema 然后 在去引用它 这样的逻辑
const registerRouter = require('./routers')
const koaStatic = require('koa-static')
const cors = require('@koa/cors')
const { middleware :koaJwtMiddleware ,catchTokenError,checkUser} = require('./helpers/token')
const { logMiddleware} =require('./helpers/log')
const path = require('path')
const app = new koa();

app.use(koaStatic(path.resolve(__dirname,'../public')));
//先让数据库连接好
connect().then(() => {
    //处理跨域
    app.use(cors());
    //处理请求体
    app.use(koaBody({
        multipart:true,
        formidable:{
            maxFileSize:200*1024*1024,
        }
    }));
    app.use(catchTokenError);
    koaJwtMiddleware(app);

    app.use(checkUser);

    app.use(logMiddleware);
    //注册路由
    registerRouter(app);

    //开启一个http服务
    //接收http请求 并做处理 然后响应
    //这里是异步操作 先连端口再监听
    app.listen(3001, () => {
        console.log('启动成功')
    });
})



