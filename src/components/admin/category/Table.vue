<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                prop="id"
                label="ID"
                width="40"
            />
            <el-table-column prop="avatar" label="Ảnh">
                <template slot-scope="scope">
                    <img class="w-16" :src="toImage(scope.row.avatar, 'thumbnail')">
                </template>
            </el-table-column>
            <el-table-column prop="name" label="Tiêu đề">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
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
                        @click="switchDeleteCate(scope.row.id, scope.row.deletedAt)"
                    />
                    <el-button icon="el-icon-edit" @click="$router.push(`/admin/category/${scope.row.id}/edit`)" />
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { findIndex } from 'lodash';
    import cloneDeep from 'lodash/cloneDeep';
    import { mapState } from 'vuex';
    import { image as toImage } from '~/utils/url';

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
            ...mapState('admin/productCategory', ['categories', 'category']),
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
            toImage,
            switchDeleteCate(id, deletedAt) {
                if (deletedAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteCate(id);
                        this.$message({
                            type: 'success',
                            message: 'Đã xóa',
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Đã hủy xóa',
                        });
                    });
                } else {
                    this.actionRestoreCate(id);
                }
            },

            async actionDeleteCate(id) {
                await this.$store.dispatch('admin/productCategory/delete', { id });
                const newItem = this.category;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem.data });
            },

            async actionRestoreCate(id) {
                await this.$store.dispatch('admin/productCategory/restore', { id });
                const newItem = this.category;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem.data });
            },
        },
    };
</script>
