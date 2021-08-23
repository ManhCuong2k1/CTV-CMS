<template>
    <div>
        <div class="text-xl border-gray-400 border-2 p-2">
            {{ `Mã đơn: ${data.code}` }}
        </div>
        <div class="flex mb-2">
            <div class="w-1/2 border-gray-400 border-2 p-2">
                <div class="text-xl mb-1">
                    {{ `Khách hàng: ${data.customerFullname || ""}` }}
                </div>
                <div class="text-xl mb-1">
                    {{ `Điện thoại: ${data.customerPhone || ""}` }}
                </div>
                <div class="text-xl mb-1">
                    {{ `Địa chỉ: ${data.customerAddress || ""}, ${data.District ? data.District.name : ""}, ${data.City ? data.City.name : ""}` }}
                </div>
                <div class="text-xl mb-1">
                    {{ `Ghi chú: ${customerNote || ""}` }}
                </div>
            </div>
            <div class="w-1/2 border-gray-400 border-2 p-2">
                <div class="text-xl mb-1">
                    {{ `Thành viên: ${data.PointOfSale.name}` }}
                </div>
                <div class="text-xl mb-1">
                    {{ `Điện thoại: ${data.PointOfSale.phone}` }}
                </div>
                <div class="text-xl mb-1">
                    {{ `Địa chỉ: ${data.PointOfSale.address}, ${data.PointOfSale.District.name}, ${data.PointOfSale.City.name}` }}
                </div>
                <div v-if="data.noteDeleted" class="text-xl mb-4">
                    {{ `Lý do huỷ: ${data.noteDeleted || ''}` }}
                </div>
            </div>
        </div>
        <div class="flex mb-1">
            <div class="mr-2" style="line-height: 40px">
                SDT vận chuyển:
            </div>
            <div class="mr-2">
                <el-input v-model="TransporterAnoy" placeholder="Số điện thoại" />
            </div>
            <div>
                <el-button type="primary" @click="saveTransporterAnoy">
                    Lưu
                </el-button>
            </div>
        </div>
        <div class="border border-gray-500 rounded-md p-5 mt-5">
            <div class="pb-1">
                <span class="font-bold text-2xl text-red-500">Thành tiền: </span>
                <span class="text-2xl text-red-500">{{ (data.total - totalPromotionAmount) || 0 | formatNumber }}đ</span>
            </div>
            <div class="mt-2">
                <status-tag class="-ml-2" :status="data.status" />
            </div>
            <el-table :data="data.ProductOrders" class="w-full">
                <el-table-column prop="name" label="Tên" min-width="200">
                    <template slot-scope="scope">
                        <div>
                            <img class="w-24 mb-3 m-auto" :src="toImage(scope.row.Product.avatar, 'full')">
                        </div>
                        <p class="break-normal font-bold text-center">
                            {{ scope.row.Product.name }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="Giá">
                    <template slot-scope="scope">
                        <div v-if="scope.row.Product.promotionPrice > 0">
                            <div class="line-through text-gray-400">
                                {{ scope.row.Product.price || 0 | formatNumber }}
                            </div>
                            <div>{{ scope.row.Product.promotionPrice || 0 | formatNumber }}</div>
                        </div>
                        <div v-else>
                            <div>
                                {{ scope.row.Product.price || 0 | formatNumber }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="volumeUnit" label="Đơn vị">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Product.volumeUnit || "N/A" }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="Số lượng" width="200">
                    <template slot-scope="scope">
                        <span>{{ scope.row.amount || 0 | formatNumber }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="Thành tiền">
                    <template slot-scope="scope">
                        <div v-if="scope.row.Product.promotionPrice > 0">
                            <div>{{ scope.row.Product.promotionPrice*scope.row.amount || 0 | formatNumber }}</div>
                        </div>
                        <div v-else>
                            <div>
                                {{ scope.row.Product.price*scope.row.amount || 0 | formatNumber }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-5">
                <span v-if="data.status == 'created'" class="mr-3">
                    <el-button type="success" icon="el-icon-check" @click="updateOrder('processing')">
                        Nhận đơn
                    </el-button>
                </span>
                <span v-if="data.status == 'processing'" class="mr-3">
                    <el-button type="success" icon="el-icon-check" @click="updateOrder('shipping')">
                        Đang vận chuyển
                    </el-button>
                </span>
                <span v-if="data.status == 'shipping'" class="mr-3">
                    <el-button type="success" icon="el-icon-check" @click="updateOrder('success')">
                        Hoàn thành
                    </el-button>
                </span>
                <span>
                    <el-button
                        v-if="data.status !== 'canceled'"
                        type="danger"
                        icon="el-icon-delete"
                        @click="updateOrder('canceled')"
                    >
                        Hủy đơn
                    </el-button>
                    <el-button
                        v-if="data.status === 'canceled'"
                        type="success"
                        icon="el-icon-check"
                        @click="updateOrder('created')"
                    >
                        Khôi phục đơn
                    </el-button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { image as toImage } from '~/utils/url';
    import StatusTag from '../shared/StatusTag.vue';

    export default {
        components: { StatusTag },

        props: {
            data: {
                type: [Array, Object],
                require: true,
            },
        },

        data() {
            return {
                TransporterId: this.data.TransporterId,
                TransporterAnoy: this.data.TransporterAnoy,
                loading: false,
            };
        },

        computed: {
            ...mapState('admin/common', ['optionTransporters']),
            userLoged() {
                return this.$store.state.auth.user;
            },
            totalPromotionAmount() {
                let total = 0;
                this.data.ProductOrders.forEach((element) => {
                    total += element.promotionAmount;
                });
                return total;
            },
        },

        methods: {
            toImage,
            async remoteTransporter(query) {
                this.loading = true;
                await this.$store.dispatch('admin/common/searchTransporters', { query });
                this.loading = false;
            },
            updateOrder(status) {
                this.$confirm('Bạn sẽ cập nhật đơn hàng này ?', 'Xác nhận', {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Bỏ qua',
                    type: 'warning',
                }).then(() => {
                    this.sendOrder({ status });
                    this.$message({
                        type: 'success',
                        message: 'Gửi đơn',
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Không gửi',
                    });
                });
            },
            async sendOrder(form) {
                try {
                    await this.$axios.put(`/admin/order/${this.data.id}`, form);
                    await this.$store.dispatch('admin/order/show', this.data.id);
                    this.$message({
                        type: 'success',
                        message: 'Thành công',
                    });
                } catch ($e) {
                    this.$message({
                        message: 'Thay đổi lỗi.',
                        type: 'error',
                    });
                }
            },
            async saveTransporterAnoy() {
                try {
                    await this.$axios.put(`/admin/order/${this.data.id}`, { TransporterAnoy: this.TransporterAnoy });
                    this.$message({
                        type: 'success',
                        message: 'Thành công',
                    });
                } catch ($e) {
                    this.$message({
                        message: 'Thay đổi lỗi.',
                        type: 'error',
                    });
                }
            },
            async saveTransporterId() {
                try {
                    await this.$axios.put(`/admin/order/${this.data.id}`, { TransporterId: this.TransporterId });
                    this.$message({
                        type: 'success',
                        message: 'Thành công',
                    });
                } catch ($e) {
                    this.$message({
                        message: 'Thay đổi lỗi.',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>
