import { defineComponent, reactive ,ref} from 'vue';
import { user } from '@/service';
import { result ,clone} from '@/helpers/utils'
import { message } from 'ant-design-vue'

const defaultFormData ={
    account:'',
    password:'',

}
export default defineComponent({
    props:{
        show:Boolean,
    },
    setup(props,context){
        const addForm = reactive( clone(defaultFormData) );

        const close = ()=>{
            //更新传递进来的属性 show 更改为false
            context.emit('update:show',false)
        }

        const submit =async ()=>{
            const form = clone(addForm);
            
            const res = await user.add(form.account,form.password);

            result(res)
            //等于是说将 d=data , {data} = res
            .success((d,{ data })=>{
                //清空表单
                Object.assign(addForm,defaultFormData);
                message.success(data.msg);
                context.emit('getList')
                close();
            })
        };

        
        
        return{
            addForm,submit,props,close
        }

    }
});