<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                prop="id"
                label="ID"
                width="60"
            />
            <el-table-column prop="name" label="Tên" min-width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="slug" label="Link rút gọn" min-width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.slug }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="Thời gian tạo" min-width="200">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="updatedAt" label="Thời gian chỉnh sửa" min-width="200">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ scope.row.updatedAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" fixed="right" width="220">
                <template slot-scope="scope">
                    <el-button
                        :type="scope.row.deletedAt == null ? '' : 'danger'"
                        icon="el-icon-remove-outline"
                        @click="switchDeleteGroup(scope.row.id, scope.row.deletedAt)"
                    />
                    <div class="inline-block">
                        <router-link :to="`/admin/product-group/${scope.row.id}/edit`">
                            <el-button icon="el-icon-edit" />
                        </router-link>
                    </div>
                    <div class="inline-block">
                        <router-link :to="`/admin/product-group/${scope.row.id}/products`">
                            <el-button icon="el-icon-more" />
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
            ...mapState('admin/productGroup', ['group', 'groups']),
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
            switchDeleteGroup(id, deletedAt) {
                if (deletedAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteGroup(id);
                        this.$message({
                            type: 'success',
                            message: 'Xóa thành công',
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Đã hủy',
                        });
                    });
                } else {
                    this.actionRestoreGroup(id);
                    this.$message({
                        type: 'success',
                        message: 'Khôi phục thành công',
                    });
                }
            },

            async actionDeleteGroup(id) {
                await this.$store.dispatch('admin/group/delete', { id });
                await this.$store.dispatch('admin/group/fetch');
            },

            async actionRestoreGroup(id) {
                await this.$store.dispatch('admin/group/restore', { id });
                await this.$store.dispatch('admin/group/fetch');
            },
        },
    };
</script>
