<template>
    <div>
        <div class="border border-gray-500 rounded-md p-5 mt-5">
            <div class="pb-1">
                <span class="font-bold text-2xl text-red-500">Tổng đơn: </span>
                <span class="text-2xl text-red-500">{{ total || 0 | formatNumber }}đ</span>
            </div>
            <div class="pb-5">
                <span class="font-bold text-lg text-green-500">Chiết khấu: </span>
                <span class="text-lg text-green-500">{{ total * parseFloat(userLoged.percentDiscount) || 0 | formatNumber }}đ</span>
            </div>
            <el-table :data="dataTable" class="w-full">
                <el-table-column prop="name" label="Tên" min-width="200">
                    <template slot-scope="scope">
                        <div>
                            <img class="w-24 mb-3 m-auto" :src="toImage(scope.row.data.avatar, 'full')">
                        </div>
                        <p class="break-normal font-bold text-center">
                            {{ scope.row.data.name }}
                        </p>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="Giá">
                    <template slot-scope="scope">
                        <div v-if="scope.row.data.promotionPrice > 0">
                            <div class="line-through text-gray-400">
                                {{ scope.row.data.price || 0 | formatNumber }}
                            </div>
                            <div>{{ scope.row.data.promotionPrice || 0 | formatNumber }}</div>
                        </div>
                        <div v-else>
                            <div>
                                {{ scope.row.data.price || 0 | formatNumber }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="volumeUnit" label="Đơn vị">
                    <template slot-scope="scope">
                        <span>{{ scope.row.data.volumeUnit || "N/A" }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="amount" label="Số lượng" width="200">
                    <template slot-scope="scope">
                        <el-input-number v-model="scope.row.amount" :min="1" @change="$store.dispatch('admin/orderProducer/forceUpdateItemOrder', scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column label="Thành tiền">
                    <template slot-scope="scope">
                        <div v-if="scope.row.data.promotionPrice > 0">
                            <div>{{ scope.row.data.promotionPrice*scope.row.amount || 0 | formatNumber }}</div>
                        </div>
                        <div v-else>
                            <div>
                                {{ scope.row.data.price*scope.row.amount || 0 | formatNumber }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="Hành động" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            icon="el-icon-delete"
                            @click="deleteProductFromOrder(scope.row.data.id)"
                        />
                    </template>
                </el-table-column>
            </el-table>
            <div class="mt-5">
                <el-button type="success" icon="el-icon-check" @click="sendOrderProducer">
                    Gửi đơn
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import { image as toImage } from '~/utils/url';

    export default {
        props: {
            data: {
                type: Array,
                require: true,
            },
        },

        data() {
            const total = this.calTotal(this.data);
            return {
                dataTable: cloneDeep(this.data),
                loading: false,
                total,
            };
        },

        computed: {
            userLoged() {
                return this.$store.state.auth.user;
            },
        },

        watch: {
            dataTable: {
                handler() {
                    this.total = this.calTotal(this.dataTable);
                },
                deep: true,
            },
            data: {
                handler() {
                    this.dataTable = cloneDeep(this.data);
                },
                deep: true,
            },
        },

        methods: {
            toImage,
            calTotal(order) {
                let total = 0;
                order.forEach((element) => {
                    if (element.data.promotionPrice > 0) {
                        total += element.data.promotionPrice * element.amount;
                    } else {
                        total += element.data.price * element.amount;
                    }
                });
                total *= (1 - parseFloat(this.$store.state.auth.user.percentDiscount));
                return total;
            },
            deleteProductFromOrder(id) {
                this.$confirm('Bạn sẽ bỏ sản phẩm này ?', 'Xác nhận', {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Bỏ qua',
                    type: 'warning',
                }).then(() => {
                    this.$store.dispatch('admin/orderProducer/removeFromOrder', { id });
                    this.$message({
                        type: 'success',
                        message: 'Đã xóa',
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Không xóa',
                    });
                });
            },
            sendOrderProducer() {
                this.$confirm('Bạn sẽ gửi đơn hàng này ?', 'Xác nhận', {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Bỏ qua',
                    type: 'warning',
                }).then(() => {
                    this.$emit('submitForm');
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
        },
    };
</script>
