<template>
    <div>
        <div>
            <span class="font-bold text-gray-600 text-lg">Đơn hàng mới nhất</span>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
        >
            <el-table-column
                prop="date"
                label="Ngày đặt"
                width="180"
            >
                <template slot-scope="scope">
                    {{ scope.row.createdAt | formatDate }}
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="Người tạo"
                width="180"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.Admin">
                        {{ scope.row.Admin.name }}
                    </span>
                    <span v-else>
                        {{ scope.row.PointOfSale.name }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="Khu vực"
            >
                <template slot-scope="scope">
                    <span v-if="scope.row.Admin">
                        {{ scope.row.Admin.City.name }}
                    </span>
                    <span v-else>
                        {{ scope.row.PointOfSale.City.name }}
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="Trạng thái"
            >
                <template slot-scope="scope">
                    <status-tag :status="scope.row.status" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import StatusTag from '../shared/StatusTag.vue';

    export default {
        components: { StatusTag },
        props: {
            tableData: {
                type: Array,
            },
        },
    };
</script>
