<template>
    <div>
        <PageHeader :title="'Create News'" />
        <NewsForm @submitForm="create" />
    </div>
</template>

<script>
    import NewsForm from '~/components/admin/news/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            NewsForm,
            PageHeader,
        },

        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('admin/news/create', { data: form });
                    this.$router.push('/admin/news');
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
