import {del ,get ,post} from '@/helpers/request';


export const add =(title)=>{
    return post('/classify/add',{
        title,
    })
}

export const list =()=>{
    return get('/classify/list')
}

export const remove =(id)=>{
    return del(`/classify/${id}`)
}

export const updateTitle =(id,title)=>{
    return post('/classify/update/title',{
        id,
        title
    });
}

