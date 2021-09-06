<template>
    <div>
        <PageHeader :title="'Báo cáo doanh thu cộng tác viên'" />
        <div class="w-full md:w-1/2">
            <div class="mt-5 flex flex-wrap md:flex-nowrap">
                <el-input
                    v-model="tableFilter.searchKey"
                    placeholder="Tìm kiếm theo tên cộng tác viên"
                    class="mr-5 mb-2"
                    clearable
                    @clear="updateSearchKey"
                />
                <span>
                    <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                        Tìm kiếm
                    </el-button>
                </span>
            </div>
        </div>
        <TableRevenue :data="pointofsales" />
        <div>
            <Pagination
                :page-size="pagination.pageSize"
                :total="pagination.total"
                :current-page="pagination.page"
                @changePage="updatePage"
            />
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import TableRevenue from '~/components/admin/collaborator-revenue/Table.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            Pagination,
            TableRevenue,
        },

        watchQuery: true,

        async asyncData({ query, store }) {
            const initFilter = {
                searchKey: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/pointofsale/fetchRevenue', clean);
            return {
                tableFilter: filter,
            };
        },

        data() {
            return {
                dialogForm: false,
                dialogView: false,
                productForm: null,
                productFormView: null,
                dateValue: undefined,
            };
        },

        computed: {
            ...mapState('admin/pointofsale', ['pointofsales', 'pagination']),
        },

        methods: {
            async fetchData(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.fetchData({ page });
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
