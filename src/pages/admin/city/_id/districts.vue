<template>
    <div>
        <div>
            <PageHeader :title="'Quận/Huyện'" />
            <div class="w-1/2">
                <div class="mt-5 flex">
                    <el-input
                        v-model="tableFilter.searchKey"
                        placeholder="Tìm kiếm"
                        class="input-with-select mr-5"
                        clearable
                        @clear="updateSearchKeyDistrict"
                    />
                    <el-button type="primary" icon="el-icon-search" @click="updateSearchKeyDistrict">
                        Tìm kiếm
                    </el-button>
                    <el-button type="success" icon="el-icon-plus" @click="openDialogDistrict()">
                        Thêm
                    </el-button>
                </div>
            </div>
            <div>
                <TableDistrict :data="districts" @editDistrictId="openDialogDistrict" />
            </div>
            <div>
                <Pagination
                    :page-size="paginationDistrict.pageSize"
                    :total="paginationDistrict.total"
                    :current-page="paginationDistrict.page"
                    @changePage="updatePage"
                />
            </div>
        </div>
        <el-dialog
            title="Quận/Huyện"
            :visible.sync="popupDistrict"
            :destroy-on-close="true"
        >
            <DistrictForm
                :district-data="districtData"
                @submitForm="finishDistrictForm"
            />
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TableDistrict from '~/components/admin/district/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import DistrictForm from '~/components/admin/district/Form.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            TableDistrict,
            Pagination,
            DistrictForm,
        },

        async asyncData({ query, store, params }) {
            const initFilter = {
                searchKey: null,
                page: query.page || 1,
                cityId: params.id,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/district/fetch', clean);
            return {
                tableFilter: filter,
            };
        },

        watchQuery: true,
        data() {
            return {
                popupDistrict: false,
                districtData: null,
                cityId: null,
            };
        },
        computed: {
            ...mapState('admin/district', ['districts', 'districtDetail', 'paginationDistrict']),
        },

        methods: {
            async fetchDistricts(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.fetchDistricts({ page });
            },
            async openDialogDistrict(id) {
                if (id != null) {
                    await this.$store.dispatch('admin/district/show', id);
                    this.districtData = this.districtDetail;
                } else {
                    this.districtData = null;
                }
                this.popupDistrict = true;
            },
            async finishDistrictForm(data) {
                if (data.id != null) {
                    await this.$store.dispatch('admin/district/update', { id: data.id, data });
                    await this.$store.dispatch('admin/district/fetch', this.tableFilter);
                } else {
                    data.CityId = this.$route.params.id;
                    await this.$store.dispatch('admin/district/create', { data });
                    await this.$store.dispatch('admin/district/fetch', this.tableFilter);
                }
                this.popupDistrict = false;
            },
            updateSelect(status) {
                const page = null;
                this.fetchDistricts({ status, page });
            },
            updateSearchKeyDistrict() {
                const page = null;
                this.fetchDistricts({ page });
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
