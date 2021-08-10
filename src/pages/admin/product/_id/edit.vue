<template>
    <div>
        <PageHeader :title="product.name" />
        <ProductForm :product-data="product" @finishForm="updateProduct" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import ProductForm from '~/components/admin/product/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            ProductForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/product/show', params.id);
            const product = cloneDeep(store.state.admin.product.product);
            await store.dispatch('admin/common/searchProductCates');
            return {
                product,
            };
        },

        methods: {
            async updateProduct(form) {
                try {
                    await this.$store.dispatch('admin/product/update', { id: this.product.id, data: form });
                    this.$router.push('/admin/product/');
                } catch ($e) {
                    this.$message({
                        message: 'Thay đổi lỗi',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>
