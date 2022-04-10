import { defineComponent ,ref ,onMounted, reactive} from "vue";
import { user } from '@/service'
import { result ,formatTimeStamp} from "@/helpers/utils";
import { message } from "ant-design-vue";
import AddOne from "./AddOne/index.vue";
import { getCharacterInfoById } from "@/helpers/character";
import { EditOutlined } from '@ant-design/icons-vue'
import store from "@/store";

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
        title:'角色',
        slots:{
            customRender:'character',
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
    components:{AddOne,EditOutlined},

    setup(){
        const list = ref([]);
        const curPage = ref(1);
        const total = ref(0);
        const showAddModal = ref(false);
        const keyword = ref('');
        const isSearch = ref(false);
        const showEditCharacterModal = ref(false);

        const editForm = reactive({
            character:'',
            current:{},
        })


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

        //改变角色的事件
        const onEdit = (record)=>{
            //拿到当前编辑的用户的信息
            editForm.current = record;
            //显示当前修改的用户的角色是什么
            editForm.character = record.character

            showEditCharacterModal.value = true;
        }

        // 点击确认修改用户角色的逻辑
        const updateCharacter = async()=>{
            //参数分别为 要修改成什么角色？ 和当前用户真正的用户信息
            const res = await user.editCharacter(editForm.character,editForm.current._id);
            result(res)
            .success(( {msg })=>{
                message.success(msg);
                showEditCharacterModal.value = false;
                editForm.current.character = editForm.character
            })
        }


        const onUploadChange = ({file})=>{
            if(file.response){
                result(file.response)
                .success(async(key)=>{

                    const res = await user.addMany(key);
                });
            }
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
            onEdit,
            keyword,
            isSearch,
            getCharacterInfoById,
            showEditCharacterModal,
            editForm,
            characterInfo : store.state.characterInfo,
            updateCharacter,
            onUploadChange
        }
    }
});