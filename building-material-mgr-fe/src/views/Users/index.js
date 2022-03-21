import { defineComponent ,ref ,onMounted} from "vue";
import { user } from '@/service'
import { result ,formatTimeStamp} from "@/helpers/utils";
import { message } from "ant-design-vue";
import AddOne from "./AddOne/index.vue";


const columns = [
    {
        title:'账户',
        dataIndex:'account'
    },
    {
        title:'创建日期',
        slots:{
            customRender:'createAt',
        }
    },
    {
        title:'操作',
        slots:{
            customRender:'actions',
        }
    },
]
export default defineComponent({
    components:{AddOne},

    setup(){
        const list = ref([]);
        const curPage = ref(1);
        const total = ref(0);
        const showAddModal = ref(false);
        const keyword = ref('');
        const isSearch = ref(false);


        //获取用户列表的方法
        const getUser = async()=>{
            const res = await user.list(curPage.value,10,keyword.value);

            result(res)
            .success(({data :{list: resList , total:resTotal}})=>{
                list.value = resList;
                total.value = resTotal;
            });
        }

        onMounted(()=>{
            getUser();
        });

        //删除一个用户的操作
        const remove=async({_id})=>{
            const res = await user.remove(_id);

            result(res)
            .success(({msg})=>{
                getUser();
                message.success(msg);
            });
        }

        //页面切换时调用的函数
        const setPage = (page)=>{
            curPage.value = page;
            getUser();
        }

        //重置密码相关逻辑
        const resetPassword = async( {_id} )=>{
            const res = await user.resetPassword(_id);
            result(res)
            .success(({msg})=>{
                message.success(msg)
            })
        }

        //搜索按钮事件
        const onSearch=()=>{
            getUser();
            isSearch.value = !!keyword.value;
        }

        //
        const searchBack = ()=>{
            keyword.value='';
            isSearch.value = false;
            getUser();
        }
        return {
            list,
            curPage,
            total,
            columns,
            formatTimeStamp,
            remove,
            showAddModal,
            getUser,
            setPage,
            resetPassword,
            onSearch,
            searchBack,
            keyword,
            isSearch,

        }
    }
});