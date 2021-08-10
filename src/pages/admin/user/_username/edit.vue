<template>
    <div>
        <PageHeader :title="user.username" />
        <UserForm :user-data="user" @submitForm="updateUser" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import UserForm from '~/components/admin/user/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            UserForm,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/user/show', params.username);
            const user = cloneDeep(store.state.admin.user.user);
            user.is_active = user.deleted_at === null;
            user.is_admin = user.is_admin === 1;
            return {
                user,
            };
        },
        methods: {
            async updateUser(form) {
                try {
                    await this.$store.dispatch('admin/user/update', { id: this.user.id, data: form });
                    this.$router.push('/admin/user/');
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
