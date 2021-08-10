<template>
    <div>
        <PageHeader :title="`Sửa nhà phân phối - ${distributorDetail.name}`" />
        <DistributorForm :distributor-data="distributorDetail" @submitForm="updateDistributor" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import DistributorForm from '~/components/admin/distributor/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            DistributorForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/distributor/show', params.id);
        },

        computed: {
            ...mapState('admin/distributor', ['distributorDetail']),
        },

        methods: {
            async updateDistributor(form) {
                try {
                    await this.$store.dispatch('admin/distributor/update', { id: this.distributorDetail.id, data: form });
                    this.$router.push('/admin/distributor/');
                } catch ($e) {
                    this.$message({
                        message: 'Thay đổi lỗi',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>
