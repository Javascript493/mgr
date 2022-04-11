<template>
    <div class="basic-layout">
        <div class="app-header">
            <div class="left">
                <img src="" alt="">
                <h2>建材销售管理系统</h2>
            </div>
            <div class="right">
                <div class="hello-msg">{{`你好 ${userName}`}}</div>
                <div class="logout" @click="logout">退出</div>
            </div>
        </div>
        <div class="app-header-placeholder"></div>

        <div class="app-content">
            <div class="left">
                <app-nav />
            </div>
            <div class="right">
                <router-view />
            </div>
        </div>
    </div>
</template>



<script src='./index.js'></script>

<style scoped lang ='scss'>
    @import './index.scss'

</style>
