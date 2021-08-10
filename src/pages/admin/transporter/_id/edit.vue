<template>
    <div>
        <PageHeader :title="transporter.name" />
        <TransporterForm :transporter-data="transporter" @submitForm="updateTransporter" @confirmPOS="confirmPOS" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import TransporterForm from '~/components/admin/transporter/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            TransporterForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/transporter/show', params.id);
            const transporter = cloneDeep(store.state.admin.transporter.transporterDetail);
            await store.dispatch('admin/common/searchDistributors', { query: transporter.AdminId });
            return {
                transporter,
            };
        },

        methods: {
            async updateTransporter(form) {
                try {
                    await this.$store.dispatch('admin/transporter/update', { id: this.transporter.id, data: form });
                    this.$router.push('/admin/transporter/');
                } catch ($e) {
                    this.$message({
                        message: 'Thất bại',
                        type: 'error',
                    });
                }
            },
            async confirmPOS(id) {
                try {
                    await this.$store.dispatch('admin/transporter/update', { id, data: { status: 'confirm' } });
                    this.$router.push('/admin/transporter/');
                } catch ($e) {
                    this.$message({
                        message: 'Thất bại',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>
