<template>
    <div>
        <PageHeader :title="'Tạo tin nhắn'" />
        <SmsForm @submitForm="create" />
    </div>
</template>

<script>
    import SmsForm from '~/components/admin/sms/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            SmsForm,
            PageHeader,
        },

        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('admin/sms/create', { data: form });
                    this.$router.push('/admin/sms');
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
