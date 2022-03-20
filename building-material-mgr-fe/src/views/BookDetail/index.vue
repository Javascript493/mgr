<template>
  <div>
    <a-card>
      <space-between>
        <h2>{{ d.name }}</h2>
        <div>
          <a-button size="small" type="prima" @click="showUpdateModal = true"
            >编辑</a-button
          >
          &nbsp;
          <a-button size="small" type="danger" @click="remove">删除</a-button>
        </div>
      </space-between>

      <a-divider />

      <div class="base-info">
        <ul>
          <li>
            <span class="title">价格:</span>
            <span class="content">{{ d.price }}</span>
          </li>
          <li>
            <span class="title">分类:</span>
            <span class="content">{{ d.classify }}</span>
          </li>
          <li>
            <span class="title">操作者:</span>
            <span class="content">{{ d.author }}</span>
          </li>
          <li>
            <span class="title">生产日期:</span>
            <span class="content">{{ formatTimeStamp(d.publishDate) }}</span>
          </li>
        </ul>
      </div>
    </a-card>

    <div class="log">
      <a-card title="出入库日志">
        <template #extra>
          <span>
            <a href="javascript:;" @click="logFilter('IN_COUNT')">
              <CheckOutlined v-if="curLogType === 'IN_COUNT'"/>
              入库日志
            </a>
          </span>

          <span style="margin-left: 12px">
            <a href="javascript:;" @click="logFilter('OUT_COUNT')">
              <CheckOutlined v-if="curLogType === 'OUT_COUNT'"/>
              出库日志
            </a>
          </span>
        </template>
        <div>
          <a-table
            :data-source="log"
            :columns="columns"
            :pagination="false"
            bordered
          >
            <template #createAt="{ record }">
              {{ formatTimeStamp(record.meta.createAt) }}
            </template>
          </a-table>
        </div>

        <space-between style="margin-top: 24px">
          <div></div>
          <a-pagination
            v-model:current="logCurPage"
            @change="setLogPage"
            :total="logTotal"
            :page-size="10"
          />
        </space-between>
      </a-card>
    </div>
    <update v-model:show="showUpdateModal" :book="d" @update="update" />
  </div>
</template>

<script src='./index.js'></script>


<style scoped lang='scss'>
@import "./index.scss";
</style>