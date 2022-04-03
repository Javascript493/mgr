import { defineComponent, reactive ,ref} from 'vue';
import { book } from '@/service';
import { result ,clone} from '@/helpers/utils'
import { message } from 'ant-design-vue'
import store from '@/store';
const defaultFormData ={
    name:'',
    price:0,
    author:'',
    publishDate:0,
    classify:'',
    count:0

}
export default defineComponent({
    props:{
        show:Boolean,
        classifyList:Array
    },
    setup(props,context){
        const addForm = reactive( clone(defaultFormData) );

        if(store.state.classify.length){
            addForm.classify = store.state.classify[0]._id;
        }
        const submit =async ()=>{
            const form = clone(addForm);
            form.publishDate = addForm.publishDate.valueOf();
            const res = await book.add(form);

            result(res)
            //等于是说将 d=data , {data} = res
            .success((d,{ data })=>{
                //清空表单
                Object.assign(addForm,defaultFormData);
                message.success(data.msg);

                context.emit('getList');
            })
        };

        const close = ()=>{
            //更新传递进来的属性 show 更改为false
            context.emit('update:show',false)
        }
        
        return{
            addForm,submit,props,close, store:store.state,
        }

    }
});