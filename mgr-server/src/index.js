const koa = require('koa');
const koaBody = require('koa-body');
// const Body = require('koa-body')

const { connect } = require('./db')
//这里^ v 的代码顺序不能乱 因为要先注册UserSchema 然后 在去引用它 这样的逻辑
const registerRouter = require('./routers')
const cors = require('@koa/cors')

const app = new koa();

//先让数据库连接好
connect().then(() => {
    //处理跨域
    app.use(cors());
    //处理请求体
    app.use(koaBody());
    //注册路由
    registerRouter(app);

    //开启一个http服务
    //接收http请求 并做处理 然后响应
    //这里是异步操作 先连端口再监听
    app.listen(3000, () => {
        console.log('启动成功')
    });
})



