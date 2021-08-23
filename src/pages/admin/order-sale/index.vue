<template>
    <div>
        <PageHeader :title="'Đơn hàng '" />
        <div class="w-full 2xl:w-1/2">
            <div class="flex">
                <div class="mr-5">
                    <DateRange
                        :selected-range="[$route.query.fromDate, $route.query.toDate]"
                        @changeDateRange="updateDaterange"
                    />
                </div>
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
                    v-model="tableFilter.searchCode"
                    placeholder="Tìm mã"
                    class="input-with-select mr-5"
                    clearable
                />
                <el-input
                    v-model="tableFilter.searchKey"
                    placeholder="Tìm tên"
                    class="input-with-select mr-5"
                    clearable
                />
                <el-button type="primary" icon="el-icon-search" @click="updateSearch">
                    Tìm kiếm
                </el-button>
                <el-button
                    type="success"
                    :disabled="loading"
                    icon="el-icon-download"
                    @click="downloadData"
                >
                    Tải xuống
                </el-button>
            </div>
        </div>
        <div>
            <TableOrder />
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
    import * as download from 'downloadjs';
    import DateRange from '~/components/admin/shared/form/Datepicker.vue';
    import Select from '~/components/admin/shared/form/Select.vue';
    import TableOrder from '~/components/admin/order/Table.vue';
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
            await store.dispatch('admin/order/fetch', clean);
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
                loading: false,
            };
        },

        computed: {
            ...mapState('admin/order', ['orders', 'pagination']),
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
            updateSearch() {
                const page = null;
                this.fetchData({ page });
            },
            async downloadData() {
                if (this.$route.query.toDate == null) {
                    this.$confirm('Bạn phải chọn khoảng ngày khi xuất file', 'Cảnh báo', {
                        confirmButtonText: 'Xác nhận',
                        type: 'warning',
                    });
                } else {
                    this.loading = true;
                    await this.$axios.get(
                        '/admin/order/history',
                        {
                            params: { ...this.$route.query, download: true },
                            responseType: 'blob',
                        },
                    )
                        .then((response) => {
                            download(
                                response.data,
                                `don-hang-${new Date().toLocaleDateString()}.xlsx`,
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml',
                            );
                        }).catch(console.error);
                    this.loading = false;
                }
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
