<template>
    <div>
        <PageHeader :title="'Báo cáo doanh thu'" />
        <div class="w-full">
            <div class="mt-5 flex flex-wrap md:flex-nowrap">
                <Select
                    class="mr-5 mb-2 md:w-40"
                    placeholder="Chọn thời gian"
                    :options="optionType"
                    :selected="$route.query.type"
                    @changeValue="updateSelect"
                />
                <div v-if="userLoged.type == 'admin'" class="mr-5 mb-2">
                    <el-select
                        :value="DistributorLabel"
                        placeholder="Nhà phân phối"
                        filterable
                        remote
                        :remote-method="remoteDistributor"
                        :loading="loading"
                        clearable
                        @change="updateDistributorId"
                    >
                        <el-option
                            v-for="item in optionDistributors"
                            :key="item.slug"
                            :label="item.label"
                            :value="item.slug"
                        />
                    </el-select>
                </div>
                <div class="mr-5 mb-2">
                    <el-select
                        :value="cityIdLabel"
                        placeholder="Thành phố"
                        clearable
                        @change="updateCityId"
                    >
                        <el-option
                            v-for="item in optionCities"
                            :key="item.slug"
                            :label="item.label"
                            :value="item.slug"
                        />
                    </el-select>
                </div>
                <div class="flex">
                    <div class="mr-5">
                        <DateRange
                            :selected-range="[$route.query.fromDate, $route.query.toDate]"
                            @changeDateRange="updateDaterange"
                        />
                    </div>
                </div>
                <div class="mr-5 mb-2">
                    <el-button
                        type="primary"
                        :disabled="times.length == 0 || loading"
                        icon="el-icon-download"
                        @click="downloadData"
                    >
                        Tải xuống
                    </el-button>
                </div>
            </div>
        </div>
        <div>
            <el-table :data="times" stripe class="w-full">
                <el-table-column
                    prop="formatCreatedAt"
                    label="Thời gian"
                >
                    <template slot-scope="scope">
                        <span v-if="$route.query.type === 'day'">
                            {{ moment(scope.row.formatCreatedAt, 'YYYYMMDD').format('DD-MM-YYYY') }}
                        </span>
                        <span v-if="$route.query.type === 'week'">
                            {{ moment(scope.row.formatCreatedAt, 'YYYYww').format('ww-YYYY') }}
                        </span>
                        <span v-else>
                            {{ moment(scope.row.formatCreatedAt, 'YYYYMM').format('MM-YYYY') }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="total" label="Doanh thu">
                    <template slot-scope="scope">
                        <span>{{ parseInt(scope.row.total) || 0 | formatNumber }}</span>
                    </template>
                </el-table-column>
            </el-table>
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
    import moment from 'moment';
    import * as download from 'downloadjs';
    import Select from '~/components/admin/shared/form/Select.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import DateRange from '~/components/admin/shared/form/Datepicker.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            Select,
            DateRange,
            Pagination,
        },

        watchQuery: true,

        async asyncData({ query, store, $axios }) {
            const initFilter = {
                fromDate: null,
                toDate: null,
                type: null,
                page: query.page || 1,
                DistributorId: null,
                CityId: null,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/common/searchCities');
            await store.dispatch('admin/common/searchDistributors', { query: query.DistributorId });
            await store.dispatch('admin/reportRevenue/fetch', clean);
            let DistributorLabel = '';
            const cityIdData = await $axios.get(`/admin/city/${query.CityId}`);
            const cityIdLabel = cityIdData.data.name;
            if (query.DistributorId) {
                const DistributorId = await $axios.get(`/admin/distributor/${query.DistributorId}`);
                DistributorLabel = DistributorId.data.name;
            }
            return {
                tableFilter: filter,
                cityIdLabel,
                DistributorLabel,
            };
        },

        data() {
            return {
                loading: false,
                optionType: [
                    {
                        slug: 'day',
                        label: 'Theo ngày',
                    },
                    {
                        slug: 'week',
                        label: 'Theo tuần',
                    },
                    {
                        slug: 'month',
                        label: 'Theo tháng',
                    },
                ],
            };
        },

        computed: {
            ...mapState('admin/common', ['optionCities', 'optionDistributors']),
            ...mapState('admin/reportRevenue', ['times', 'pagination']),
            userLoged() {
                return this.$store.state.auth.user;
            },
        },

        methods: {
            moment,
            async fetchData(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.fetchData({ page });
            },
            updateSelect(type) {
                const page = null;
                this.fetchData({ type, page });
            },
            updateDistributorId(DistributorId) {
                const page = null;
                this.DistributorId = DistributorId;
                this.fetchData({ DistributorId, page });
            },
            updateCityId(CityId) {
                const page = null;
                this.CityId = CityId;
                this.fetchData({ CityId, page });
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
            async remoteDistributor(query) {
                this.loading = true;
                await this.$store.dispatch('admin/common/searchDistributors', { query });
                this.loading = false;
            },
            async downloadData() {
                this.loading = true;
                await this.$axios.get(
                    '/admin/report/revenue',
                    {
                        params: { ...this.$route.query, download: true },
                        responseType: 'blob',
                    },
                )
                    .then((response) => {
                        download(
                            response.data,
                            `doanh-thu-${new Date().toLocaleDateString()}.xlsx`,
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml',
                        );
                    }).catch(console.error);
                this.loading = false;
            },
        },
    };
</script>
