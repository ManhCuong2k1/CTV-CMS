<template>
    <div>
        <PageHeader :title="promotion.title" />
        <promotionForm :promotion-data="promotionForm" @submitForm="updatepromotion" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import promotionForm from '~/components/admin/promotion/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            promotionForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/promotion/showPromotion', params.id);
            const promotion = cloneDeep(store.state.admin.promotion.editPromotion);
            promotion.startDate *= 1000;
            promotion.endDate *= 1000;
            return {
                promotion,
            };
        },

        computed: {
            promotionForm() {
                return {
                    ...this.promotion,
                };
            },
        },

        methods: {
            async updatepromotion(form) {
                try {
                    await this.$store.dispatch('admin/promotion/update', { id: this.promotion.id, data: form });
                    this.$router.push('/admin/promotion/');
                } catch ($e) {
                    this.$message({
                        message: 'Sửa không thành công.',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>
