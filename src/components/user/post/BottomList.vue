<template>
    <div class="py-3 mt-3 border-t border-custom border-dashed">
        <div class="flex justify-between items-center pb-6">
            <div class="flex text-2xl font-bold">
                Có thể bạn quan tâm
            </div>
            <div class="btn flex items-center">
                <span
                    class="font-bold cursor-pointer hover-color-primary"
                >
                    <nuxt-link :to="`/danh-muc/${slug}`">Xem tất cả</nuxt-link></span>
                <span
                    class="ml-2 w-4"
                ><img
                    src="/images/icons/right-arrow.svg"
                ></span>
            </div>
        </div>
        <div class="block__blog relative">
            <div
                class="swiper-container swiper-blog-detail"
            >
                <swiper :options="swiperOption" class="swiper">
                    <swiper-slide v-for="post in listPost" :key="post.hash_id" class="">
                        <div class="text-sm mb-7">
                            <nuxt-link :to="makePostLink(post)">
                                <div
                                    class="relative aspect-ratio-16-9"
                                >
                                    <nuxt-link :to="makePostLink(post)">
                                        <img
                                            :src="post.avatar ? toImage(post.avatar, 'full') : '/images/blog-2.png'"
                                            alt=""
                                            class="absolute inset-0 w-full h-full object-cover"
                                        >
                                    </nuxt-link>
                                </div>
                                <div class="pt-3">
                                    <div
                                        class="content flex pb-2 text-gray-500"
                                    >
                                        <div class="category capitalize">
                                            {{ post.categories.title }}
                                        </div>
                                        <div class="time">
                                            {{ post.updated_at | humanizeTime }}
                                        </div>
                                    </div>
                                    <div
                                        class="font-bold mb-2.5 text-line-2"
                                    >
                                        <span>
                                            {{ post.title }}
                                        </span>
                                    </div>
                                    <div
                                        class="mb-2.5 overflow-ellipsis overflow-hidden text-line-3"
                                    >
                                        {{ post.summary }}
                                    </div>
                                    <div class="">
                                        <span
                                            class="author__label font-bold"
                                        >
                                            Người viết:
                                        </span>
                                        <span
                                            class="author__value"
                                        >
                                            {{ post.author.last_name }} {{ post.author.first_name }}
                                        </span>
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
            <div class="hidden md:block">
                <div
                    class="swiper-button swiper-button-next"
                />
                <div
                    class="swiper-button swiper-button-prev"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
    import 'swiper/css/swiper.css';
    import { mapState, mapActions } from 'vuex';
    import { stringToSlug } from '~/utils/hashId';
    import { image as toImage } from '~/utils/url';

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        props: {
            hashId: {
                type: String,
            },
            slug: {
                type: String,
            },
        },
        data() {
            this.fetchByCategory({ hashId: this.hashId, query: [] });
            return {
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        769: {
                            slidesPerView: 3,
                            spaceBetween: 26,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 26,
                        },
                    },
                },
            };
        },
        computed: {
            ...mapState('user/post', ['listPost']),
        },
        methods: {
            toImage,
            makePostLink(post) {
                return `/tin-tuc/${stringToSlug(post.title)}-${post.hash_id}`;
            },
            ...mapActions('user/post', ['fetchByCategory']),
        },
    };
</script>

<style lang="sass" scoped>
    .swiper-button
        border-radius: 100%
        width: 2.5rem
        height: 2.5rem
        z-index: 10
        top: 50%
        opacity: 0.1
    .block__blog:hover .swiper-button
        opacity: 1
    .swiper-button-next
        right: -1.5rem
    .swiper-button-prev
        left: -1.5rem
    .swiper-button-prev:after, .swiper-button-next:after
        font-size: 15px
</style>
