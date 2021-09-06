<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                label="STT"
                type="index"
                width="60"
            />
            <el-table-column prop="title" label="Tên cộng tác viên">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="summary" label="Tổng doanh thu">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ formatPrice(scope.row.totalRevenue) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="categories" label="Doanh thu đã thanh toán">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ formatPrice(scope.row.revenuePaid) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="categories" label="Doanh thu còn lại">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ formatPrice(scope.row.remainingRevenue) }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    // import { findIndex } from 'lodash';
    import cloneDeep from 'lodash/cloneDeep';
    import { mapState } from 'vuex';

    export default {
        components: {
        },
        props: {
            data: {
                type: Array,
                require: true,
            },
        },
        data() {
            return {
                dataTable: cloneDeep(this.data),
                loadding: false,
            };
        },
        computed: {
            ...mapState('admin/news', ['new']),
        },
        watch: {
            data: {
                handler() {
                    this.dataTable = cloneDeep(this.data);
                },
                deep: true,
            },
        },
        methods: {
            formatPrice(value) {
                return parseInt(value, 10).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            },
        },
    };
</script>
