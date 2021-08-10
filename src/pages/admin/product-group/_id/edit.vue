<template>
    <div>
        <PageHeader :title="'Nhập tên nhóm sản phẩm'" />
        <groupFrom :group-data="groupFrom" @submitForm="updateGroup" />
    </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep';
    import groupFrom from '~/components/admin/product-group/Form.vue';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    export default {
        layout: 'admin',
        components: {
            groupFrom,
            PageHeader,
        },
        async asyncData({ params, store }) {
            await store.dispatch('admin/group/showGroup', params.id);
            const group = cloneDeep(store.state.admin.group.editGroup);
            return {
                group,
            };
        },

        computed: {
            groupFrom() {
                return {
                    ...this.group,
                };
            },
        },

        methods: {
            async updateGroup(form) {
                try {
                    await this.$store.dispatch('admin/group/update', { id: this.group.id, data: form });
                    this.$router.push('/admin/product-group/');
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
