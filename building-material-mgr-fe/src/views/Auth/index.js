import{defineAsyncComponent, defineComponent , reactive} from 'vue';
import{UserOutlined,LockOutlined,SmileOutlined }from '@ant-design/icons-vue';
import { auth } from '@/service';




export default defineComponent({

   components:{
      UserOutlined,
      LockOutlined,
      SmileOutlined,
   },
   setup(){
      const regForm =reactive({
         account:'',
         password:''
      })

      const register =()=>{
         auth.register(regForm.account,regForm.password)

      }

      return {
         regForm,
         register
      }
   }
});