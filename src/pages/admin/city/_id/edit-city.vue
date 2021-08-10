<template>
    <div>
        <PageHeader :title="cityDetail.name" @changeEdit="active" />
        <CityForm :city-data="cityDetail" @submitForm="updateTag" />
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import CityForm from '~/components/admin/city/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            CityForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/city/show', params.id);
        },
        data() {
            return {
                activeName: '',
            };
        },
        computed: {
            ...mapState('admin/city', ['cityDetail']),
        },
        methods: {
            async updateTag(form) {
                try {
                    await this.$store.dispatch('admin/city/update', { id: this.cityDetail.id, data: form });
                    this.$router.push('/admin/city');
                } catch ($e) {
                    this.$message({
                        message: 'Sửa không thành công',
                        type: 'error',
                    });
                }
            },
            active(active) {
                this.activeName = active;
            },
        },
    };
</script>
