<template>
    <div>
        <el-table :data="dataTable" stripe class="w-full">
            <el-table-column
                type="index"
                width="50"
            />
            <el-table-column prop="code" label="Mã">
                <template slot-scope="scope">
                    <span>{{ scope.row.code }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="commissionValue" label="Số tiền">
                <template slot-scope="scope">
                    <span>{{ scope.row.commissionValue || 0 | formatNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày thanh toán">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | formatDate }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hành động">
                <template slot-scope="scope">
                    <div class="inline-block">
                        <router-link :to="`/admin/pos-billing/${scope.row.id}/delete`">
                            <el-button icon="el-icon-remove-outline" />
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
            ...mapState('admin/posBilling', ['billings']),
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
