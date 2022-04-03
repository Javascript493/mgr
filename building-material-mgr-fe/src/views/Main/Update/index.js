import { defineComponent, reactive, watch } from 'vue';
import { book } from '@/service';
import { result, clone } from '@/helpers/utils'
import { message } from 'ant-design-vue'
import store from '@/store';
import moment from 'moment';
export default defineComponent({
    props: {
        show: Boolean,
        book: Object
    },
    setup(props, context) {
        const editForm = reactive({
            name: '',
            price: 0,
            author: '',
            publishDate: 0,
            classify: '',
        });
        const close = () => {
            context.emit('update:show', false);
        }

        watch(() => props.book, (current) => {
            Object.assign(editForm, current);
            editForm.publishDate = moment(Number(editForm.publishDate));
        });

        const submit = async () => {
            const res = await book.update({
                id: props.book._id,
                name: editForm.name,
                price: editForm.price,
                author: editForm.author,
                classify: editForm.classify,
                publishDate: editForm.publishDate.valueOf()
            });
            result(res)
                .success(({ data,msg}) => {
                    //触发父组件的update事件 并将data传过去
                    context.emit('update', data);
                    message.success(msg)
                    close();
                })
        }
        return {
            editForm, submit, props, close,store:store.state
        }

    }
});