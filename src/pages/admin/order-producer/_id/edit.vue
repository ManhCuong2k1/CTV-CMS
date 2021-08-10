<template>
    <div>
        <PageHeader :title="'Cập nhật đơn sản xuất'" />
        <FormUpdate :data="orderProducer" @submitForm="updateOrder" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import FormUpdate from '~/components/admin/order-producer/FormUpdate.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            FormUpdate,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/orderProducer/show', params.id);
        },

        computed: {
            ...mapState('admin/orderProducer', ['orderProducer']),
        },

        methods: {
            async updateOrder(form) {
                try {
                    await this.$store.dispatch('admin/orderProducer/update', { id: this.orderProducer.id, data: form });
                    this.$router.push('/admin/order-producer/');
                } catch ($e) {
                    this.$message({
                        message: 'Thay đổi lỗi.',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>
