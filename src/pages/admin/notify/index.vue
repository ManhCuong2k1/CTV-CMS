<template>
    <div>
        <PageHeader :title="'Thông báo nổi'" />
        <div class="w-1/2">
            <div class="flex">
                <div class="mr-5">
                    <DateRange
                        :selected-range="[$route.query.fromDate, $route.query.toDate]"
                        @changeDateRange="updateDaterange"
                    />
                </div>
            </div>
            <div class="mt-5 flex">
                <el-input
                    v-model="tableFilter.searchKey"
                    placeholder="Tìm kiếm"
                    class="input-with-select mr-5"
                    clearable
                    @clear="updateSearchKey"
                />
                <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                    Tìm kiếm
                </el-button>
                <nuxt-link class="ml-3" to="/admin/notify/create">
                    <el-button type="success" icon="el-icon-plus">
                        Tạo mới
                    </el-button>
                </nuxt-link>
            </div>
        </div>
        <div>
            <TableNotify :data="notify" />
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
    import TableNotify from '~/components/admin/notify/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            TableNotify,
            PageHeader,
            Pagination,
            DateRange,
        },

        watchQuery: true,

        async asyncData({ query, store }) {
            const initFilter = {
                fromDate: null,
                toDate: null,
                status: null,
                searchKey: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = omitBy(filter, isNull);
            await store.dispatch('admin/notify/fetch', clean);
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
            ...mapState('admin/notify', ['notify', 'notifyForm', 'pagination']),
        },
        methods: {
            async fetchData(notifyFilter) {
                const filter = omitBy({ ...this.$route.query, ...this.tableFilter, ...notifyFilter }, isNull);
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
            updateSearchKey() {
                const searchKey = this.tableFilter.searchKey;
                this.fetchData({ searchKey });
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
