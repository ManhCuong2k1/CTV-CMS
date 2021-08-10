<template>
    <div>
        <PageHeader :title="'Tin nhắn'" />
        <smsForm :sms-data="smsForm" @submitForm="updateSmsForm" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import smsForm from '~/components/admin/sms/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            smsForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/sms/show', params.id);
            const sms = cloneDeep(store.state.admin.sms.editSmsForm);
            return {
                sms,
            };
        },

        computed: {
            smsForm() {
                return {
                    ...this.sms,
                };
            },
        },

        methods: {
            async updateSmsForm(form) {
                try {
                    const params = this.$route.params.id;
                    await this.$store.dispatch('admin/sms/update', { id: params, data: form });
                    this.$router.push('/admin/sms/');
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
