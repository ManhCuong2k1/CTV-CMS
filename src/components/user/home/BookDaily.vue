<template>
    <div class="mt-8 md:mt-12 block__book main-content">
        <div
            class="max-w-screen-lg mx-auto px-4 flex justify-between items-center pb-2"
        >
            <div class="flex text-2xl font-bold">
                Sách Hôm Nay
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
        <div class="px-4 lg:px-0">
            <swiper ref="bookDailySwiper" :options="swiperOption" class="m-4">
                <swiper-slide v-for="book in bookDailyHome" :key="book.hash_id" class="colum-slide">
                    <nuxt-link :to="`/sach/${stringToSlug(book.title)}-${book.hash_id}`">
                        <img :src="book.avatar ? toImage(book.avatar, 'full') : '/images/book-4.png'" class="img-slide">
                    </nuxt-link>
                </swiper-slide>
            </swiper>
            <div
                class="max-w-screen-lg mx-auto px-4 hidden swiper-navigation relative md:flex items-center"
            >
                <div class="swiper-scrollbar bg-gray-custom" />
                <div class="swiper-button flex">
                    <div class="swiper-button-right static" @click="swiperPrev">
                        <img src="images/icons/iconRight.svg" alt="">
                    </div>
                    <div class="swiper-button-left static" @click="swiperNext">
                        <img src="images/icons/iconLeft.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
    import 'swiper/css/swiper.css';
    import { stringToSlug } from '~/utils/hashId';
    import { image as toImage } from '~/utils/url';

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        props: {
            bookDailyHome: {
                type: Array,
                required: true,
            },
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 7,
                    spaceBetween: 23,
                    centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-right',
                        prevEl: '.swiper-button-left',
                    },
                    breakpoints: {
                        769: {
                            slidesPerView: 5.6,
                            spaceBetween: 0,
                        },
                        640: {
                            slidesPerView: 3.5,
                            spaceBetween: 0,
                        },
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    },
                },
            };
        },
        methods: {
            toImage,
            stringToSlug,
            swiperNext() {
                this.$refs.bookDailySwiper.$swiper.slideNext();
            },
            swiperPrev() {
                this.$refs.bookDailySwiper.$swiper.slidePrev();
            },
        },
    };
</script>
