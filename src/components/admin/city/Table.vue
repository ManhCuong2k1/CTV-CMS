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
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" fixed="right" width="220">
                <template slot-scope="scope">
                    <!-- <el-tooltip
                        class="item"
                        effect="dark"
                        content="Xóa"
                        placement="top"
                    >
                        <el-button
                            :type="scope.row.deletedAt == null ? '' : 'danger'"
                            icon="el-icon-delete"
                            @click="switchDeleteCity(scope.row.id, scope.row.deletedAt)"
                        />
                    </el-tooltip> -->
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Sửa"
                        placement="top"
                    >
                        <el-button
                            icon="el-icon-edit"
                            @click="$emit('editCityId', scope.row.id)"
                        />
                    </el-tooltip>
                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="Quận/Huyện"
                        placement="top"
                    >
                        <el-button
                            icon="el-icon-position"
                            @click="$router.push(`/admin/city/${scope.row.id}/districts`)"
                        />
                    </el-tooltip>
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
            ...mapState('admin/city', ['city', 'cityDelete', 'cityRestore']),
        },

        watch: {
            data: {
                handler() {
                    this.dataTable = this.data;
                },
                deep: true,
            },
        },

        methods: {
            switchDeleteCity(id, deleteAt) {
                if (deleteAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteCity(id);
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
                    this.actionRestoreCity(id);
                }
            },

            async actionDeleteCity(id) {
                await this.$store.dispatch('admin/city/delete', { id });
            },

            async actionRestoreCity(id) {
                await this.$store.dispatch('admin/city/restore', { id });
            },
        },
    };
</script>
