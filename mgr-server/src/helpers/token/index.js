const jwt = require('jsonwebtoken');
const config = require('../../project.config')


const getToken = (ctx)=>{
    let { authorization } = ctx.header;

    return authorization.replace('Bearer ','').replace('bearer ','');
}

const verify = (token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token, config.JWT_SECRET, (err,payload)=>{
            if(err){
                reject(err);
                return;
            }
            //返回解析后的结果
            resolve(payload);
        });
    })
}

module.exports = {
    verify,
    getToken
}