<template>
    <el-select
        v-model="value"
        class="w-full"
        clearable
        :placeholder="placeholder || 'Lựa chọn'"
        :disabled="disabled"
        @change="updateValue"
    >
        <el-option
            v-for="item in options"
            :key="item.slug"
            :label="item.label"
            :value="item.slug"
        />
    </el-select>
</template>

<script>
    export default {
        props: {
            options: {
                type: [Array, Object],
                require: true,
            },
            placeholder: {
                type: String,
                require: false,
            },
            selected: {
                type: String,
                require: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                value: this.selected || '',
            };
        },

        methods: {
            updateValue() {
                this.$emit('changeValue', this.value);
            },
        },
    };
</script>
