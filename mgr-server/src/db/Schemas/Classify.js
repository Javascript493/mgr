const mongoose =require('mongoose');
const { getMeta, preSave } =require('../helper')


const ClassifySchema =new mongoose.Schema({
    
    title:String,
    
    meta:getMeta(),

});
ClassifySchema.pre('save',preSave)

mongoose.model('Classify',ClassifySchema);
