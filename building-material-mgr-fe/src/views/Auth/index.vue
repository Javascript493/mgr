<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img src="" alt="" />
      <div class="title">建材销售管理系统</div>
    </div>

    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登入">
          <div class="item">
            <a-input placeholder="账户" v-model:value="loginForm.account">
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            
            <a-input-password placeholder="密码" v-model:value="loginForm.password">
              <template v-slot:prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </div>

          <div class="item">
            <a href="javascript:;" @click="forgetPassword">忘记密码</a>
          </div>

          <div class="item">
            <a-button type="primary" @click="login"> 登入 </a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input placeholder="账户" v-model:value="regForm.account">
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>

          <div class="item">
            <a-input-password placeholder="密码" v-model:value="regForm.password">
              <template v-slot:prefix>
                <LockOutlined />
              </template>
            </a-input-password>
          </div>

           <div class="item">
            <a-input placeholder="邀请码" v-model:value="regForm.inviteCode">
              <template v-slot:prefix>
                <SmileOutlined />
              </template>
            </a-input>
          </div>

          <div class="item"></div>

          <div class="item">
            <a-button type="primary" @click="register"> 注册 </a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <!-- <a-button type="primary">Primary Button</a-button> -->
  </div>
</template>

<script src="./index.jsx"></script>
//引入组件逻辑

<style lang="scss" scpoed>
@import "./index.scss";
</style>
