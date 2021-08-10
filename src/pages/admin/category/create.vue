<template>
    <div>
        <PageHeader :title="'Tạo danh mục mới'" />
        <CategoryForm @submitForm="create" />
    </div>
</template>

<script>
    import CategoryForm from '~/components/admin/category/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            CategoryForm,
            PageHeader,
        },

        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('admin/productCategory/create', { data: form });
                    this.$router.push('/admin/category');
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
