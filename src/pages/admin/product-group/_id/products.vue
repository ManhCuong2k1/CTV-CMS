<template>
    <div>
        <div>
            <PageHeader :title="'Sản phẩm'" />
            <div class="w-1/2">
                <div class="mt-5 flex">
                    <el-input
                        v-model="tableFilter.searchKey"
                        placeholder="Tìm kiếm"
                        class="input-with-select mr-5"
                        clearable
                        @clear="updateSearchKeyproduct"
                    />
                    <el-button type="primary" icon="el-icon-search" @click="updateSearchKeyproduct">
                        Tìm kiếm
                    </el-button>
                    <el-button type="success" icon="el-icon-plus" @click="openDialogProduct()">
                        Thêm
                    </el-button>
                </div>
            </div>
            <div>
                <TableProduct :data="productGroup" @deleteGroup="actionDeleteProduct" />
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
        <el-dialog
            title="Sản phẩm"
            :visible.sync="popupProduct"
            :destroy-on-close="true"
        >
            <ProductForm
                @submitForm="finishProductForm"
            />
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TableProduct from '~/components/admin/product-group/TableProduct.vue';
    import Pagination from '~/components/Pagination.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';
    import ProductForm from '~/components/admin/product-group/FormProduct.vue';
    import { cleanObject } from '~/utils/object';

    export default {
        layout: 'admin',

        components: {
            PageHeader,
            TableProduct,
            Pagination,
            ProductForm,
        },

        async asyncData({ query, store, params }) {
            const initFilter = {
                searchKey: null,
                page: query.page || 1,
            };
            const filter = { ...initFilter, ...query };
            const clean = cleanObject(filter);
            await store.dispatch('admin/productGroup/fetch', { ProductGroupId: params.id, ...clean });
            return {
                tableFilter: filter,
            };
        },

        watchQuery: true,
        data() {
            return {
                popupProduct: false,
            };
        },

        computed: {
            ...mapState('admin/productGroup', ['productGroup', 'pagination']),
        },

        methods: {
            async fetchProductGroup(newFilter) {
                const filter = cleanObject({ ...this.$route.query, ...this.tableFilter, ...newFilter });
                this.$router.push({ query: filter });
            },
            updatePage(page) {
                this.fetchProductGroup({ page });
            },
            async finishProductForm(data) {
                await this.$store.dispatch('admin/productGroup/create', { data: { ...data, ProductGroupId: this.$route.params.id } });
                await this.$nuxt.refresh();
                this.popupProduct = false;
            },

            async actionDeleteProduct(ProductId) {
                await this.$store.dispatch('admin/productGroup/delete', { ProductGroupId: this.$route.params.id, ProductId });
                await this.$nuxt.refresh();
            },
            async openDialogProduct() {
                this.popupProduct = true;
            },
            updateSearchKeyproduct() {
                this.fetchProductGroup({ page: null });
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
