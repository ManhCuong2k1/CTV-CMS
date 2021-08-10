<template>
    <div>
        <el-tag v-if="status == 'created'" class="ml-2" :effect="status == 'created' ? 'dark' : 'plain'">
            Mới tạo
        </el-tag>
        <el-tag v-if="status == 'processing'" class="ml-2" :effect="status == 'processing' ? 'dark' : 'plain'">
            Đang xử lý
        </el-tag>
        <el-tag v-if="status == 'shipping'" class="ml-2" :effect="status == 'shipping' ? 'dark' : 'plain'">
            Đang vận chuyển
        </el-tag>
        <el-tag
            v-if="status == 'success'"
            class="ml-2"
            type="success"
            :effect="status == 'success' ? 'dark' : 'plain'"
        >
            Hoàn thành
        </el-tag>
        <el-tag
            v-if="status == 'canceled'"
            class="ml-2"
            type="danger"
            :effect="status == 'canceled' ? 'dark' : 'plain'"
        >
            Hủy đơn
        </el-tag>
    </div>
</template>

<script>
    export default {
        props: {
            status: {
                type: String,
                default: 'created',
            },
        },
    };
</script>
