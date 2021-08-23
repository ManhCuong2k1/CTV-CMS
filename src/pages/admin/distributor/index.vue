<template>
    <div>
        <PageHeader :title="'Nhà cung cấp'" />
        <div class="w-full 2xl:w-1/2">
            <div class="flex">
                <div class="flex-1 mr-5">
                    <Select
                        :options="optionStatus"
                        :placeholder="'Trạng thái'"
                        :selected="$route.query.status"
                        @changeValue="updateSelectStatus"
                    />
                </div>
                <div class="flex-1 mr-5">
                    <Select
                        :options="optionCities"
                        :placeholder="'Thành Phố'"
                        :selected="cityIdLabel"
                        @changeValue="updateSelectCity"
                    />
                </div>
                <div class="flex-1">
                    <Select
                        :options="optionDistricts"
                        :placeholder="'Quận huyện'"
                        :selected="districtIdLabel"
                        @changeValue="updateSelectDistrict"
                    />
                </div>
            </div>
            <div class="mt-5 flex">
                <el-input
                    v-model="tableFilter.searchKey"
                    placeholder="Tìm kiếm"
                    class="input-with-select mr-5"
                    clearable
                />
                <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                    Tìm kiếm
                </el-button>
                <nuxt-link class="ml-3" to="/admin/distributor/create">
                    <el-button type="success" icon="el-icon-plus">
                        Tạo mới
                    </el-button>
                </nuxt-link>
            </div>
        </div>
        <div>
            <TableDistributor :data="distributors" />
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
    import { format } from 'date-fns';
    import Select from '~/components/admin/shared/form/Select.vue';
    import TableDistributor from '~/components/admin/distributor/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            Select,
            TableDistributor,
            Pagination,
        },

        watchQuery: true,

        async asyncData({ store, query, $axios }) {
            const initFilter = {
                fromDate: null,
                toDate: null,
                city: null,
                district: null,
                searchKey: null,
                status: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/distributor/fetch', clean);
            await store.dispatch('admin/common/searchCities');
            await store.dispatch('admin/common/searchDistrics', { cityId: filter.city });
            const districtIdData = await $axios.get(`/admin/district/${query.district}`);
            const districtIdLabel = districtIdData.data.name;
            const cityIdData = await $axios.get(`/admin/city/${query.city}`);
            const cityIdLabel = cityIdData.data.name;
            return {
                districtIdLabel,
                cityIdLabel,
                tableFilter: filter,
            };
        },

        data() {
            return {
                dateValue: undefined,
                optionStatus: {
                    ACTIVE: {
                        label: 'Hoạt động',
                        slug: 'active',
                    },
                    DELETED: {
                        label: 'Tạm dừng',
                        slug: 'deleted',
                    },
                },
                nameCity: null,
                districts: null,
            };
        },

        computed: {
            ...mapState('admin/distributor', ['distributors', 'pagination']),
            ...mapState('admin/common', ['optionCities']),
            ...mapState('admin/common', ['optionDistricts']),
        },
        methods: {
            async fetchData(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.fetchData({ page });
            },
            async updateSelectStatus(status) {
                this.fetchData({ status, page: null });
            },
            updateSelectCity(city) {
                this.fetchData({ city, page: null });
            },
            updateSelectDistrict(district) {
                this.fetchData({ district, page: null });
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
        },
    };
</script>

<style lang="sass">
    .el-range-separator
        box-sizing: content-box
    .el-button:focus
        outline: none !important
</style>
