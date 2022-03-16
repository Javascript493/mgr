//该组件 实现 首位贴边
<template>
    <div class="space-between">
        <slot />
    </div>
</template>

<style scoped lang='scss'>
    .space-between{
        display: flex;
        justify-content: space-between;
    }
</style>