<template>
    <el-page-header class="mb-5" :content="title" @back="goBack" />
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                require: true,
            },
            activeName: {
                type: String,
                require: true,
            },
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
        },
    };
</script>
