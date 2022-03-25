import{defineAsyncComponent, defineComponent , reactive} from 'vue';
import{UserOutlined,LockOutlined,SmileOutlined }from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
//引入登录和注册 请求的相关逻辑
import { auth } from '@/service';
import { result } from '@/helpers/utils'
import { message } from 'ant-design-vue';
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
      })
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
            //登录成功后将用户信息传入store

            //将用户数据作为全局数据
            store.commit('setUserInfo',user);
            //根据用户的character属性 来查询用户是管理员还是普通用户，并获得相关权限信息
            store.commit('setUserCharacter',getCharacterInfoById(user.character));

            setToken(token);
            router.replace('/main')

         });
      }

      return {
         //注册相关数据
         regForm,
         register,
         //登入相关的数据
         login,
         loginForm,
      }
   }
});