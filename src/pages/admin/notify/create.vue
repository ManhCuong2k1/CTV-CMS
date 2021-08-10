<template>
    <div>
        <PageHeader :title="'Tạo thông báo nổi'" />
        <NotifyForm @submitForm="create" />
    </div>
</template>

<script>
    import NotifyForm from '~/components/admin/notify/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            NotifyForm,
            PageHeader,
        },

        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('admin/notify/create', { data: form });
                    this.$router.push('/admin/notify');
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
