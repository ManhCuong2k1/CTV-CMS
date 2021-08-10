<template>
    <div>
        <PageHeader :title="'Thông báo nổi'" />
        <notifyForm :notify-data="notifyForm" @submitForm="updateNotifyForm" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import notifyForm from '~/components/admin/notify/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            notifyForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/notify/show', params.id);
            const notify = cloneDeep(store.state.admin.notify.editNotifyForm);
            return {
                notify,
            };
        },

        computed: {
            notifyForm() {
                return {
                    ...this.notify,
                };
            },
        },

        methods: {
            async updateNotifyForm(form) {
                try {
                    const params = this.$route.params.id;
                    await this.$store.dispatch('admin/notify/update', { id: params, data: form });
                    this.$router.push('/admin/notify/');
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
