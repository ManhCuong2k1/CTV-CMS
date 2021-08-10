<template>
    <div class="z-50 md:mt-24 md:sticky lg:top-20 md:top-20 md:z-50  sm:fixed fixed sm:bottom-0 bottom-0 md:block sm:flex flex md:border-0 border-t bg-white sm:left-0 left-0 sm:w-full w-full">
        <div class="mb-3 flex justify-center md:w-full sm:w-1/3 w-1/3 md:p-0 sm:pt-2 pt-2">
            <span class="cursor-pointer border rounded-full border-gray-300 p-2 w-11 h-11 flex items-center justify-center" @click="submitLove">
                <font-awesome-icon
                    v-if="postData.is_loved"
                    icon="heart"
                    style="font-size: 22px"
                    class="color-custom-2"
                />
                <font-awesome-icon
                    v-else
                    :icon="['far', 'heart']"
                    style="font-size: 22px"
                    class="color-custom-2"
                />
            </span>
        </div>
        <div class="mb-3 flex justify-center md:w-full sm:w-1/3 w-1/3 md:p-0 sm:pt-2 pt-2">
            <span class="cursor-pointer border rounded-full border-gray-300 p-2 w-11 h-11 flex items-center justify-center" @click="submitBookmark">
                <font-awesome-icon
                    v-if="postData.is_bookmarked"
                    icon="bookmark"
                    style="font-size: 22px"
                    class="color-custom-2"
                />
                <font-awesome-icon
                    v-else
                    :icon="['far', 'bookmark']"
                    style="font-size: 22px"
                    class="color-custom-2"
                />
            </span>
        </div>
        <div class="mb-3 flex justify-center items-center md:w-full sm:w-1/3 w-1/3 md:p-0 sm:pt-2 pt-2">
            <span class="cursor-pointer">
                <a :href="`https://www.facebook.com/sharer/sharer.php?u=${curentUrl}`" target="_blank">
                    <font-awesome-icon :icon="['fab', 'facebook']" style="font-size: 27px" class="text-blue-400" />
                </a>
            </span>
        </div>
    </div>
</template>

<script>
    import { cloneDeep } from 'lodash';

    export default {
        props: {
            post: {
                type: Object,
                require: true,
            },
        },
        data() {
            return {
                postData: cloneDeep(this.post),
                curentUrl: process.env.APP_URL + this.$route.path,
            };
        },
        computed: {
            isLoggedIn() {
                return this.$store.state.auth.loggedIn;
            },
        },
        methods: {
            async submitLove() {
                if (!this.isLoggedIn) {
                    this.$router.push('/login');
                } else {
                    const res = await this.$axios.$put('user/vote/post', { hash_id: this.post.hash_id });
                    this.postData.is_loved = res;
                }
            },
            async submitBookmark() {
                if (!this.isLoggedIn) {
                    this.$router.push('/login');
                } else {
                    const res = await this.$axios.$put('user/bookmark/post', { hash_id: this.post.hash_id });
                    this.postData.is_bookmarked = res;
                }
            },
        },
    };
</script>
