<template functional>
    <el-submenu
        v-bind="data.attrs"
        class="admin-sidebar__submenu"
    >
        <template #title>
            <i :class="props.icon" class="admin-sidebar__icon" />
            <span class="admin-sidebar__submenu__title"><slot name="title" /></span>
        </template>

        <slot />
    </el-submenu>
</template>

<script>
    export default {
        props: {
            icon: String,
            active: Boolean,
        },
    };
</script>

<style lang="sass">
.admin-sidebar
    &.collapsed
        .admin-sidebar__submenu__title
            display: none

        .el-submenu__icon-arrow
            display: none

        .el-submenu__title
            text-align: center
</style>
