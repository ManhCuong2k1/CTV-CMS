<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column prop="name" label="Tên">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="city" label="Khu vực" width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.City.name }}, {{ scope.row.District.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="Email">
                <template slot-scope="scope">
                    <span>{{ scope.row.email }}</span>
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
            <el-table-column label="Hành động" fixed="right" width="220">
                <template slot-scope="scope">
                    <el-button
                        :type="scope.row.deletedAt == null ? '' : 'danger'"
                        icon="el-icon-remove-outline"
                        @click="switchDeleteDistrictbutor(scope.row.id, scope.row.deletedAt)"
                    />
                    <div class="inline-block">
                        <router-link :to="`/admin/distributor/${scope.row.id}/edit`">
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
            ...mapState('admin/distributor', ['distributors']),
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
            switchDeleteDistrictbutor(id, deleteAt) {
                if (deleteAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteDistributor(id);
                        this.$message({
                            type: 'success',
                            message: 'Xóa thành công',
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Đã hủy xóa',
                        });
                    });
                } else {
                    this.actionRestoreDistributor(id);
                    this.$message({
                        type: 'success',
                        message: 'Khôi phục thành công',
                    });
                }
            },
            async actionDeleteDistributor(id) {
                await this.$store.dispatch('admin/distributor/delete', { id });
            },

            async actionRestoreDistributor(id) {
                await this.$store.dispatch('admin/distributor/restore', { id });
            },
        },
    };
</script>
