const TOKEN_STORAGE_KEY = '_tt'

//每次用户请求 都会调用此方法 在请求头设置token
export const getToken =()=>{
    return localStorage.getItem(TOKEN_STORAGE_KEY) || ''
}

//用户登录时，会调用此方法来存入本地
export const setToken =(token)=>{
    localStorage.setItem(TOKEN_STORAGE_KEY,token);
    return token;
}