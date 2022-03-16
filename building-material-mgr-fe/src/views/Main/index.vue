<template>
  <div>
    <a-card>
      <h2>建筑材料列表</h2>

      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
            v-model:value="value"
            placeholder="根据材料名搜索"
            enter-button
          />
        </div>
        <a-button>添加一条</a-button>
      </space-between>

      <a-divider />

      <a-table :columns="columns" :data-source="dataSource"> </a-table>
    </a-card>
  </div>
</template>

<script src='./index.js'></script>

<style scoped lang='scss'>
@import "./index.scss";
</style>