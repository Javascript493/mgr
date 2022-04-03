import { createStore, Store } from 'vuex';
import { character ,classify,user} from '@/service'
import { result } from '@/helpers/utils';
import { getCharacterInfoById } from '@/helpers/character';

export default createStore({
  state: {
    characterInfo:[],
    userInfo:{},
    userCharacter:{},
    classify:[]
  },
  getters: {
  },
  mutations: {
    setCharacterInfo(state,characterInfo){
      state.characterInfo = characterInfo;

    },

    setUserInfo(state,userInfo){
      state.userInfo = userInfo;

    },
    setUserCharacter(state,userCharacter){
      state.userCharacter = userCharacter;

    },

    setClassify(state,classify){
      state.classify = classify;
    }


  },
  actions: {
    async getClassify(store){
      const res = await classify.list();
      result(res)
      .success(({data})=>{
        store.commit('setClassify',data);
      })
    },

    async getCharacterInfo(store){
      const res = await character.list();
      
      result(res)
      .success(( { data } )=>{
        store.commit('setCharacterInfo',data)
      });
    },

    async getUserInfo(store){
      //拿到user的信息
      const res = await user.info();

      result(res)
      .success(({data})=>{
        store.commit('setUserInfo',data);

        store.commit('setUserCharacter',getCharacterInfoById(data.character));
      });
    },

  },
  modules: {
  },
});


