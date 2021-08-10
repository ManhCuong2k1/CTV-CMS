<template>
    <div class="rounded-2xl shadow-lg border border-gray-100 p-5 m-3 md:m-auto h-auto">
        <div class="h-auto">
            <div class="">
                <UserCard :user-info="userData" />
            </div>
            <div class="flex justify-center">
                <div class="w-full py-3">
                    <div>
                        <nuxt-link class="text-gray-900 text-base text-center py-4 border-b hover:text-gray-400" :to="`/u/${userData.username}/posts`">
                            Tin tức
                        </nuxt-link>
                    </div>
                    <!-- <div index="1">
                        <nuxt-link :to="`/u/${userData.username}/posts`">
                            Serrie
                        </nuxt-link>
                    </div> -->
                    <div index="1">
                        <nuxt-link class="text-gray-900 text-base text-center py-4 border-b hover:text-gray-400" :to="`/u/${userData.username}/reviews`">
                            Nhận xét
                        </nuxt-link>
                    </div>
                    <div v-if="userData.username === userLoged.username" index="3">
                        <nuxt-link class="text-gray-900 text-base text-center py-4 border-b hover:text-gray-400" :to="`/u/${userData.username}/profile`">
                            Thông tin
                        </nuxt-link>
                    </div>
                    <div index="3">
                        <nuxt-link class="text-gray-900 text-base text-center py-4 border-b hover:text-gray-400" :to="`/u/${userData.username}/gallery`">
                            Thư viện
                        </nuxt-link>
                    </div>
                    <div index="4">
                        <nuxt-link class="text-gray-900 text-base text-center py-4 border-b hover:text-gray-400" :to="`/u/${userData.username}/following`">
                            Đang theo dõi
                        </nuxt-link>
                    </div>
                    <!-- <div index="5">
                        <nuxt-link class="text-gray-900 text-base text-center py-4 border-b hover:text-gray-400" :to="`/u/${userData.username}/bookmark`">
                            Bookmark
                        </nuxt-link>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UserCard from './UserCard.vue';

    export default {
        components: {
            UserCard,
        },
        props: {
            userData: {
                type: Object,
                require: true,
            },
        },
        computed: {
            userLoged() {
                return this.$store.state.auth.user;
            },
        },
    };
</script>
