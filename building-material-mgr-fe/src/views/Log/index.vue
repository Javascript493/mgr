<template>
    <div>
        <a-card>
            <h2>操作日志</h2>

            <a-divider />

            <a-table bordered :data-source="list" :columns="columns">


            </a-table>

            <flex-end >
                <a-pagination style="margin-top:24px"/>
            </flex-end>
        </a-card>
        

    </div>
</template>
<script src="./index.js"> </script>