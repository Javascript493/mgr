<template>
  <div>
    <a-spin :spinning = "loading">
      <a-card :title="simple? '最近的操作日志' : '' ">

        <h2 v-if="!simple">操作日志</h2>

        <a-divider  v-if="!simple"/>

        <a-table
          bordered
          :data-source="list"
          :columns="columns"
          :pagination="false"
        >

        <template #createdAt ="{ record }">
            {{formatTimeStamp(record.meta.createAt)}}
        </template>

        <template #action ="{ record }" v-if="!simple">
            <a href="javascript:;" @click="remove(record)">删除</a>
        </template>

        </a-table>

        <flex-end>
          <a-pagination
            style="margin-top: 24px"
            v-model:current="curPage"
            :pageSize="20"
            :total="total"
            @change="setPage"
            v-if="!simple"
          />
        </flex-end>
      </a-card>
    </a-spin>
  </div>
</template>
<script src="./index.js">
</script>