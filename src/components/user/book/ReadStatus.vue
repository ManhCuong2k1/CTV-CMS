<template>
    <div class="md:col-span-1 order-2 md:order-3">
        <el-select v-model="readStatus" class="w-full" placeholder="Trạng thái đọc">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            />
        </el-select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                readStatus: '',
                options: [{
                    value: 'read',
                    label: 'Đã đọc',
                }, {
                    value: 'toread',
                    label: 'Sẽ đọc',
                }, {
                    value: 'reading',
                    label: 'Đang đọc',
                }],
            };
        },
    };
</script>

<style lang="sass">
    .el-input__inner
        border: 1px solid #5c7293 !important
    .el-input__inner::-webkit-input-placeholder
        color: black
</style>
