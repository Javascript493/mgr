const koa=require('koa');

const app=new koa();

//通过app.use注册一个中间件
//中间件本质上 就是一个函数
//context上下文  当前请求的相关信息都在里面
app.use((context)=>{
    //对象的解构赋值 冒号是对解构出的变量进行重新命名
    const { request:req={} }=context;
    const {url} =req;

    //路由 
    if (url=='/user'){
        context.response.body='<h1>哈哈哈哈<h1>';

    }else{
        context.body='???'
    }
})

app.listen(3000,()=>{
    console.log('启动成功')
});

//