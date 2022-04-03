<template>
    <div>
        <a-card title="邀请码管理"> 
            <div>
                <a-input-number 
                id="input" v-model:value="count" :min="1" 
                :max="9999" 
                />

                <a-button type="primary" style="margin-left:24px"
                @click="add">
                添加
                </a-button>
            </div>

            <a-divider></a-divider>

            <div>
                <a-table bordered 
                :columns="columns"
                :data-source="list"
                :pagination="false">

                    <template #status="{record}">
                        <div style="color:#84AF9B">
                            {{ record.user ? '该邀请码已被使用' : '未使用' }}
                        </div>
                    </template>

                    <template #actions="{record}">
                        <a-button @click="remove(record)" type="danger" size="small">
                            删除
                        </a-button>
                    </template>

                </a-table>
            </div>

            <flex-end style="margin-top:24px">
                <a-pagination
                v-model:current="curPage"
                :pageSize="15"
                :total="total"
                @change="setChange"></a-pagination>
            </flex-end>
        </a-card>

    </div>
</template>

<script src="./index.js"></script>