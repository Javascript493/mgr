<template>
  <div>
    <a-card>
      <h2>建筑材料列表</h2>

      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
            v-model:value="keyword"
            @search='onSearch'
            placeholder="根据材料名搜索"
            enter-button
          />
          <a href="javascript:;" @click="searchBack" v-if="isSearch">返回</a>
        </div>
        <a-button @click="show = true">添加一条</a-button>
      </space-between>

      <a-divider />

      <a-table :columns="columns" :data-source="list" :pagination="false">
        <template #publishDate="data">
          {{ formatTimeStamp(data.record.publishDate) }}
        </template>

        <template #actions="record">
         <a href="javascript:;" @click="update(record)">编辑</a>
          &nbsp;
         <a href="javascript:;" @click="remove(record)">删除</a>
        </template>

        <template #count="data">
          <a href="javascript:;" @click="updateCount('IN_COUNT',data.record)">入库</a>
            {{data.record.count}}
          <a href="javascript:;" @click="updateCount('OUT_COUNT',data.record)">出库</a>

        </template>


      </a-table>

      <space-between style="margin-top: 24px">
        <div></div>
        <a-pagination v-model:current="curPage"  @change="setPage" :total='total' :page-size="10" />
      </space-between>
    </a-card>

    <add-one v-model:show="show" />

    <update v-model:show="showUpdateModal" :book='curEditBook' @update='updateCurBook'/>
  </div>
</template>

<script src='./index.jsx'></script>

<style scoped lang='scss'>
@import "./index.scss";
</style>