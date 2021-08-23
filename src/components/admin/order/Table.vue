<template>
    <div>
        <el-table :data="orders" class="w-full">
            <el-table-column
                prop="code"
                label="ID"
            />
            <el-table-column prop="name" label="Tên">
                <template slot-scope="scope">
                    <span>{{ scope.row.PointOfSale.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="Điện thoại">
                <template slot-scope="scope">
                    <span>{{ scope.row.PointOfSale.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="city" label="Khu vực">
                <template slot-scope="scope">
                    <span>{{ scope.row.PointOfSale.City.name }}, {{ scope.row.PointOfSale.District.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="totalAfterPromotion" label="Tổng tiền">
                <template slot-scope="scope">
                    {{ scope.row.totalAfterPromotion || 0 | formatNumber }}
                </template>
            </el-table-column>
            <el-table-column prop="status" label="Trạng thái">
                <template slot-scope="scope">
                    <StatusTag :status="scope.row.status" />
                </template>
            </el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày cập nhật">
                <template slot-scope="scope">
                    <span>{{ scope.row.updatedAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" fixed="right" max-width="220">
                <template slot-scope="scope">
                    <div>
                        <nuxt-link :to="`/admin/order-sale/${scope.row.id}/edit`">
                            <el-button icon="el-icon-view" />
                        </nuxt-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import StatusTag from '~/components/admin/shared/StatusTag.vue';

    export default {
        components: {
            StatusTag,
        },

        computed: {
            ...mapState('admin/order', ['orders', 'orderDelete', 'orderRestore']),
        },

        methods: {
            switchDeleteOrder(id, status) {
                if (status !== 'canceled') {
                    this.$prompt('Nhập lý do huỷ đơn', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(({ value }) => {
                        this.actionDeleteOrder({ id, value });
                        this.$message({
                            type: 'success',
                            message: 'Huỷ đơn thành công',
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Đã bỏ qua',
                        });
                    });
                } else {
                    this.$confirm('Bạn sẽ khôi phục đơn này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionRestoreOrder(id);
                        this.$message({
                            type: 'success',
                            message: 'Khôi phục đơn thành công',
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Đã bỏ qua',
                        });
                    });
                }
            },

            async actionDeleteOrder(payload) {
                await this.$store.dispatch('admin/order/delete', payload);
            },

            async actionRestoreOrder(id) {
                await this.$store.dispatch('admin/order/restore', { id });
            },
        },
    };
</script>
