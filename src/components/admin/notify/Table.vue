<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column prop="timeSend" label="Thời gian gửi" width="200">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ scope.row.timeSend | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="Status" width="200">
                <template slot-scope="scope">
                    <el-tag
                        v-if="scope.row.status === 'notsend'"
                        effect="dark"
                    >
                        <span class="capitalize">Chưa gửi</span>
                    </el-tag>
                    <el-tag
                        v-if="scope.row.status === 'sent'"
                        effect="dark"
                        type="success"
                    >
                        <span class="capitalize">Đã gửi</span>
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="content" label="Nội dung" min-width="220">
                <template slot-scope="scope">
                    <div class="text-line-2">
                        {{ scope.row.content }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" fixed="right" width="220">
                <template slot-scope="scope">
                    <el-button
                        :type="scope.row.deletedAt == null ? '' : 'danger'"
                        icon="el-icon-remove-outline"
                        @click="switchDeleteNotify(scope.row.id, scope.row.deletedAt)"
                    />
                    <div class="inline-block">
                        <router-link :to="`/admin/notify/${scope.row.id}/edit`">
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
            ...mapState('admin/notify', ['notifyForm', 'notify']),
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
            switchDeleteNotify(id, deletedAt) {
                if (deletedAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteNotify(id);
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
                }
            },

            async actionDeleteNotify(id) {
                await this.$store.dispatch('admin/notify/delete', { id });
                await this.$store.dispatch('admin/notify/fetch');
            },
        },
    };
</script>
