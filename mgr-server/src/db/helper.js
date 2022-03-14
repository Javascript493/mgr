//公共模块 用来导入创建和修改的时间信息
const getMate =()=>{
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

module.exports={
    getMate,
};