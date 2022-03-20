//公共模块 用来导入创建和修改的时间信息
const getMeta =()=>{
    return  {
        createAt:{
            type:Number,
            default: (new Date()).getTime(),
        },
        updateAt:{
            type:Number,
            default: (new Date()).getTime(),
        },
    }
};
const preSave=function(next){
    if(this.isNew){
        const ts = Date.now();
        this['meta'].createAt=ts;
        this['meta'].updateAt=ts;
        
    }else{
        this['meta'].updateAt=Date.now();
    }
    //事情做完了 可以继续后面的事情了
    next();
};
module.exports={
    getMeta,preSave
};