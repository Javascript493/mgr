//获取请求体的数据 
const getBody = (ctx)=>{
    return ctx.request.body || {} ;
}

module.exports= {
    getBody
}