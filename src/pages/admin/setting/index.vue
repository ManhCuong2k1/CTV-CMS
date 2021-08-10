<template>
    <div>
        <PageHeader :title="'Cài đặt khác'" />
        <div v-for="item in tableData" :key="item.key" class="flex mb-1">
            <div class="mr-2 w-32" style="line-height: 40px">
                {{ item.label }}
            </div>
            <div class="mr-2">
                <el-input v-model="item.value" :placeholder="item.label" />
            </div>
            <div>
                <el-button type="primary" @click="submitForm(item)">
                    Lưu
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>

    import { cloneDeep } from 'lodash';
    import PageHeader from '~/components/admin/shared/PageHeader.vue';

    const tableModel = [{
        key: 'hotline',
        label: 'HotLine',
        value: '',
    }, {
        key: 'app_version',
        label: 'App Version',
        value: '',
    }];

    export default {
        layout: 'admin',
        components: {
            PageHeader,
        },

        async fetch({ store }) {
            await store.dispatch('admin/systemInfo/fetch');
        },

        data() {
            const systemInfoData = this.$store.state.admin.systemInfo.systemInfos;
            return {
                tableData: systemInfoData.length > 0 ? cloneDeep(systemInfoData) : tableModel,
            };
        },

        methods: {
            async submitForm(data) {
                try {
                    await this.$axios.put('/admin/system-info', { data });
                    this.$message({
                        type: 'success',
                        message: 'Thành công',
                    });
                } catch ($e) {
                    this.$message({
                        message: 'Thay đổi lỗi.',
                        type: 'error',
                    });
                }
            },
        },
    };
</script>
