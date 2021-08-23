<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                prop="phone"
                label="Username"
                width="150"
            />
            <el-table-column prop="post_count" label="Posts" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.post_count | formatNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="review_count" label="Reviews" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.review_count | formatNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="reputation_point" label="Reputations" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.reputation_point | formatNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="subscriber_count" label="Subs" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.subscriber_count | formatNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Created At">
                <template slot-scope="scope">
                    <span>{{ scope.row.created_at | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Operations" fixed="right" width="220">
                <template slot-scope="scope">
                    <el-button
                        :type="scope.row.deleted_at == null ? '' : 'danger'"
                        icon="el-icon-remove-outline"
                        @click="switchLockUser(scope.row.id, scope.row.deleted_at)"
                    />
                    <el-button icon="el-icon-edit" @click="$router.push(`/admin/user/${scope.row.phone}/edit`)" />
                    <el-button icon="el-icon-key" @click="openChangePass(scope.row.id)" />
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="Đổi mật khẩu"
            :visible.sync="dialogVisibleInstant"
            width="30%"
        >
            <PasswordForm :re-open-form="dialogVisibleInstant" :user-id="userIdChangePass" @finishForm="updatePassword" />
        </el-dialog>
    </div>
</template>

<script>
    import { findIndex } from 'lodash';
    import cloneDeep from 'lodash/cloneDeep';
    import { mapState } from 'vuex';
    import PasswordForm from '~/components/admin/user/PasswordForm.vue';

    export default {
        components: {
            PasswordForm,
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
                dialogVisibleInstant: false,
                userIdChangePass: -1,
            };
        },

        computed: {
            ...mapState('admin/user', ['user']),
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
            switchLockUser(id, deleteAt) {
                if (deleteAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.lockUser(id);
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
                    this.unLockUser(id);
                }
            },

            async lockUser(id) {
                await this.$store.dispatch('admin/user/lock', { id });
                const newItem = this.user;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem.data });
            },

            async unLockUser(id) {
                await this.$store.dispatch('admin/user/unLock', { id });
                const newItem = this.user;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...newItem.data });
            },

            async updatePassword(payload) {
                try {
                    await this.$axios.put(`/admin/user/${this.userIdChangePass}/change-pass`, payload);
                    this.dialogVisibleInstant = false;
                    this.$message({
                        message: 'Update success.',
                        type: 'success',
                    });
                } catch ($e) {
                    this.$message({
                        message: 'Thất bại',
                        type: 'error',
                    });
                }
            },

            openChangePass(id) {
                this.dialogVisibleInstant = true;
                this.userIdChangePass = id;
            },
        },
    };
</script>
