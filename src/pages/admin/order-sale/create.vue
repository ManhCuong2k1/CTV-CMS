<template>
    <div>
        <PageHeader :title="'Tạo nhà phân phối'" />
        <DistributorForm @submitForm="create" />
    </div>
</template>

<script>
    import DistributorForm from '~/components/admin/distributor/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            DistributorForm,
            PageHeader,
        },
        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$axios.post('/admin/distributor', form);
                    this.$router.push('/admin/distributor');
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
