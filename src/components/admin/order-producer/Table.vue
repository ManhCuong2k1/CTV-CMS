<template>
    <div>
        <el-table :data="dataTable" class="w-full">
            <el-table-column
                fixed
                prop="code"
                label="Mã đơn"
            />
            <el-table-column prop="name" label="Tên">
                <template slot-scope="scope">
                    <span v-if="scope.row.Admin">{{ scope.row.Admin.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="city" label="Khu vực">
                <template slot-scope="scope">
                    <span v-if="scope.row.Admin.City">{{ scope.row.Admin.City.name }}, {{ scope.row.Admin.District.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="Điện thoại">
                <template slot-scope="scope">
                    <span v-if="scope.row.Admin">{{ scope.row.Admin.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="transporter" label="Vận chuyển">
                <!-- <template slot-scope="scope">
                    <span v-if="!scope.row.Transporter">{{ scope.row.TransporterAnoy }}</span>
                    <span v-else>{{ scope.row.Transporter.name }}</span>
                </template> -->
            </el-table-column>
            <el-table-column prop="total" label="Tổng tiền">
                <template slot-scope="scope">
                    <span class="font-bold text-red-500">{{ scope.row.total | formatNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="Trạng thái">
                <template slot-scope="scope">
                    <span v-if="scope.row.status == 'created'" class="capitalize">Đã tạo</span>
                    <span v-if="scope.row.status == 'processing'" class="capitalize">Đang xử lý</span>
                    <span v-if="scope.row.status == 'shipping'" class="capitalize">Đang vận chuyển</span>
                    <span v-if="scope.row.status == 'success'" class="capitalize">Hoàn thành</span>
                    <span v-if="scope.row.status == 'canceled'" class="capitalize">Đã hủy</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày tạo | Ngày cập nhật">
                <template slot-scope="scope">
                    <div>{{ scope.row.createdAt | formatDate }}</div>
                    <div>{{ scope.row.updatedAt | formatDate }}</div>
                </template>
            </el-table-column>
            <el-table-column label="Hành động" width="170">
                <template slot-scope="scope">
                    <!-- <div>
                        <el-button
                            :type="scope.row.deletedAt == null ? '' : 'danger'"
                            icon="el-icon-delete"
                            @click="switchDeleteDistrictbutor(scope.row.id, scope.row.deletedAt)"
                        />
                    </div> -->
                    <div>
                        <nuxt-link :to="`/admin/order-producer/${scope.row.id}/edit`">
                            <el-button icon="el-icon-edit" />
                        </nuxt-link>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';

    export default {
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

        watch: {
            data: {
                handler() {
                    this.dataTable = cloneDeep(this.data);
                },
                deep: true,
            },
        },

        methods: {
        },
    };
</script>
