const auth =require('./auth/index')
//注册路由
module.exports=(app)=>{
    app.use(auth.routes());
};  