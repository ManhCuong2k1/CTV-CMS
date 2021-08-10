<template>
    <div>
        <PageHeader :title="'Comment'" />
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
                        :options="optionStatus"
                        :placeholder="'Status'"
                        :selected="$route.query.status"
                        @changeValue="updateSelect"
                    />
                </div>
            </div>
            <div class="mt-5 flex">
                <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                    Search
                </el-button>
            </div>
        </div>
        <div>
            <TableComment :data="comments" />
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
    import { mapState } from 'vuex';
    import { format } from 'date-fns';
    import { cleanObject } from '~/utils/object';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import TableComment from '~/components/admin/comment/Table.vue';
    import DateRange from '~/components/admin/shared/form/Datepicker.vue';
    import Select from '~/components/admin/shared/form/Select.vue';
    import { TRASH_STATUS } from '~/constants/common';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            TableComment,
            DateRange,
            Select,
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
            const cleanFilter = cleanObject(filter);
            await store.dispatch('admin/comment/fetch', cleanFilter);
            return {
                cleanFilter,
            };
        },

        data() {
            return {
                optionStatus: TRASH_STATUS,
                dateValue: undefined,
            };
        },

        computed: {
            ...mapState('admin/comment', ['comments', 'comment', 'pagination']),
        },

        methods: {
            async fetchData(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.cleanFilter, ...newFilter });
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
                const page = null;
                this.fetchData({ page });
            },
            updateSelect(status) {
                const page = null;
                this.fetchData({ status, page });
            },
        },
    };
</script>
