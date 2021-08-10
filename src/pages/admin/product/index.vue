<template>
    <div>
        <PageHeader :title="'Sản phẩm'" />
        <div class="w-full md:w-1/2">
            <div class="mt-5 flex flex-wrap md:flex-nowrap">
                <Select
                    class="mr-5 mb-2"
                    :options="optionStatus"
                    :placeholder="'Hiển thị'"
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
                <nuxt-link v-if="userLoged.type == 'admin'" class="ml-3" to="/admin/product/create">
                    <el-button type="success" icon="el-icon-plus">
                        Tạo mới
                    </el-button>
                </nuxt-link>
            </div>
        </div>
        <div>
            <TableProduct @editProductId="openForm" @viewProductId="openView" />
        </div>
        <div>
            <Pagination
                :page-size="pagination.pageSize"
                :total="pagination.total"
                :current-page="pagination.page"
                @changePage="updatePage"
            />
        </div>
        <el-dialog
            title="Sản phẩm"
            :visible.sync="dialogForm"
            :destroy-on-close="true"
        >
            <ProductForm
                :product-data="productForm"
                @finishForm="finishForm"
            />
        </el-dialog>
        <el-dialog
            title="Xem sản phẩm"
            :visible.sync="dialogView"
            :destroy-on-close="true"
            width="25%"
            custom-class="custom-dialogView"
        >
            <ProductView
                :product-data="productFormView"
                @finishForm="finishAddOrder"
            />
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Select from '~/components/admin/shared/form/Select.vue';
    import TableProduct from '~/components/admin/product/Table.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import ProductForm from '~/components/admin/product/Form.vue';
    import ProductView from '~/components/admin/product/View.vue';
    import { PRODUCT_STATUS } from '~/constants/product';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            Select,
            TableProduct,
            Pagination,
            ProductForm,
            ProductView,
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
            userLoged() {
                return this.$store.state.auth.user;
            },
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

<style lang="sass">
    .el-range-separator
        box-sizing: content-box
    .el-button:focus
        outline: none !important
    .custom-dialogView
        max-width: 18rem !important
</style>
