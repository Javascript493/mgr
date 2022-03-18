<template>
  <div>
    <a-modal title="添加材料" 
    ok-text='确认' cancel-text='取消' 
    :visible="props.show" 
    @ok="submit" @cancel='close'>

      <a-form
        :label-col="{ span : 6 }"
        :wrapper-col="{span: 16}"
      >

        <a-form-item label="材料名">
          <a-input  v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="价格"  >
          <a-input-number :min="0" :max="9999"  v-model:value="addForm.price"/>
        </a-form-item>
        <a-form-item label="分类" >
          <a-input v-model:value="addForm.classify" />
        </a-form-item>
        <a-form-item label="操作者" >
          <a-input v-model:value="addForm.author" />
        </a-form-item>
        <a-form-item label="生产日期" >
           <a-date-picker v-model:value="addForm.publishDate" />
        </a-form-item>
        <a-form-item label="库存" >
           <a-input v-model:value="addForm.count" />
        </a-form-item>

      </a-form>

    </a-modal>
  </div>
</template>

<script src='./index.js'></script>