const mongoose =require('mongoose');
const { preSave, getMeta } =require('../helper')

//schema是映射到数据库的文档应该有什么数据
const LogResponseSchema =new mongoose.Schema({
    logId :String,
    data: String,
    
    meta:getMeta(),
});
LogResponseSchema.pre('save',preSave)

mongoose.model('LogResponse',LogResponseSchema);
