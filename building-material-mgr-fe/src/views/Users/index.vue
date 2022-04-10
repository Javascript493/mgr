<template>
  <div v-only-admin>
    <a-card>
      <h2>用户管理</h2>

      <a-divider />

      <space-between>
        <div class="search">
          <a-input-search
            v-model:value="keyword"
            @search="onSearch"
            placeholder="根据用户名搜索"
            enter-button
          />
          <a href="javascript:;" @click="searchBack" v-if="isSearch">返回</a>
        </div>

        <div>
          <a-button @click="showAddModal = true">添加用户</a-button>
          &nbsp;
          <a-upload action="http://localhost:3000/upload/file" @change="onUploadChange">
            <a-button @click="upload" type="primary">上传EXCEL添加</a-button>
          </a-upload>
        </div>
      </space-between>

      <a-divider />

      <div>
        <a-table
          :pagination="false"
          :columns="columns"
          :data-source="list"
          bordered
        >
          <template #createAt="{ record }">
            {{ formatTimeStamp(record.meta.createAt) }}
          </template>

          <template #character="{ record }">
            <a href="javascript:;" @click="onEdit(record)"><EditOutlined /></a>
            {{ getCharacterInfoById(record.character).title }}
          </template>

          <template #actions="{ record }">
            <a href="javascript:;" @click="resetPassword(record)">重置密码</a>

            &nbsp;&nbsp;

            <a href="javascript:;" style="color: red" @click="remove(record)"
              >删除该用户</a
            >
          </template>

          t
        </a-table>
      </div>

      <flex-end style="margin-top: 24px" v-if="!isSearch">
        <a-pagination
          v-model:current="curPage"
          @change="setPage"
          :total="total"
          :page-size="10"
        >
        </a-pagination>
      </flex-end>
    </a-card>

    <add-one v-model:show="showAddModal" @getList="getUser" />

    <a-modal
      v-model:visible="showEditCharacterModal"
      title="修改角色"
      @ok="updateCharacter"
    >
      <a-select v-model:value="editForm.character" style="width: 200px">
        <a-select-option
          v-for="item in characterInfo"
          :key="item._id"
          :value="item._id"
        >
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script src='./index.js'></script>

<style scoped lang='scss'>
@import "./index.scss";
</style>
