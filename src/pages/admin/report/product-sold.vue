<template>
    <div>
        <PageHeader :title="'Báo cáo doanh thu'" />
        <div class="w-full md:w-1/2">
            <div class="mt-5 flex flex-wrap md:flex-nowrap">
                <Select
                    class="mr-5 mb-2"
                    :options="optionStatus"
                    :placeholder="'Trạng thái'"
                    :selected="$route.query.status"
                    @changeValue="updateSelect"
                />
                <el-input
                    v-model="tableFilter.searchKey"
                    placeholder="Tìm kiếm"
                    class="mr-5 mb-2"
                    clearable
                    @clear="updateSearchKey"
                />
                <span>
                    <el-button type="primary" icon="el-icon-search" @click="updateSearchKey">
                        Tìm kiếm
                    </el-button>
                </span>
                <nuxt-link class="ml-3" to="/admin/product/create">
                    <el-button type="success" icon="el-icon-plus">
                        Tạo mới
                    </el-button>
                </nuxt-link>
            </div>
        </div>
        <div>
            <el-table :data="dataTable" stripe class="w-full">
                <el-table-column
                    prop="name"
                    label="Tên"
                    fixed="left"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        <div class="cursor-pointer" @click="$emit('viewProductId', scope.row.id)">
                            <div>
                                <img class="w-24 mb-2 m-auto" :src="scope.row.avatar">
                            </div>
                            <p class="break-normal font-bold">
                                {{ scope.row.name }}
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="Giá">
                    <template slot-scope="scope">
                        <div v-if="scope.row.promotionPrice > 0">
                            <div class="line-through text-gray-400">
                                {{ scope.row.price || 0 | formatNumber }}
                            </div>
                            <div>{{ scope.row.promotionPrice || 0 | formatNumber }}</div>
                        </div>
                        <div v-else>
                            <div>
                                {{ scope.row.price || 0 | formatNumber }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalView" label="Lượt xem">
                    <template slot-scope="scope">
                        <span>{{ scope.row.totalView || 0 | formatNumber }}</span>
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
    import Select from '~/components/admin/shared/form/Select.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import { PRODUCT_STATUS } from '~/constants/product';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            Select,
            Pagination,
        },

        watchQuery: true,

        async asyncData({ query, store }) {
            const initFilter = {
                fromDate: null,
                toDate: null,
                status: null,
                searchKey: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/product/fetch', clean);
            await store.dispatch('admin/common/searchProductCates');
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
                optionStatus: PRODUCT_STATUS,
                dateValue: undefined,
            };
        },

        computed: {
            ...mapState('admin/product', ['products', 'product', 'pagination']),
        },

        methods: {
            async openForm(id) {
                if (id != null) {
                    await this.$store.dispatch('admin/product/show', id);
                    this.productForm = this.product;
                } else {
                    this.productForm = null;
                }
                this.dialogForm = true;
            },
            async finishForm(data) {
                if (data.id != null) {
                    await this.$store.dispatch('admin/product/update', { id: data.id, data });
                } else {
                    await this.$store.dispatch('admin/product/create', { data });
                    await this.$store.dispatch('admin/product/fetch', this.tableFilter);
                }
                this.dialogForm = false;
            },
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
            async openView(id) {
                await this.$store.dispatch('admin/product/show', id);
                this.productFormView = this.product;
                this.dialogView = true;
            },
            async finishAddOrder(payload) {
                this.$store.dispatch('admin/orderProducer/addToOrder', payload);
                this.dialogView = false;
            },
        },
    };
</script>
