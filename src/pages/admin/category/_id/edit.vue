<template>
    <div>
        <PageHeader :title="category.name" />
        <CategoryForm :category-data="category" @submitForm="updateCategory" />
    </div>
</template>

<script>

    import cloneDeep from 'lodash/cloneDeep';
    import CategoryForm from '~/components/admin/category/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            CategoryForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/productCategory/show', params.id);
            const category = cloneDeep(store.state.admin.productCategory.category);
            return {
                category,
            };
        },

        methods: {
            async updateCategory(form) {
                try {
                    await this.$store.dispatch('admin/productCategory/update', { id: this.category.id, data: form });
                    this.$router.push('/admin/category/');
                } catch ($e) {
                    this.$message({
                        message: 'Sửa không thành công.',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>
