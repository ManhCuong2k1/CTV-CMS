<template>
    <div>
        <div class="text-xl font-bold pt-6">
            Tags
        </div>
        <div class="flex flex-wrap -mx-1">
            <div
                v-for="tag in tags"
                :key="tag.id"
                class="tag border w-auto px-2 flex-shrink-0 m-1 hover:text-white hover:border-transparent"
            >
                <a href="">{{ tag.name }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            tags: {
                type: Array,
                require: true,
            },
        },
    };
</script>
