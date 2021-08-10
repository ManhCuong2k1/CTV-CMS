<template>
    <div>
        <PageHeader :title="'Thành viên'" />
        <div class="w-1/2">
            <div class="flex">
                <div class="mr-5">
                    <DateRange
                        :selected-range="[$route.query.fromDate, $route.query.toDate]"
                        @changeDateRange="updateDaterange"
                    />
                </div>
                <div class="flex-1">
                    <Select
                        :options="optionPosition"
                        :placeholder="'Position'"
                        :selected="$route.query.position"
                        @changeValue="updateSelect"
                    />
                </div>
            </div>
            <div class="mt-5 flex">
                <el-input
                    v-model="tableFilter.searchKey"
                    placeholder="Search"
                    class="input-with-select mr-5"
                    clearable
                    @clear="updateSearchKey"
                />
                <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                    Search
                </el-button>
            </div>
        </div>
        <div>
            <TableUser :data="users" />
        </div>
        <div>
            <Pagination
                :page-size="pagination.per_page"
                :total="pagination.total"
                :current-page="pagination.current_page"
                @changePage="updatePage"
            />
        </div>
    </div>
</template>

<script>
    import { format } from 'date-fns';
    import { omitBy, isNull } from 'lodash';
    // import { mapState } from 'vuex';
    import { USER_POSITION } from '~/constants/user';
    import DateRange from '~/components/admin/shared/form/Datepicker.vue';
    import Select from '~/components/admin/shared/form/Select.vue';
    import TableUser from '~/components/admin/user/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            DateRange,
            Select,
            TableUser,
            Pagination,
        },

        watchQuery: true,

        async asyncData({ query, $axios }) {
            const initFilter = {
                fromDate: null,
                toDate: null,
                position: null,
                searchKey: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const params = omitBy(filter, isNull);
            const { data, meta } = await $axios.$get('/admin/user', { params });
            return {
                tableFilter: filter,
                users: data,
                pagination: meta,
            };
        },

        data() {
            return {
                optionPosition: USER_POSITION,
                dateValue: undefined,
            };
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
            updateSelect(position) {
                const page = null;
                this.fetchData({ position, page });
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
