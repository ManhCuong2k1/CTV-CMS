<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                prop="id"
                label="ID"
                width="60"
            />
            <el-table-column prop="title" label="Tiêu đề" min-width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="summary" label="Nội dung ngắn">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ scope.row.summary }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="categories" label="Danh mục">
                <template slot-scope="scope">
                    <div v-for="cates in scope.row.newsCategories" :key="cates.title">
                        <span>{{ cates.title }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" width="220">
                <template slot-scope="scope">
                    <el-button
                        :type="scope.row.deletedAt == null ? '' : 'danger'"
                        icon="el-icon-remove-outline"
                        @click="switchDeleteNews(scope.row.id, scope.row.deletedAt)"
                    />
                    <div class="inline-block">
                        <router-link :to="`/admin/news/${scope.row.id}/edit`">
                            <el-button icon="el-icon-edit" />
                        </router-link>
                    </div>
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
            ...mapState('admin/news', ['new']),
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
            switchDeleteNews(id, deletedAt) {
                if (deletedAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteNews(id);
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
                    this.actionRestoreNews(id);
                    this.$message({
                        type: 'success',
                        message: 'Khôi phục thành công',
                    });
                }
            },

            async actionDeleteNews(id) {
                await this.$store.dispatch('admin/news/delete', { id });
                const newItem = this.new;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem.data });
            },

            async actionRestoreNews(id) {
                await this.$store.dispatch('admin/news/restore', { id });
                const newItem = this.new;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem.data });
            },
        },
    };
</script>
