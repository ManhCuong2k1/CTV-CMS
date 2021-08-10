<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                prop="id"
                label="ID"
                width="50"
            />
            <el-table-column prop="name" label="Tên">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="Mã">
                <template slot-scope="scope">
                    <span>{{ scope.row.code }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Thời gian tạo">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" fixed="right">
                <template slot-scope="scope">
                    <!-- <el-button
                        :type="scope.row.deletedAt == null ? '' : 'danger'"
                        icon="el-icon-delete"
                        @click="switchDeleteDistrict(scope.row.id, scope.row.deletedAt)"
                    /> -->
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Sửa"
                        placement="top"
                    >
                        <el-button
                            icon="el-icon-edit"
                            @click="$emit('editDistrictId', scope.row.id)"
                        />
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { findIndex } from 'lodash';
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
            ...mapState('admin/district', ['districtDetail']),
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
            switchDeleteDistrict(id, deleteAt) {
                if (deleteAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteDistrict(id);
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
                    this.actionRestoreDistrict(id);
                }
            },

            async actionDeleteDistrict(id) {
                await this.$store.dispatch('admin/district/delete', { id });
                const newItem = this.districtDetail;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem });
            },

            async actionRestoreDistrict(id) {
                await this.$store.dispatch('admin/district/restore', { id });
                const newItem = this.districtDetail;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem });
            },
        },
    };
</script>
