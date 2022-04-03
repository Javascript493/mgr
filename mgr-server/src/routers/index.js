const auth =require('./auth');
const inviteCode =require('./invite-code')
const book = require('./book')
const inventoryLog = require('./Inventory-log')
const user = require('./user')
const character = require('./character')
const log =require('./log')
const forgetPassword = require('./forget-password')
const classify = require('./classify')
//注册路由
module.exports=(app)=>{
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(book.routes());
    app.use(inventoryLog.routes());
    app.use(user.routes());
    app.use(character.routes());
    app.use(log.routes());
    app.use(forgetPassword.routes());
    app.use(classify.routes());
    
};  
