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
            <el-table-column prop="startDate" label="Ngày bắt đầu">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ scope.row.startDate * 1000 | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="endDate" label="Ngày kết thúc">
                <template slot-scope="scope">
                    <span class="text-line-2">{{ scope.row.endDate * 1000 | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="minmax" label="Số lượng mua">
                <template slot-scope="scope">
                    <span>{{ scope.row.minPerOrder }} ~ </span>
                    <span>{{ scope.row.maxPerOrder }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="promotionAmount" label="Giá trị">
                <template slot-scope="scope">
                    <span>{{ scope.row.promotionAmount }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động">
                <template slot-scope="scope">
                    <el-dropdown trigger="click">
                        <el-button
                            :type="scope.row.deletedAt == null ? '' : 'danger'"
                            icon="el-icon-setting"
                        />
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <router-link :to="`/admin/promotion/${scope.row.id}/edit`">
                                    Sửa
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <router-link :to="`/admin/promotion/${scope.row.id}/products`">
                                    Sản phẩm
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.type == 'gift'">
                                <router-link :to="`/admin/promotion/${scope.row.id}/history`">
                                    Lịch sử nhận
                                </router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div @click="switchDeletePromotion(scope.row.id, scope.row.deletedAt)">
                                    {{ scope.row.deletedAt == null ? 'Xóa' : 'Khôi phục' }}
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
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
            ...mapState('admin/promotion', ['promotion', 'promotions']),
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
            switchDeletePromotion(id, deletedAt) {
                if (deletedAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeletePromotion(id);
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
                    this.actionRestorePromotion(id);
                    this.$message({
                        type: 'success',
                        message: 'Khôi phục thành công',
                    });
                }
            },

            async actionDeletePromotion(id) {
                await this.$store.dispatch('admin/promotion/delete', { id });
                const promotionItem = this.promotion;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...promotionItem });
            },

            async actionRestorePromotion(id) {
                await this.$store.dispatch('admin/promotion/restore', { id });
                const promotionItem = this.promotion;
                const index = findIndex(this.dataTable, { id });
                this.dataTable.splice(index, 1, { ...index, ...promotionItem });
            },
        },
    };
</script>
