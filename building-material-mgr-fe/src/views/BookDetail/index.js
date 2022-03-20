import { defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { book ,inventoryLog} from '@/service'
import { result, formatTimeStamp } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import Update from '../Main/Update/index.vue';
import {CheckOutlined } from '@ant-design/icons-vue'

 
const columns = [
    {
        title:'数量',
        dataIndex:'num'
    },
    {
        title:'操作时间',
        slots:{
            customRender: 'createAt'
        }
    },
]
export default defineComponent({
    components: {
        Update,CheckOutlined
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const id = route.params.id
        const detailInfo = ref({});
        const log = ref([]);
        const logTotal = ref(0);
        const logCurPage = ref(1);
        const showUpdateModal = ref(false);
        const curLogType = ref('IN_COUNT');


        //getDetail接口 传入id 返回数据库中同id的单项数据
        //然后将其传入自定义的变量detailInfo中展示给页面
        const getDetail = async () => {
            const res = await book.detail(id);
            result(res)
                .success(({ data }) => {
                    detailInfo.value = data;
                })
        }
        //获取出入库日志
        const getInventoryLog = async()=>{
            const res = await inventoryLog.list(curLogType.value,logCurPage.value,10);
            result(res)
            .success(({data:{ list , total}})=>{
                log.value = list;
                logTotal.value= total;
                
            });
        }
        onMounted(() => {
            getDetail();
            getInventoryLog();

        });

        //删除操作
        const remove = async () => {
            const res = await book.remove(id);
            result(res)
                .success(({ msg }) => {
                    message.success(msg);

                    router.replace('/main');
                })
        }

        //子组件success后返回res的data （数据库的信息 这里直接更新在自定义的detailInfo中 然后展示给页面
        const update = (book) => {
            Object.assign(detailInfo.value, book);
        }

        //日志改变页码时 拿到当前页码对应的数据
        const setLogPage = (page)=>{
            logCurPage.value = page;
            getInventoryLog();
        }
        //筛选日志 是出库还是入库
        const logFilter = (type)=>{
            curLogType.value= type;
            getInventoryLog();
        }
        return {
            d: detailInfo,
            formatTimeStamp,
            remove,
            showUpdateModal,
            update,
            log,
            logTotal,
            setLogPage,
            columns,
            logFilter,
            curLogType,
            logCurPage
        }
    }
})