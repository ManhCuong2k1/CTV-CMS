<template>
    <div class="max-w-screen-lg mx-auto mt-6 md:mt-12 px-4 lg:px-0 main-content">
        <div class="flex flex-wrap justify-between items-center pb-6">
            <div class="flex text-2xl font-bold order-1">
                Thịnh Hành
            </div>
            <div
                class="tabs order-3 md:order-2 w-full pt-6 md:w-auto md:border md:py-2.5 md:px-10 md:border-r-0 md:border-l-0 md:border-custom"
            >
                <div
                    class="tabs__list text-center flex justify-between"
                >
                    <div
                        :class="`tabs__item flex-auto md:px-10 hover-color-primary ${slug === 'diem-sach' ? 'color-primary' : ''}`"
                    >
                        <span class="tabs__link font-bold cursor-pointer" @click="loadPosts('diem-sach')">
                            Điểm sách
                        </span>
                    </div>
                    <div
                        :class="`tabs__item flex-auto md:px-10 hover-color-primary ${slug === 'goc-nhin' ? 'color-primary' : ''}`"
                    >
                        <span class="tabs__link font-bold cursor-pointer" @click="loadPosts('goc-nhin')">
                            Góc nhìn
                        </span>
                    </div>
                    <div
                        :class="`tabs__item flex-auto md:px-10 hover-color-primary ${slug === 'serrie' ? 'color-primary' : ''}`"
                    >
                        <span class="tabs__link font-bold cursor-pointer" @click="loadPosts('serrie')">
                            Serries
                        </span>
                    </div>
                </div>
            </div>
            <div class="btn flex items-center order-2 md:order-3">
                <span
                    class="font-bold cursor-pointer hover-color-primary"
                ><a :href="`/danh-muc/${slug}`">Xem tất cả</a></span>
                <span
                    class="ml-2 w-4"
                ><img
                    src="/images/icons/right-arrow.svg"
                    alt=""
                ></span>
            </div>
        </div>
        <div v-if="postsData.length" class="block__blog border-b border-custom">
            <div class="grid lg:grid-cols-7 sm:grid-cols-2 sm:gap-5">
                <div class="sm:col-span-2 lg:col-span-3 mb-6">
                    <div class="relative md:h-full">
                        <nuxt-link class="md:h-full" :to="makePostLink(postsData[0])">
                            <div class="md:h-full flex justify-center overflow-hidden">
                                <img class="md:h-full md:max-w-none md:w-auto" :src="postsData[0].avatar ? toImage(postsData[0].avatar, 'full') : '/images/default-book.jpeg'" alt="">
                            </div>
                            <div
                                class="absolute left-0 bottom-0 bg-black bg-opacity-50 text-white py-6 px-8 w-full"
                            >
                                <div
                                    class="content flex pb-2 color-custom-3"
                                >
                                    <div class="category capitalize text-white">
                                        {{ postsData[0].categories.title }}
                                    </div>
                                    <div class="time text-white">
                                        {{ postsData[0].updated_at | humanizeTime }}
                                    </div>
                                </div>
                                <div class="text-base pb-2 text-line-2">
                                    {{ postsData[0].title }}
                                </div>
                                <div class="">
                                    <span
                                        class="author__label font-bold"
                                    >
                                        Người viết:
                                    </span>
                                    <span class="author__value">
                                        {{ postsData[0].author.last_name }} {{ postsData[0].author.first_name }}
                                    </span>
                                </div>
                            </div>
                        </nuxt-link>
                    </div>
                </div>
                <div class="sm:col-span-1 lg:col-span-2">
                    <div class="flex flex-wrap">
                        <div v-for="post in postsData.slice(1, 3)" :key="post.hash_id" class="text-sm mb-9 md:mb-7 w-full">
                            <div class="relative aspect-ratio-16-9">
                                <nuxt-link :to="makePostLink(post)">
                                    <img
                                        :src="post.avatar ? toImage(post.avatar, 'full') : '/images/default-book.jpeg'"
                                        alt=""
                                        class="absolute inset-0 w-full h-full object-cover"
                                    >
                                </nuxt-link>
                            </div>
                            <div class="pt-3">
                                <nuxt-link :to="makePostLink(post)">
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
                                    <div class="font-bold text-line-2">
                                        {{ post.title }}
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sm:col-span-1 lg:col-span-2 mb-9 lg:mb-12">
                    <div class="relative aspect-ratio-16-9 mb-6">
                        <a href="">
                            <img
                                src="/images/blog-3.png"
                                alt=""
                                class="absolute inset-0 w-full h-full object-cover"
                            >
                        </a>
                    </div>
                    <div class="flex flex-wrap content-between">
                        <div v-for="post in postsData.slice(3, 6)" :key="post.hash_id" class="flex pb-3 text-xs">
                            <div class="flex-1 pr-4">
                                <nuxt-link :to="makePostLink(post)">
                                    <img
                                        :src="post.avatar ? toImage(post.avatar, 'full') : '/images/default-book.jpeg'"
                                        alt=""
                                        class="md:h-20 h-28  object-cover"
                                    >
                                </nuxt-link>
                            </div>
                            <div class="flex-1">
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
                                    <div class="font-bold text-line-2">
                                        {{ post.title }}
                                    </div>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center">
            Chưa có dữ liệu
        </div>
    </div>
</template>

<script>
    import { stringToSlug } from '~/utils/hashId';
    import { image as toImage } from '~/utils/url';

    export default {
        props: {
            postsData: {
                type: Array,
                required: true,
            },
            slug: {
                type: String,
                required: true,
            },
        },
        data() {
            return {
            };
        },
        methods: {
            toImage,
            stringToSlug,
            makePostLink(post) {
                return `/tin-tuc/${stringToSlug(post.title)}-${post.hash_id}`;
            },
            loadPosts(slug) {
                this.$emit('changePosts', slug);
            },
        },
    };
</script>
