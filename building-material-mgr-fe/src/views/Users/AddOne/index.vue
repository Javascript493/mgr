<template>
  <div>
    <a-modal
      title="添加一个用户"
      ok-text="确认"
      cancel-text="取消"
      :visible="props.show"
      @ok="submit"
      @cancel="close"
    >
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="账号">
          <a-input v-model:value="addForm.account" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input v-model:value="addForm.password" />
        </a-form-item>
        <a-form-item label="角色">
          <a-select
            v-model:value="addForm.character"
            style="width: 120px"
          >
            <a-select-option v-for="item in characterInfo" :key="item._id" :value="item._id">
              {{item.title}}
            </a-select-option>
            
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src='./index.js'></script>