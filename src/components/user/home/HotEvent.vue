<template>
    <div class="max-w-screen-lg mx-auto px-4 mt-8 main-content">
        <div class="flex justify-between items-center pb-6">
            <div class="flex text-2xl font-bold">
                <a href="#">Sự Kiện Nổi Bật</a>
            </div>

            <div class="btn flex items-center">
                <span
                    class="font-bold cursor-pointer hover-color-primary"
                ><a href="#">Xem tất cả</a></span>
                <span
                    class="ml-2 w-4"
                ><img
                    src="/images/icons/right-arrow.svg"
                    alt=""
                ></span>
            </div>
        </div>
        <div
            class="block__blog border-b border-custom md:border-0 relative"
        >
            <div class="">
                <div class="flex flex-wrap -mx-3">
                    <div v-for="post in hotEventHome" :key="post.hash_id" class="md:w-1/4 sm:w-1/2 w-1/2 px-3 text-sm mb-8">
                        <nuxt-link :to="makePostLink(post)">
                            <div class="relative aspect-ratio-16-9">
                                <img
                                    :src="post.avatar ? toImage(post.avatar, 'full') : '/images/default-book.jpeg'"
                                    alt=""
                                    class="absolute inset-0 w-full h-full object-cover"
                                >
                            </div>
                        </nuxt-link>
                        <div class="pt-3">
                            <div
                                class="content flex pb-2 color-custom-3"
                            >
                                <div class="category capitalize">
                                    {{ post.categories.title }}
                                </div>
                                <div class="time">
                                    {{ post.updated_at | humanizeTime }}
                                </div>
                            </div>
                            <nuxt-link :to="makePostLink(post)">
                                <div class="font-bold mb-2.5 line-calmp line-calmp-title text-line-2">
                                    {{ post.title }}
                                </div>
                            </nuxt-link>
                            <div
                                class="mb-2.5 line-calmp text-line-3"
                            >
                                {{ post.summary }}
                            </div>
                            <div class="">
                                <span
                                    class="author__label font-bold"
                                >
                                    Người viết:
                                </span>
                                <span class="author__value">
                                    {{ post.author.last_name }} {{ post.author.first_name }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { stringToSlug } from '~/utils/hashId';
    import { image as toImage } from '~/utils/url';

    export default {
        props: {
            hotEventHome: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                data: this.hotEventHome,
            };
        },
        methods: {
            toImage,
            makePostLink(post) {
                return `/tin-tuc/${stringToSlug(post.title)}-${post.hash_id}`;
            },
        },

    };
</script>
