<template>
    <div>
        <div>
            <PageHeader :title="'Lịch sử quà'" />
            <div class="w-full">
                <div class="flex">
                    <div class="mr-2 flex-grow-0 leading-10">
                        Ngày tạo
                    </div>

                    <div class="mr-5">
                        <DateRange
                            :selected-range="[$route.query.fromDate, $route.query.toDate]"
                            @changeDateRange="updateDaterange"
                        />
                    </div>
                    <div class="mr-5">
                        <el-input
                            v-model="tableFilter.searchKey"
                            placeholder="Tìm kiếm tên thành viên"
                            class="input-with-select mr-5"
                            clearable
                            @clear="updateSearchKeyproduct"
                        />
                    </div>
                    <el-button type="primary" icon="el-icon-search" @click="updateSearchKeyproduct">
                        Tìm kiếm
                    </el-button>
                </div>
            </div>
            <div>
                <el-table :data="histories" class="w-full">
                    <el-table-column
                        type="index"
                        width="50"
                    />
                    <el-table-column prop="OrderCode" label="Mã Đơn">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Order.code }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Product" label="Sản phẩm mua">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Product.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="PointOfSaleName" label="Thành viên">
                        <template slot-scope="scope">
                            <span>{{ scope.row.Order.PointOfSale.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Amount" label="Số lượng">
                        <template slot-scope="scope">
                            <span>{{ scope.row.amount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="CreatedAt" label="Ngày tạo">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createdAt | formatDate }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <Pagination
                    :page-size="pagination.pageSize"
                    :total="pagination.total"
                    :current-page="pagination.page"
                    @changePage="updatePage"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { format } from 'date-fns';
    import { mapState } from 'vuex';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import { cleanObject } from '~/utils/object';
    import DateRange from '~/components/admin/shared/form/Datepicker.vue';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            Pagination,
            DateRange,
        },

        async asyncData({ query, store, params }) {
            const initFilter = {
                searchKey: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/promotionHistory/fetch', { promotionId: params.id, ...clean });
            return {
                tableFilter: filter,
            };
        },

        watchQuery: true,
        data() {
            return {
                popupProduct: false,
            };
        },

        computed: {
            ...mapState('admin/promotionHistory', ['histories', 'pagination']),
        },

        methods: {
            async fetchData(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.fetchData({ page });
            },
            updateDaterange(value) {
                let fromDate = null;
                let toDate = null;
                const page = null;

                if (value !== null) {
                    fromDate = format(new Date(value[0]), 'yyyy-MM-dd');
                    toDate = format(new Date(value[1]), 'yyyy-MM-dd');
                }
                this.fetchData({ fromDate, toDate, page });
            },
            updateSearchKeyproduct() {
                this.fetchData({ page: null });
            },
        },
    };
</script>

<style lang="sass">
    .el-range-separator
        box-sizing: content-box
    .el-button:focus
        outline: none !important
</style>
