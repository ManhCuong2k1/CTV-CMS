<template>
    <el-date-picker
        v-model="dateValue"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="To"
        start-placeholder="Ngày bắt đầu"
        end-placeholder="Ngày kết thúc"
        :picker-options="pickerOptions"
        format="dd-MM-yyyy"
        @change="updateDateRange"
    />
</template>

<script>
    export default {
        props: {
            selectedRange: {
                type: Array,
                require: false,
            },
        },

        data() {
            return {
                pickerOptions: {
                    shortcuts: [
                        {
                            text: 'Tuần trước',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 7,
                                );
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: 'Tháng trước',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 30,
                                );
                                picker.$emit('pick', [start, end]);
                            },
                        },
                        {
                            text: '3 tháng',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 90,
                                );
                                picker.$emit('pick', [start, end]);
                            },
                        },
                    ],
                },
                dateValue: this.selectedRange || [],
            };
        },
        methods: {
            updateDateRange() {
                this.$emit('changeDateRange', this.dateValue);
            },
        },
    };
</script>
