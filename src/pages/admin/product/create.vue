<template>
    <div>
        <PageHeader :title="'Tạo sản phẩm'" />
        <ProductForm @finishForm="create" />
    </div>
</template>

<script>
    import ProductForm from '~/components/admin/product/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            ProductForm,
            PageHeader,
        },

        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('admin/product/create', { data: form });
                    this.$router.push('/admin/product');
                } catch (error) {
                    this.$message.error(this.$constants.ERROR_MESSAGE.Default);
                    throw error;
                } finally {
                    this.loading = false;
                }
            },
        },
    };
</script>
