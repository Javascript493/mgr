const auth =require('./auth');
const inviteCode =require('./invite-code')
const book = require('./book')
//注册路由
module.exports=(app)=>{
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
};  
