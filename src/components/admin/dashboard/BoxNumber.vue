<template>
    <div class="bg-white w-full mb-3 md:mb-0 md:w-1/4 mx-5 p-7 flex justify-between shadow-lg">
        <div class="flex flex-row flex-wrap place-items-center">
            <div>
                <font-awesome-icon :class="`el-icon-shopping-cart-full md:text-5xl text-3xl ${color}`" :icon="icon" />
            </div>
        </div>
        <div class="text-right">
            <div class="font-bold text-lg text-gray-400">
                {{ title }}
            </div>
            <div class="font-bold text-2xl text-gray-600">
                {{ value | formatNumber }}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            icon: {
                type: Array,
                require: false,
                default: () => ['fas', 'shopping-cart'],
            },
            color: {
                type: String,
                require: false,
                default: 'text-green-400',
            },
            title: {
                type: String,
                require: false,
                default: 'Tiêu đề',
            },
            value: {
                type: Number,
                require: false,
                default: 1000000,
            },
        },
    };
</script>
