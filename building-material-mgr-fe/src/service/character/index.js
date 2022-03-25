//访问出入库相关的接口的方法list
import axios from "axios"
export const list = ()=>{
    return axios.get(
        'http://localhost:3000/character/list',
        
    );
}

