<template>
    <div>
        <PageHeader :title="'Thêm nhân viên vận chuyển'" />
        <PointOfSaleForm @submitForm="create" />
    </div>
</template>

<script>
    import PointOfSaleForm from '~/components/admin/transporter/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            PointOfSaleForm,
            PageHeader,
        },

        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$axios.post('/admin/transporter', form);
                    this.$router.push('/admin/transporter');
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
