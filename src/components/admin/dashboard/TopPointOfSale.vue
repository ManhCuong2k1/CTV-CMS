<template>
    <div>
        <div>
            <span class="font-bold text-gray-600 text-lg">Top điểm bán</span>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
        >
            <el-table-column
                prop="name"
                label="Điểm bán"
                width="180"
            >
                <template slot-scope="scope">
                    {{ scope.row.PointOfSale.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="Khu vực"
            >
                <template slot-scope="scope">
                    {{ scope.row.PointOfSale.City.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                label="Doanh thu"
                width="180"
            >
                <template slot-scope="scope">
                    {{ parseInt(scope.row.sum) | formatNumber }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: {
            tableData: {
                type: Array,
            },
        },
    };
</script>
