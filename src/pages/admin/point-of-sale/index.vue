<template>
    <div @changePage="updatePage">
        <PageHeader :title="'Điểm bán'" />
        <div class="w-full 2xl:w-1/2">
            <div class="flex flex-wrap">
                <div class="mr-5">
                    <DateRange
                        :selected-range="[$route.query.fromDate, $route.query.toDate]"
                        @changeDateRange="updateDaterange"
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
                <nuxt-link v-if="userLoged.type == 'admin'" class="ml-3" to="/admin/point-of-sale/create">
                    <el-button type="success" icon="el-icon-plus">
                        Thêm mới
                    </el-button>
                </nuxt-link>
            </div>
        </div>
        <div>
            <TablePointOfSale :data="pointofsales" />
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
    import DateRange from '~/components/admin/shared/form/Datepicker.vue';
    import Select from '~/components/admin/shared/form/Select.vue';
    import TablePointOfSale from '~/components/admin/point-of-sale/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            DateRange,
            Select,
            TablePointOfSale,
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
                deletedAt: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/pointofsale/fetch', clean);
            await store.dispatch('admin/common/searchCities');
            await store.dispatch('admin/common/searchDistrics', { cityId: filter.city });
            const districtIdData = await $axios.get(`/admin/district/${query.district}`);
            const districtIdLabel = districtIdData.data.name;
            const cityIdData = await $axios.get(`/admin/city/${query.city}`);
            const cityIdLabel = cityIdData.data.name;
            return {
                tableFilter: filter,
                districtIdLabel,
                cityIdLabel,
            };
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapState('admin/pointofsale', ['pointofsales', 'pagination']),
            ...mapState('admin/common', ['optionCities']),
            ...mapState('admin/common', ['optionDistricts']),
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
                this.$forceUpdate();
                this.fetchData({ page });
            },
            updateSelectStatus(deletedAt) {
                this.fetchData({ deletedAt, page: null });
            },
            updateSelectCity(cityId) {
                this.fetchData({ city: cityId, page: null });
            },
            updateSelectDistrict(id) {
                this.fetchData({ district: id, page: null });
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
