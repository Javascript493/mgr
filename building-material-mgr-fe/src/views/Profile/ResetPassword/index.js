import { defineComponent, reactive } from "vue";
import { profile } from "@/service";
import { message } from "ant-design-vue";
import { result } from "@/helpers/utils";


export default defineComponent({
    setup(){
        const resetPasswordForm = reactive({
            oldPassword:'',
            newPassword:'',
            confirmNewPassword:'',
        });

        const resetPassword = async()=>{
            const { oldPassword, newPassword,confirmNewPassword}=resetPasswordForm;
            
            if(confirmNewPassword!==newPassword){
                message.error('两次输入密码不同');
                return;
            }
            const res = await profile.resetPassword(
                newPassword,
                oldPassword
            );

            result(res)
            .success(({ msg })=>{
                message.success(msg);
                resetPasswordForm.newPassword = ''
                resetPasswordForm.oldPassword = ''
                resetPasswordForm.confirmNewPassword = ''
            })
        }



        return {
            resetPasswordForm,
            resetPassword
        }




    }
})