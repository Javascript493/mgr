import { setToken } from '@/helpers/token';
import {defineComponent,onMounted,ref} from 'vue';
import Nav from './Nav/index.vue'
import { user } from '@/service'
import { result } from '@/helpers/utils';
export default defineComponent({
    components:{
        AppNav : Nav,
    },
    setup(){
        const logout=()=>{
            setToken('');
            window.location.href ='/';
        }
        let userName = ref('');

        const getUserAccount =async()=>{
            const res = await user.info();
            result(res)
            .success(({data:{account}})=>{
                userName.value = account;
            });
        }
        onMounted(()=>{
            getUserAccount()
        })

        return{
            logout,
            userName
        }
    }
})