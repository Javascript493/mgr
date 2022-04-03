import { defineComponent, ref,onMounted } from "vue";
import { inviteCode } from "@/service";
import { result } from "@/helpers/utils";
import { message } from "ant-design-vue";

const columns = [
    {
        title:'邀请码',
        dataIndex:'code'
    },
    {
        title:'是否被使用过',
        slots:{
            customRender:'status'
        }
    },
    {
        title:'操作',
        slots:{
            customRender:'actions'
        }
    },

]

export default defineComponent({
    setup() {
        const count = ref(1);
        const curPage = ref(1);
        const list = ref([]);
        const total = ref(0);

        const getList = async() => {
            const res = await inviteCode.list(curPage.value, 15);

            result(res)
                .success(({ data: { list: l, total: t } }) => {
                    list.value = l;
                    total.value = t;
                });
        }

        onMounted(()=>{
            getList();
        });

        //在页码发生变化时候要做的事情
        //将当前页码 重新获取一下列表
        const setChange =(page)=>{
            curPage.value = page;
            getList();
        }

        const add = async()=>{
            const res = await inviteCode.add(count.value);
            result(res)
            .success(()=>{
                getList();
                message.success(`成功添加${count.value}条邀请码`);
            });
        }

        const remove = async({ _id })=>{
            const res = await inviteCode.remove(_id);

            result(res)
            .success(({msg})=>{
                message.success(msg);
                getList();
            });
        }
        return {
            count,
            list,
            curPage,
            total,
            columns,
            setChange,
            add,
            remove
        }
    }
})