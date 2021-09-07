<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                label="STT"
                type="index"
                width="60"
            />
            <el-table-column prop="name" label="Tên cộng tác viên">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="totalRevenue" label="Tổng doanh thu">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ formatPrice(scope.row.totalRevenue) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="revenuePaid" label="Doanh thu đã thanh toán">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ formatPrice(scope.row.revenuePaid) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="remainingRevenue" label="Doanh thu còn lại">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ formatPrice(scope.row.remainingRevenue) }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';

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
