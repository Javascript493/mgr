<template>
  <div>
    <a-spin :spinning = "loading">
      <a-card>
        <h2>操作日志</h2>

        <a-divider />

        <a-table
          bordered
          :data-source="list"
          :columns="columns"
          :pagination="false"
        >

        <template #createdAt ="{ record }">
            {{formatTimeStamp(record.meta.createAt)}}
        </template>

        <template #action ="{ record }">
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
          />
        </flex-end>
      </a-card>
    </a-spin>
  </div>
</template>
<script src="./index.js">
</script>