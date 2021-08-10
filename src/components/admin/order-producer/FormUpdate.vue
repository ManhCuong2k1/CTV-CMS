<template>
    <div>
        <div class="text-xl mb-1">
            {{ `Mã đơn: ${data.code}` }}
        </div>
        <div class="text-xl mb-1">
            {{ `Nhà phân phối: ${data.Admin.name} - Điện thoại: ${data.Admin.phone || ""}` }}
        </div>
        <div class="text-xl mb-4">
            {{ `Địa chỉ: ${data.Admin.address || ""}, ${data.Admin.District.name}, ${data.Admin.City.name}` }}
        </div>
        <div class="flex mb-3">
            <div class="mr-2">
                <span class="mr-2">Vận chuyển công ty: </span>
                <el-select
                    v-model="TransporterId"
                    placeholder="Tìm nhân viên"
                    filterable
                    remote
                    clearable
                    :remote-method="remoteTransporter"
                    :loading="loading"
                >
                    <el-option
                        v-for="item in optionTransporters"
                        :key="item.slug"
                        :label="item.label"
                        :value="item.slug"
                    />
                </el-select>
            </div>
            <div>
                <el-button type="primary" @click="saveTransporterId">
                    Lưu
                </el-button>
            </div>
        </div>
        <div class="flex mb-1">
            <div class="mr-2" style="line-height: 40px">
                Vận chuyển vãng lai:
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
            <div class="pb-5">
                <span class="font-bold text-2xl text-red-500">Tổng đơn: </span>
                <span class="text-2xl text-red-500">{{ data.total || 0 | formatNumber }}đ</span>
                <div class="mt-2">
                    <status-tag :status="data.status" />
                </div>
            </div>
            <el-table :data="data.ProductOrderProducers" class="w-full">
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
            <div v-if="userLoged.type == 'admin'" class="mt-5">
                <span v-if="data.status == 'created'">
                    <el-button type="success" icon="el-icon-check" @click="updateOrderProducer('processing')">
                        Nhận đơn
                    </el-button>
                </span>
                <span v-if="data.status == 'processing'">
                    <el-button type="success" icon="el-icon-check" @click="updateOrderProducer('shipping')">
                        Đang vận chuyển
                    </el-button>
                </span>
                <span v-if="data.status == 'shipping'">
                    <el-button type="success" icon="el-icon-check" @click="updateOrderProducer('success')">
                        Hoàn thành
                    </el-button>
                </span>
                <span class="ml-3">
                    <el-button type="danger" icon="el-icon-delete" @click="updateOrderProducer('canceled')">
                        Hủy đơn
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
        },

        methods: {
            toImage,
            updateOrderProducer(status) {
                this.$confirm('Bạn sẽ cập nhật đơn hàng này ?', 'Xác nhận', {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Bỏ qua',
                    type: 'warning',
                }).then(() => {
                    this.$emit('submitForm', { status });
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
            async remoteTransporter(query) {
                this.loading = true;
                await this.$store.dispatch('admin/common/searchTransporters', { query });
                this.loading = false;
            },
            async saveTransporterAnoy() {
                try {
                    await this.$axios.put(`/admin/order-producer/${this.data.id}`, { TransporterAnoy: this.TransporterAnoy });
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
                    await this.$axios.put(`/admin/order-producer/${this.data.id}`, { TransporterId: this.TransporterId });
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
