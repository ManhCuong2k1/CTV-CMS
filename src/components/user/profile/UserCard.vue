<template>
    <div>
        <div class="mb-5">
            <span class="border-3 border-white rounded-full">
                <img
                    :src="userInfo.avatar ? toImage(userInfo.avatar, 'full') : '/images/avatar-default.png'"
                    alt=""
                    class="w-40 h-40 m-auto rounded-full"
                >
            </span>
        </div>
        <div class="">
            <div class="md:text-base">
                <div class="font-bold user-fullname text-center">
                    <span>{{ userInfo.first_name }} {{ userInfo.last_name }}</span>
                </div>
                <div
                    class="color-custom-3 italic user-fullname text-center"
                >
                    <span> @{{ userInfo.username }} </span>
                </div>
            </div>
            <div class="flex mt-2 justify-center">
                <div class="flex mr-5">
                    <img src="/images/icons/user-star.svg" class="w-4">
                    <span class="color-custom-2 text-lg ml-1">
                        {{ userInfo.reputation | formatNumber }}
                    </span>
                </div>
                <div class="flex mr-5">
                    <img src="/images/icons/user-follower.svg" class="w-4">
                    <span class="color-custom-2 text-lg ml-1">
                        {{ userInfo.total_follower | formatNumber }}
                    </span>
                </div>
                <div class="flex">
                    <img src="/images/icons/user-edit.svg" class="w-4">
                    <span class="color-custom-2 text-lg ml-1">
                        {{ userInfo.total_content | formatNumber }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { image as toImage } from '~/utils/url';

    export default {
        props: {
            userInfo: {
                type: Object,
                require: true,
            },
        },
        methods: {
            toImage,
        },
    };
</script>

<style scoped lang="sass">
    .user-fullname
        font-size: 16px
</style>
