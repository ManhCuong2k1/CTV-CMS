<template>
    <div>
        <PageHeader :title="'Tạo đơn sản xuất'" />
        <OrderProducer :data="order" @submitForm="create" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import OrderProducer from '~/components/admin/order-producer/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            OrderProducer,
            PageHeader,
        },

        computed: {
            ...mapState('admin/orderProducer', ['order']),
        },

        methods: {
            async create() {
                try {
                    this.loading = true;
                    await this.$store.dispatch('admin/orderProducer/sendOrder');
                    this.$router.push('/admin/order-producer');
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
