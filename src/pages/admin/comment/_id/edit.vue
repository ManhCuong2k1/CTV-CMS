<template>
    <div>
        <PageHeader :title="'Author: ' + comment.author" />
        <CommentForm :comment-data="comment" @submitForm="updateComment" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import CommentForm from '~/components/admin/comment/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            CommentForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/comment/show', params.id);
            const comment = cloneDeep(store.state.admin.comment.comment);
            return {
                comment,
            };
        },
        methods: {
            async updateComment(form) {
                try {
                    await this.$store.dispatch('admin/comment/update', { id: this.comment.id, data: form });
                    this.$router.push('/admin/comment/');
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
