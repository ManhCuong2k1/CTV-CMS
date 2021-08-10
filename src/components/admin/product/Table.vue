<template>
    <div>
        <el-table :data="products" stripe class="w-full">
            <el-table-column
                prop="name"
                label="Tên"
                fixed="left"
                min-width="100"
            >
                <template slot-scope="scope">
                    <div class="cursor-pointer" @click="userLoged.type !== 'admin' ? $emit('viewProductId', scope.row.id) : null">
                        <div>
                            <img class="w-24 mb-2 m-auto" :src="scope.row.avatar">
                        </div>
                        <p class="break-normal font-bold text-center">
                            {{ scope.row.name }}
                        </p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="Giá">
                <template slot-scope="scope">
                    <div v-if="scope.row.promotionPrice > 0">
                        <div class="line-through text-gray-400">
                            {{ scope.row.price || 0 | formatNumber }}
                        </div>
                        <div>{{ scope.row.promotionPrice || 0 | formatNumber }}</div>
                    </div>
                    <div v-else>
                        <div>
                            {{ scope.row.price || 0 | formatNumber }}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="volumeUnit" label="Đơn vị">
                <template slot-scope="scope">
                    <span>{{ scope.row.volumeUnit || "N/A" }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="volume" label="Còn lại">
                <template slot-scope="scope">
                    <span>{{ scope.row.volume || 0 | formatNumber }}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="totalPick" label="Lượt chọn">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalPick || 0 | formatNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="totalView" label="Lượt xem">
                <template slot-scope="scope">
                    <span>{{ scope.row.totalView || 0 | formatNumber }}</span>
                </template>
            </el-table-column> -->
            <el-table-column v-if="userLoged.type == 'admin'" label="Hành động">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                            :type="scope.row.deletedAt === null ? '' : 'danger'"
                            icon="el-icon-delete"
                            @click="switchDeleteProduct(scope.row.id, scope.row.deletedAt)"
                        />
                        <el-button
                            :type="scope.row.onHome ? 'success' : ''"
                            icon="el-icon-s-home"
                            @click="switchOnHomeProduct(scope.row.id, scope.row.onHome)"
                        />
                        <div class="inline-block">
                            <router-link :to="`/admin/product/${scope.row.id}/edit`">
                                <el-button icon="el-icon-edit" />
                            </router-link>
                        </div>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { image as toImage } from '~/utils/url';

    export default {
        data() {
            return {
                loadding: false,
            };
        },

        computed: {
            ...mapState('admin/product', ['products']),
            userLoged() {
                return this.$store.state.auth.user;
            },
        },

        methods: {
            toImage,
            switchDeleteProduct(id, deletedAt) {
                if (deletedAt === null) {
                    this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        cancelButtonText: 'Bỏ qua',
                        type: 'warning',
                    }).then(() => {
                        this.actionDeleteProduct(id);
                        this.$message({
                            type: 'success',
                            message: 'Xóa thành công',
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: 'Đã hủy xóa',
                        });
                    });
                } else {
                    this.actionRestoreProduct(id);
                }
            },

            async switchOnHomeProduct(id, onHome) {
                await this.$store.dispatch('admin/product/update', { id, data: { onHome: !onHome } });
            },

            async actionDeleteProduct(id) {
                await this.$store.dispatch('admin/product/delete', { id });
            },

            async actionRestoreProduct(id) {
                await this.$store.dispatch('admin/product/restore', { id });
            },
        },
    };
</script>
