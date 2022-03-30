import store from "@/store"

export const isAdmin =()=>{
    const uc = store.state.userCharacter;
    return uc.name === 'admin'
}
//根据id来查找对应的character 并返查找到的当前项
export const getCharacterInfoById = (id) => {
    const { characterInfo } = store.state;

    const one = characterInfo.find((item) => {
        return item._id === id;
    });

    return one || {
        title: '未知角色'
    }
}