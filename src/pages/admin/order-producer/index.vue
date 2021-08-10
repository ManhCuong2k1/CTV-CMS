<template>
    <div>
        <PageHeader :title="'Đơn hàng sản xuất'" />
        <div class="w-full">
            <div class="flex flex-wrap">
                <div class="mr-5 mt-2">
                    <DateRange
                        :selected-range="[$route.query.fromDate, $route.query.toDate]"
                        @changeDateRange="updateDaterange"
                    />
                </div>
                <div class="mr-5 mt-2">
                    <Select
                        :options="optionStatus"
                        :placeholder="'Trạng thái'"
                        :selected="$route.query.status"
                        @changeValue="updateSelectStatus"
                    />
                </div>
                <div class="mr-5 mt-2">
                    <Select
                        :options="optionCities"
                        :placeholder="'Thành Phố'"
                        :selected="cityIdLabel"
                        @changeValue="updateSelectCity"
                    />
                </div>
                <div class="mr-5 mt-2">
                    <Select
                        :options="optionDistricts"
                        :placeholder="'Quận huyện'"
                        :selected="districtIdLabel"
                        @changeValue="updateSelectDistrict"
                    />
                </div>
                <div class="mr-5 mt-2">
                    <el-input
                        v-model="tableFilter.searchKey"
                        placeholder="Tìm mã"
                        clearable
                    />
                </div>
                <div class="mr-5 mt-2">
                    <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                        Tìm kiếm
                    </el-button>
                </div>
                <div class="mr-5 mt-2 hidden">
                    <nuxt-link to="/admin/orderProducer/create">
                        <el-button type="success" icon="el-icon-plus">
                            Tạo mới
                        </el-button>
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div>
            <TableOrder :data="orderProducers" />
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
    import TableOrder from '~/components/admin/order-producer/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import { cleanObject } from '~/utils/object';
    import { ORDER_STATUS } from '~/constants/order';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            DateRange,
            Select,
            TableOrder,
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
            await store.dispatch('admin/orderProducer/fetch', clean);
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
                dateValue: undefined,
                optionStatus: ORDER_STATUS,
                nameCity: null,
                districts: null,
            };
        },

        computed: {
            ...mapState('admin/orderProducer', ['orderProducers', 'pagination']),
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
            async updateSelectCity(cityId) {
                await this.$store.dispatch('admin/common/searchDistrics', { cityId });
                this.fetchData({ city: cityId, page: null });
            },
            updateSelectDistrict(id) {
                this.selectedDistrict = id;
                this.fetchData({ district: this.selectedDistrict, page: null });
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
