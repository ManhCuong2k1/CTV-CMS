<template>
    <div>
        <el-table :data="dataTable" stripe class="w-full">
            <el-table-column
                type="index"
                width="50"
            />
            <el-table-column prop="name" label="Tên">
                <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="city" label="Khu vực">
                <template slot-scope="scope">
                    <span v-if="scope.row.City">{{ scope.row.City.name }}, {{ scope.row.District.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="Email">
                <template slot-scope="scope">
                    <span>{{ scope.row.email }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="Điện thoại">
                <template slot-scope="scope">
                    <span>{{ scope.row.phone }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="lastTotalRevenue" label="Lợi nhuận">
                <template slot-scope="scope">
                    <span>{{ scope.row.lastTotalRevenue || 0 | formatNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="Trạng thái">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status !== 'confirm'" type="danger" effect="dark">
                        Chưa duyệt
                    </el-tag>
                    <el-tag v-else type="success" effect="dark">
                        Đã duyệt
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Ngày tạo">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động">
                <template slot-scope="scope">
                    <div class="inline-block">
                        <router-link :to="`/admin/point-of-sale/${scope.row.id}/edit`">
                            <el-button icon="el-icon-edit" />
                        </router-link>
                    </div>
                    <div class="inline-block">
                        <router-link :to="`/admin/point-of-sale/${scope.row.id}/billing`">
                            <el-button icon="el-icon-s-promotion" />
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

        computed: {
            ...mapState('admin/pointofsale', ['pointofsales']),
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
