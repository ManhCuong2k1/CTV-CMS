<template>
    <div>
        <PageHeader :title="'Cập nhật đơn phân phối'" />
        <FormUpdate :data="orderDetail" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import FormUpdate from '~/components/admin/order/FormUpdate.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            FormUpdate,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/order/show', params.id);
        },

        computed: {
            ...mapState('admin/order', ['orderDetail']),
        },

        methods: {
        },
    };
</script>
