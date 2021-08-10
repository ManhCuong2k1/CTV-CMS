<template>
    <div>
        <div>
            <PageHeader :title="'Thành phố'" />
            <div class="w-1/2">
                <div class="mt-5 flex">
                    <el-input
                        v-model="tableFilter.searchKey"
                        placeholder="Tìm kiếm"
                        class="input-with-select mr-5"
                        clearable
                        @clear="updateSearchKeyCity"
                    />
                    <el-button type="primary" icon="el-icon-search" @click="updateSearchKeyCity">
                        Tìm kiếm
                    </el-button>
                    <nuxt-link class="ml-3" to="/admin/city">
                        <el-button type="success" icon="el-icon-plus" @click="openDialogCity()">
                            Thêm
                        </el-button>
                    </nuxt-link>
                </div>
            </div>
            <div>
                <TableCity :data="cities" @editCityId="openDialogCity" />
            </div>
            <div>
                <Pagination
                    :page-size="paginationCity.pageSize"
                    :total="paginationCity.total"
                    :current-page="paginationCity.page"
                    @changePage="updatePage"
                />
            </div>
        </div>
        <el-dialog
            title="Tỉnh/Thành phố"
            :visible.sync="popupCity"
            :destroy-on-close="true"
        >
            <CityForm
                :city-data="cityData"
                @finishForm="finishCityForm"
            />
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TableCity from '~/components/admin/city/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import CityForm from '~/components/admin/city/Form.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            TableCity,
            Pagination,
            CityForm,
        },

        async asyncData({ query, store }) {
            const initFilter = {
                searchKey: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/city/fetch', clean);
            return {
                tableFilter: filter,
            };
        },

        watchQuery: true,
        data() {
            return {
                popupCity: false,
                cityData: null,
            };
        },
        computed: {
            ...mapState('admin/city', ['cities', 'cityDetail', 'paginationCity']),
        },

        methods: {
            async fetchData(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.fetchData({ page });
            },
            async openDialogCity(id) {
                if (id != null) {
                    await this.$store.dispatch('admin/city/show', id);
                    this.cityData = this.cityDetail;
                } else {
                    this.cityData = null;
                }
                this.popupCity = true;
            },
            async finishCityForm(data) {
                if (data.id != null) {
                    await this.$store.dispatch('admin/city/update', { id: data.id, data });
                } else {
                    await this.$store.dispatch('admin/city/create', { data });
                    await this.$store.dispatch('admin/city/fetch', this.tableFilter);
                }
                this.popupCity = false;
            },
            updateSelect(status) {
                const page = null;
                this.fetchData({ status, page });
            },
            updateSearchKeyCity() {
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
