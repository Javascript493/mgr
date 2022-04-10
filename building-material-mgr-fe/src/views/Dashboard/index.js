import { defineComponent, onMounted,ref} from "vue";
import { dashboard } from "@/service";
import { result } from "@/helpers/utils";
import Log from '@/views/Log/index.vue'
import Book from '@/views/Main/index.vue'


export default defineComponent({
    components :{
        Book,
        Log
    },
    setup(){
        const loading = ref(true);
        const baseInfo = ref({});
        const getBaseInfo = async()=>{
            loading.value = true;
            const res = await dashboard.baseInfo();
            loading.value = false;
            result(res)
            .success(({data})=>{
                baseInfo.value = data;
            });
        }


        onMounted(()=>{
            getBaseInfo();
        });

        return {
            baseInfo,
            loading
        }
    }

})