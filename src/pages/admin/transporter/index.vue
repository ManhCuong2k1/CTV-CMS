<template>
    <div>
        <PageHeader :title="'Nhân viên vận chuyển'" />
        <div class="w-3/4">
            <div class="mt-5 flex">
                <div class="flex-1 mr-5">
                    <el-input
                        v-model="tableFilter.searchKey"
                        placeholder="Tìm kiếm"
                        class="input-with-select mr-5"
                        clearable
                    />
                </div>
                <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                    Tìm kiếm
                </el-button>
                <nuxt-link class="ml-3" to="/admin/transporter/create">
                    <el-button type="success" icon="el-icon-plus">
                        Thêm mới
                    </el-button>
                </nuxt-link>
            </div>
        </div>
        <div>
            <TableTransporter :data="transporters" />
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
</template>

<script>
    import { mapState } from 'vuex';
    import TableTransporter from '~/components/admin/transporter/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            TableTransporter,
            Pagination,
        },

        watchQuery: true,

        async asyncData({ store, query }) {
            const initFilter = {
                city: null,
                searchKey: null,
                deletedAt: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/transporter/fetch', clean);
            await store.dispatch('admin/common/searchCities');
            return {
                tableFilter: filter,
            };
        },

        computed: {
            ...mapState('admin/transporter', ['transporters', 'pagination']),
            ...mapState('admin/common', ['optionCities']),
            userLoged() {
                return this.$store.state.auth.user;
            },
        },
        methods: {
            async fetchData(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.fetchData({ page });
            },
            updateSelectCity(cityId) {
                this.fetchData({ city: cityId, page: null });
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
