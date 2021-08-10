<template>
    <div>
        <el-table :data="dataTable" stripe class="w-full">
            <el-table-column
                type="index"
                width="50"
            />
            <el-table-column prop="name" label="Tên" min-width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="vehicleType" label="Loại xe">
                <template slot-scope="scope">
                    <span>{{ scope.row.vehicleType || "Không xác định" }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="vehicleCode" label="Biển số">
                <template slot-scope="scope">
                    <span>{{ scope.row.vehicleCode || "Không xác định" }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="Điện thoại">
                <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" width="220">
                <template slot-scope="scope">
                    <div class="inline-block">
                        <router-link :to="`/admin/transporter/${scope.row.id}/edit`">
                            <el-button icon="el-icon-edit" />
                        </router-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import { mapState } from 'vuex';

    export default {
        props: {
            data: {
                type: Array,
                require: true,
            },
        },

        data() {
            return {
                dataTable: cloneDeep(this.data),
            };
        },

        computed: {
            ...mapState('admin/transporter', ['transporters']),
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
        },
    };
</script>
