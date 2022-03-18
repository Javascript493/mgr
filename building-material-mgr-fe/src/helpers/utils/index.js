import { message } from 'ant-design-vue'

//表单验证模块
export const result = (response, authShowErrorMsg= true)=>{
    const { data }=  response;
    if(data.code === 0 && authShowErrorMsg){
        message.error(data.msg);
    }
    return {
        //注意这里返回的函数的参数是一个函数
        success(cb){
            if(data.code!== 0){
                //并会将data和res传入这个函数
                cb(data,response);
            }
            return this;
        },  
        fail(cb){
            if(data.code=== 0){
                cb(data,response);
            }
            return this;

        },
        finally(cb){
            cb(data,response);
            return this;

        }
    }
}

export const  clone = (obj)=>{
    return JSON.parse(JSON.stringify(obj));
}

export const formatTimeStamp = (ts)=>{
    const date = new Date(Number(ts));
    const YYYY = date.getFullYear();
    const MM = date.getMonth()+1;
    const DD = date.getDate();
    
    const hh = date.getHours();
    const mm = date.getMinutes();
    const ss = date.getSeconds();

    return `${YYYY}/${MM}/${DD}--${hh}:${mm}:${ss}`
}