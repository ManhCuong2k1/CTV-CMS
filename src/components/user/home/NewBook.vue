<template>
    <div class="mt-8">
        <div class="flex justify-between items-center pb-6">
            <div class="flex text-2xl font-bold">
                <a href="#">Sách mới</a>
            </div>

            <div class="btn flex items-center">
                <span
                    class="font-bold cursor-pointer hover-color-primary"
                >
                    <a href="#">Xem tất cả</a>
                </span>
                <span
                    class="ml-2 w-4"
                ><img
                    src="/images/icons/right-arrow.svg"
                    alt=""
                ></span>
            </div>
        </div>
        <div class="block__blog relative sw-wrapper swiper-new-book">
            <div class="swiper-container">
                <swiper ref="newBookSwiper" :options="swiperOption" class="">
                    <swiper-slide v-for="book in bookNewHome" :key="book.hash_id" class="">
                        <div class="text-sm">
                            <div class="relative aspect-ratio-2-4">
                                <a :href="makeBookLink(book)">
                                    <img
                                        :src="book.avatar ? toImage(book.avatar, 'full') : '/images/book-4.png'"
                                        alt=""
                                        class="absolute inset-0 w-full h-full object-cover"
                                    >
                                </a>
                            </div>
                            <div class="pt-3">
                                <a :href="makeBookLink(book)">
                                    <div class="font-bold mb-2.5 line-calmp line-calmp-title">
                                        {{ book.title }}
                                    </div>
                                </a>
                                <div v-if="book.attPublishers" class="mb-2.5">
                                    <span
                                        class="author__label font-bold"
                                    >
                                        NXB:
                                    </span>
                                    <span class="author__value">
                                        {{ book.attPublishers.name }}
                                    </span>
                                </div>
                                <div v-if="book.attAuthors">
                                    <span
                                        class="author__label font-bold"
                                    >
                                        Tác giả:
                                    </span>
                                    <span class="author__value">
                                        {{ book.attAuthors.full_name }}
                                    </span>
                                </div>
                            </div>
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
    import { image as toImage } from '~/utils/url';
    import { stringToSlug } from '~/utils/hashId';

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        props: {
            bookNewHome: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 1.5,
                    spaceBetween: 65,
                    centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-new-book .swiper-button-next',
                        prevEl: '.swiper-new-book .swiper-button-prev',
                    },
                    breakpoints: {
                        769: {
                            slidesPerView: 4,
                            centeredSlides: false,
                        },
                        640: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                        320: {
                            spaceBetween: 35,
                        },
                    },
                },
            };
        },
        methods: {
            toImage,
            swiperNext() {
                this.$refs.newBookSwiper.$swiper.slideNext();
            },
            swiperPrev() {
                this.$refs.newBookSwiper.$swiper.slidePrev();
            },
            makeBookLink(book) {
                return `/sach/${stringToSlug(book.title)}-${book.hash_id}`;
            },
        },
    };
</script>

<style lang="sass" scoped>
    .swiper-button
        opacity: 0.1
        border-radius: 100%
        width: 2.5rem
        height: 2.5rem
        z-index: 10
        top: 50%
    .sw-wrapper:hover .swiper-button
        opacity: 1
    .swiper-button-next
        right: -1.5rem
    .swiper-button-prev
        left: -1.5rem
    .swiper-button-prev:after, .swiper-button-next:after
        font-size: 15px
</style>
