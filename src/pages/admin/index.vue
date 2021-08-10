<template>
    <div class="container">
        <div />
    </div>
</template>

<script>
    export default {
        layout: 'admin',
        beforeCreate() {
            this.$router.push('/admin/dashboard');
        },
    };
</script>
