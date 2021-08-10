<template>
    <div>
        <PageHeader :title="pointofsale.name" />
        <PointOfSaleForm
            :pointofsale-data="pointofsale"
            @submitForm="updatePointOfSale"
            @confirmPOS="confirmPOS"
            @disablePOS="disablePOS"
        />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import PointOfSaleForm from '~/components/admin/point-of-sale/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            PointOfSaleForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/pointofsale/show', params.id);
            const pointofsale = cloneDeep(store.state.admin.pointofsale.pointofsaleDetail);
            await store.dispatch('admin/common/searchDistributors', { query: pointofsale.AdminId });
            return {
                pointofsale,
            };
        },

        methods: {
            async updatePointOfSale(form) {
                try {
                    await this.$axios.put(`/admin/point-of-sale/${this.pointofsale.id}`, form).then(() => {
                        this.$router.push('/admin/point-of-sale/');
                    }).catch((error) => {
                        this.$message.error(error.response.data);
                    });
                } catch ($e) {
                    this.$message({
                        message: 'Thất bại',
                        type: 'error',
                    });
                }
            },
            async confirmPOS(id) {
                try {
                    await this.$axios.put(`/admin/point-of-sale/status/${id}`, { status: 'confirm' });
                    this.$router.push('/admin/point-of-sale/');
                } catch ($e) {
                    this.$message({
                        message: 'Thất bại',
                        type: 'error',
                    });
                }
            },
            async disablePOS(id) {
                try {
                    await this.$axios.put(`/admin/point-of-sale/status/${id}`, { status: 'pendding' });
                    this.$router.push('/admin/point-of-sale/');
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
