<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                prop="id"
                label="ID"
                width="40"
            />
            <el-table-column label="Author" width="220">
                <template slot-scope="scope">
                    <span>{{ scope.row.author }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Commentable Type" width="220">
                <template slot-scope="scope">
                    <span>{{ scope.row.commentable_type }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Commentable">
                <template slot-scope="scope">
                    <span v-if="scope.row.commentable_type === 'Post'">{{ scope.row.post_title }}</span>
                    <span v-if="scope.row.commentable_type === 'Book'">{{ scope.row.book_title }}</span>
                    <span v-if="scope.row.commentable_type === 'Review'">{{ scope.row.review_book.title }}</span>
                    <span v-if="scope.row.commentable_type === 'Serrie'">{{ scope.row.serrie_title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Created At" width="220">
                <template slot-scope="scope">
                    <span>{{ scope.row.created_at | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Operations" fixed="right" width="220">
                <template slot-scope="scope">
                    <el-button
                        :type="scope.row.deleted_at == null ? '' : 'danger'"
                        icon="el-icon-remove-outline"
                        @click="switchDeleteComment(scope.row.id, scope.row.deleted_at)"
                    />
                    <el-button icon="el-icon-edit" @click="$router.push(`/admin/comment/${scope.row.id}/edit`)" />
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
            };
        },

        computed: {
            ...mapState('admin/comment', ['comment']),
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
            switchDeleteComment(id, deleteAt) {
                if (deleteAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteComment(id);
                        this.$message({
                            type: 'success',
                            message: 'Delete completed',
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Delete canceled',
                        });
                    });
                } else {
                    this.actionRestoreComment(id);
                }
            },

            async actionDeleteComment(id) {
                await this.$store.dispatch('admin/comment/delete', { id });
                const newItem = this.comment;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem.data });
            },

            async actionRestoreComment(id) {
                await this.$store.dispatch('admin/comment/restore', { id });
                const newItem = this.comment;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem.data });
            },
        },
    };
</script>
