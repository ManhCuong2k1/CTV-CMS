<template functional>
    <nuxt-link :to="props.link" class="">
        <el-menu-item :index="props.link">
            <i v-if="props.icon" :class="props.icon" class="" />
            <template #title>
                <slot />
            </template>
        </el-menu-item>
    </nuxt-link>
</template>

<script>
    export default {
        props: {
            link: String,
            icon: String,
        },
    };
</script>
