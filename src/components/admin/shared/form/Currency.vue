<template>
    <div>
        <el-input
            v-model="displayValue"
            type="text"
            :placeholder="placeholder"
            @blur="isInputActive = false"
            @focus="isInputActive = true"
        />
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: [String, Number],
                required: false,
            },
            placeholder: {
                type: String,
                required: false,
            },
        },
        data() {
            return {
                isInputActive: false,
            };
        },
        computed: {
            displayValue: {
                get() {
                    if (this.isInputActive) {
                        // Cursor is inside the input field. unformat display value for user
                        return this.value.toString();
                    }
                    // User is not modifying now. Format display value for user interface
                    return `${this.value.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')} đ `;
                },
                set(modifiedValue) {
                    // Recalculate value after ignoring "$" and "," in user input
                    let newValue = parseFloat(modifiedValue.replace(/[^\d.]/g, ''));
                    // Ensure that it is not NaN
                    if (Number.isNaN(newValue)) {
                        newValue = 0;
                    }
                    // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
                    // $emit the event so that parent component gets it
                    this.$emit('input', newValue);
                },
            },
        },
    };
</script>
