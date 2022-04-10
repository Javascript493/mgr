import { defineComponent, onMounted, ref } from "vue";
import { classify } from '@/service'
import { result } from "@/helpers/utils";
import { message ,Modal,Input} from "ant-design-vue";


const columns = [
    {
        title:'分类',
        dataIndex:'title'
    },
    {
        title:'操作',
        slots:{
            customRender:'actions'
        }
    }
]
    



export default defineComponent({
    setup(){
        const title = ref('');
        const list = ref([]);

        const getList =async()=>{
            const res = await classify.list();

            result(res)
            .success(({data})=>{
                list.value = data;
            });
        }

        const add =async()=>{
            const res = await classify.add(title.value);
            result(res)
            .success(()=>{
                getList();
                title.value = ''
            })
        }

        onMounted(()=>{
            getList();
        });

        const remove = async({ _id })=>{
            const res = await classify.remove(_id);
            result(res)
            .success(({msg})=>{
                message.success(msg);
                getList();
            })
        }

        const updateTitle = async({ _id })=>{
            Modal.confirm({
                title: `请输入新的分类名称`,
                content :(
                    <div style="margin-top:16px">
                        <Input class="__classify_new_title"/>
                    </div>
                ),
                onOk: async()=>{
                    const title = document.querySelector('.__classify_new_title').value;
                    const res = await classify.updateTitle(_id,title);

                    result(res)
                    .success(({msg})=>{
                        message.success(msg);
                        getList();
                    });
                 
                }
            });
        }


        return{
            add,
            list,
            title,
            columns,
            remove,
            updateTitle
        }
    }
})