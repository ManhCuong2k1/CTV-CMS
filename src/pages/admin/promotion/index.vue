<template>
    <div>
        <PageHeader :title="'Khuyến mãi'" />
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
                        placeholder="Tìm kiếm"
                        class="input-with-select mr-5"
                        clearable
                        @clear="updateSearchKey"
                    />
                </div>
                <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                    Tìm kiếm
                </el-button>
                <nuxt-link class="ml-3" to="/admin/promotion/create">
                    <el-button type="success" icon="el-icon-plus">
                        Tạo mới
                    </el-button>
                </nuxt-link>
            </div>
        </div>
        <div>
            <TablePromotion :data="promotions" />
        </div>
        <div>
            <Pagination
                :page-size="pagination.pageSize"
                :total="pagination.total"
                :current-page="pagination.page"
                @changePage="updatePage"
            />
            <Pagination
                @changePage="updatePage"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { omitBy, isNull } from 'lodash';
    import { format } from 'date-fns';
    import DateRange from '~/components/admin/shared/form/Datepicker.vue';
    import TablePromotion from '~/components/admin/promotion/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            TablePromotion,
            PageHeader,
            Pagination,
            DateRange,
        },

        watchQuery: true,

        async asyncData({ query, store }) {
            const initFilter = {
                fromDate: null,
                toDate: null,
                searchKey: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = omitBy(filter, isNull);
            await store.dispatch('admin/promotion/fetch', clean);
            return {
                tableFilter: filter,
            };
        },

        data() {
            return {
                dateValue: undefined,
            };
        },

        computed: {
            ...mapState('admin/promotion', ['promotions', 'promotion', 'pagination']),
        },
        methods: {
            async fetchData(newFilter) {
                const filter = omitBy({ ...this.$route.query, ...this.tableFilter, ...newFilter }, isNull);
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
            updateSelect(status) {
                const page = null;
                this.fetchData({ status, page });
            },
            updateSearchKey() {
                const page = null;
                this.fetchData({ page });
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
