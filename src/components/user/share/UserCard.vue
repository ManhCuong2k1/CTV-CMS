<template>
    <div
        class="flex items-center"
    >
        <div class="mr-3">
            <nuxt-link :to="`/u/${userInfoData.username}/posts`">
                <img
                    :src="userInfoData.avatar ? toImage(userInfoData.avatar, 'avatar') : '/images/avatar-default.png'"
                    alt=""
                    class="w-12 h-12 rounded-full"
                >
            </nuxt-link>
        </div>
        <div>
            <div class="flex md:text-base">
                <div class="font-bold user-fullname">
                    <nuxt-link :to="`/u/${userInfoData.username}/posts`">
                        {{ userInfoData.first_name }} {{ userInfoData.last_name }}
                    </nuxt-link>
                </div>
                <div
                    v-if="showUsername"
                    class="ml-2 md:ml-2 color-custom-3 italic user-fullname"
                >
                    <nuxt-link :to="`/u/${userInfoData.username}/posts`">
                        @{{ userInfoData.username }}
                    </nuxt-link>
                </div>
                <span v-if="shouldFollow">
                    <span v-if="userInfoData.isFollowing">
                        <div
                            class="flex items-center ml-3 md:ml-4 px-3 rounded-sm text-sm text-white cursor-pointer following"
                            @click="submitUnfollowUser"
                        >
                            Đang theo dõi
                        </div>
                    </span>
                    <span v-else>
                        <div
                            class="flex items-center ml-3 md:ml-4 px-3 rounded-sm text-sm cursor-pointer follow"
                            @click="submitFollowUser"
                        >
                            Theo dõi
                        </div>
                    </span>
                </span>
            </div>
            <div class="flex mt-2">
                <div class="flex mr-5">
                    <img src="/images/icons/user-star.svg" class="w-3">
                    <span class="color-custom-2 ml-1">
                        {{ userInfo.reputation | formatNumber }}
                    </span>
                </div>
                <div class="flex mr-5">
                    <img src="/images/icons/user-follower.svg" class="w-3">
                    <span class="color-custom-2 ml-1">
                        {{ userInfo.total_follower | formatNumber }}
                    </span>
                </div>
                <div class="flex mr-5">
                    <img src="/images/icons/user-edit.svg" class="w-3">
                    <span class="color-custom-2 ml-1">
                        {{ userInfo.total_content | formatNumber }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { cloneDeep } from 'lodash';
    import { image as toImage } from '~/utils/url';

    export default {
        props: {
            userInfo: {
                type: Object,
                require: true,
            },
            shouldFollow: {
                type: Boolean,
                require: false,
                default: true,
            },
            showUsername: {
                type: Boolean,
                require: false,
                default: true,
            },
        },
        data() {
            return {
                userInfoData: cloneDeep(this.userInfo),
            };
        },
        methods: {
            toImage,
            async submitFollowUser() {
                try {
                    await this.$axios.$post('user/follow/user', { followUsername: this.userInfo.username });
                    this.userInfoData.isFollowing = true;
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: 'Không thành công',
                    });
                }
            },
            async submitUnfollowUser() {
                try {
                    await this.$axios.$put('user/unfollow/user', { followUsername: this.userInfo.username });
                    this.userInfoData.isFollowing = false;
                } catch (e) {
                    this.$message({
                        type: 'error',
                        message: 'Không thành công',
                    });
                }
            },
        },
    };
</script>

<style scoped lang="sass">
    .user-fullname
        font-size: 15px
    .follow
        color: #df9e2f
        border: 1px solid #df9e2f
    .following
        background-color: #df9e2f
        border: 1px solid #df9e2f
</style>
