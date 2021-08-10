<template>
    <div>
        <div>
            <span class="font-bold text-gray-600 text-lg">Top nhà phân phối</span>
        </div>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
        >
            <el-table-column
                prop="name"
                label="NPP"
                width="180"
            >
                <template slot-scope="scope">
                    {{ scope.row.Admin.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                label="Khu vực"
            >
                <template slot-scope="scope">
                    {{ scope.row.Admin.City.name }}
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
