<template>
    <div>
        <el-table :data="dataTable" stripe class="w-full">
            <el-table-column
                prop="name"
                label="Tên"
                fixed="left"
                min-width="100"
            >
                <template slot-scope="scope">
                    <p class="break-normal font-bold">
                        {{ scope.row.name }}
                    </p>
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
            <el-table-column label="Hành động">
                <template slot-scope="scope">
                    <el-button-group>
                        <el-button
                            icon="el-icon-delete"
                            @click="deleteProduct(scope.row.id)"
                        />
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import { image as toImage } from '~/utils/url';

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

        watch: {
            data: {
                handler() {
                    this.dataTable = cloneDeep(this.data);
                },
                deep: true,
            },
        },

        methods: {
            toImage,
            deleteProduct(productId) {
                this.$confirm('Bạn sẽ xóa bản ghi này ?', 'Cảnh báo', {
                    confirmButtonText: 'Xác nhận',
                    cancelButtonText: 'Bỏ qua',
                    type: 'warning',
                }).then(() => {
                    this.$emit('deletePromotion', productId);
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
            },
        },
    };
</script>
