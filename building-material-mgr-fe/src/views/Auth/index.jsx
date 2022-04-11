import{defineAsyncComponent, defineComponent , reactive} from 'vue';
import{UserOutlined,LockOutlined,SmileOutlined }from '@ant-design/icons-vue';
import { onBeforeRouteLeave, useRouter} from 'vue-router';
//引入登录和注册 请求的相关逻辑
import { auth ,resetPassword} from '@/service';
import { result } from '@/helpers/utils'
import { message ,Modal,Input} from 'ant-design-vue';
import store from '@/store';
import { getCharacterInfoById } from '@/helpers/character';
import { setToken } from '@/helpers/token';


export default defineComponent({

   components:{
      UserOutlined,
      LockOutlined,
      SmileOutlined,
   },
   setup(){
      const router = useRouter();

      //注册用的表单数据
      const regForm =reactive({
         account:'',
         password:'',
         inviteCode:''
      });
      const forgetPassword =()=>{
         Modal.confirm({
            title: `请输入申请重置密码的账号`,
            content :(
                <div style="margin-top:16px">
                    <Input class="__forget_Password_account"/>
                </div>
            ),

            onOk: async()=>{
                const el = document.querySelector('.__forget_Password_account');
                let account = el.value;
               // console.log(account);
               const res = await resetPassword.add(account)
               result(res)
               .success(({msg})=>{
                  message.success(msg)
               });
            }
        });
      }
      //注册用的相关逻辑
      const register =async ()=>{
         if(regForm.account === ''){
            message.info('账户不能为空');
            return;
         }
         if(regForm.password === ''){
            message.info('密码不能为空');
            return;
         }
         if(regForm.inviteCode === ''){
            message.info('请输入邀请码');
            return;
         }
         //服务端给的响应体数据
         const res = await auth.register(regForm.account,regForm.password,regForm.inviteCode);
         result(res)
         .success((data)=>{
            message.success(data.msg)
         });
      };

      //登录用的表单数据
      const loginForm = reactive({
         account:'',
         password:''
      })
      //登录用的相关逻辑
      const login =async ()=>{
         if(loginForm.account === ''){
            message.info('请输入账户');
            return;
         }
         if(loginForm.password === ''){
            message.info('请输入密码');
            return;
         }
         
         const res = await auth.login(loginForm.account,loginForm.password);

         result(res)
         .success(({ msg, data: { user ,token}})=>{
            message.success(msg)
            const p = new Promise(async(resolve)=>{

               await setToken(token); 
               
               await store.dispatch('getCharacterInfo');

               store.dispatch('setUserInfo',user)
               store.dispatch('setUserCharacter',getCharacterInfoById(user.character))
               resolve();
                
            });
            p.then(async()=>{
               
               await router.replace('/main');
            });

            

         });
      };

      // onBeforeRouteLeave((to ,from ,next)=>{
      //    console.log(store.state)
      //    next();
      // });

      return {
         //注册相关数据
         regForm,
         register,
         //登入相关的数据
         login,
         loginForm,
         forgetPassword
      }
   }
});