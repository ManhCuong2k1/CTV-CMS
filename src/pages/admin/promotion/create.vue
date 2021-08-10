<template>
    <div>
        <PageHeader :title="'Tạo khuyến mãi'" />
        <PromotionForm @submitForm="create" />
    </div>
</template>

<script>
    import PromotionForm from '~/components/admin/promotion/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            PromotionForm,
            PageHeader,
        },

        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('admin/promotion/create', { data: form });
                    this.$router.push('/admin/promotion');
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
