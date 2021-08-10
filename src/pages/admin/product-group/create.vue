<template>
    <div>
        <PageHeader :title="'Tạo Group'" />
        <GroupForm @submitForm="create" />
    </div>
</template>

<script>
    import GroupForm from '~/components/admin/product-group/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            GroupForm,
            PageHeader,
        },

        methods: {
            async create(form) {
                try {
                    this.loading = true;
                    await this.$store.dispatch('admin/group/create', { data: form });
                    this.$router.push('/admin/product-group');
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
