<template>
    <div class="input-review pt-6">
        <div
            v-if="isLoggedIn"
            class="border-t border-custom border-dashed py-6"
        >
            <div class="flex items-center">
                <div class="mr-3">
                    <nuxt-link :to="`/u/${authComment.username}/posts`">
                        <img
                            :src="authComment.avatar ? toImage(authComment.avatar, 'avatar') : '/images/avatar-default.png'"
                            alt=""
                            class="w-10 h-10 rounded-full"
                        >
                    </nuxt-link>
                </div>
                <div>
                    <div class="flex text-base">
                        <div class="font-bold">
                            <nuxt-link :to="`/u/${authComment.username}/posts`">
                                {{ authComment.first_name }} {{ authComment.last_name }}
                            </nuxt-link>
                        </div>
                        <div
                            class="ml-2 color-custom-3 italic"
                        >
                            @{{ authComment.username }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <textarea
                    v-model="content"
                    rows="3"
                    class="w-full border border-custom focus:outline-none p-2"
                />
                <div class="mt-2 text-right">
                    <el-button
                        class="btn bg-primary cursor-pointer text-white h-10 rounded-sm flex items-center justify-center px-10 ml-auto focus:outline-none hover-bg-primary"
                        :loading="loading"
                        type="primary"
                        @click="submitComment"
                    >
                        Gửi bình luận
                    </el-button>
                </div>
            </div>
        </div>

        <div
            v-else
            class="flex justify-center py-6"
        >
            <el-button
                class="px-10 ml-auto"
                @click="goToLogin"
            >
                Đăng nhập để bình luận
            </el-button>
        </div>
        <div>
            <div v-for="item in comments" :key="item.hash_id" class="border-t border-custom border-dashed py-6">
                <div class="flex items-center">
                    <div class="mr-3">
                        <span>
                            <img
                                :src="item.author.avatar ? toImage(item.author.avatar, 'avatar') : '/images/avatar-default.png'"
                                alt=""
                                class="w-10 h-10 rounded-full"
                            >
                        </span>
                    </div>
                    <nuxt-link :to="`/u/${item.author.username}/posts`">
                        <div class="flex text-base">
                            <div class="font-bold">
                                <span> {{ item.author.first_name }} {{ item.author.last_name }}</span>
                            </div>
                            <div
                                class="ml-2 color-custom-3 italic"
                            >
                                @{{ item.author.username }}
                            </div>
                        </div>
                    </nuxt-link>
                </div>
                <div>
                    {{ item.content }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { image as toImage } from '~/utils/url';

    export default {
        props: {
            hashId: {
                require: true,
                type: String,
            },
        },
        data() {
            this.fetchComment({ params: { hashId: this.hashId } });
            return {
                authComment: this.$auth.user,
                content: '',
                loading: false,
            };
        },
        computed: {
            ...mapState('user/comments', ['pagination', 'comments']),
            isLoggedIn() {
                return this.$store.state.auth.loggedIn;
            },
        },
        methods: {
            toImage,
            ...mapActions('user/comments', ['fetchComment']),
            async submitComment() {
                try {
                    this.loading = true;
                    await this.$axios.$post('user/post/comment', { content: this.content, hash_id: this.hashId });
                } catch (err) {
                    this.$message({
                        type: 'danger',
                        message: 'Gửi bình luận không thành công.',
                    });
                } finally {
                    this.fetchComment({ params: { hashId: this.hashId } });
                    this.loading = false;
                }
                this.content = '';
            },
            goToLogin() {
                this.$router.push('/login');
            },
        },
    };
</script>

<style lang="sass" scoped>
    .btn
        border: none
</style>
