<template>
    <div>
        <PageHeader :title="news.title" />
        <newsForm :news-data="news" @submitForm="updatenews" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import newsForm from '~/components/admin/news/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            newsForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/news/shownews', params.id);
            const news = cloneDeep(store.state.admin.news.editnew);
            return {
                news,
            };
        },

        methods: {
            async updatenews(form) {
                try {
                    await this.$store.dispatch('admin/news/update', { id: this.news.id, data: form });
                    this.$router.push('/admin/news/');
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
