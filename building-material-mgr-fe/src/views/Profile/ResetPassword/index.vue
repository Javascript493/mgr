<template>
    
    <div>
        <a-card title="修改密码">
      <a-form
        :model="formState"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-item label="原始密码">
          <a-input v-model:value="resetPasswordForm.oldPassword" type="password"/>
        </a-form-item>
        <a-form-item label="新密码密码">
          <a-input v-model:value="resetPasswordForm.newPassword" type="password"/>
        </a-form-item>
        <a-form-item label="确认新密码">
          <a-input v-model:value="resetPasswordForm.confirmNewPassword" type="password"/>
          <div style="margin-top:24px">
            <a-button type="primary" @click="resetPassword">修改</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
    </div>
</template>

<script src="./index.js"></script>
