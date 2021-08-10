<template>
    <div class="py-9 md:py-12 border-b border-custom">
        <div class="flex justify-between items-center mb-6 hidden">
            <div class="flex text-2xl font-bold">
                <a href="#">Cây Viết Tích Cực</a>
            </div>

            <div class="btn flex items-center">
                <span
                    class="font-bold cursor-pointer hover-color-primary hidden"
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
        <div class="relative sw-wrapper swiper-testimonial">
            <div class="swiper-container">
                <swiper ref="feedBackSwiper" :options="swiperOption" class="">
                    <swiper-slide v-for="item in feedbacks" :key="item.index" class="">
                        <div class="shadow-lg mb-12 py-4 px-7">
                            <div class="flex items-center">
                                <img
                                    :src="item.avatar ? toImage(item.avatar, 'avatar') : '/images/avatar-default.png'"
                                    alt=""
                                    class="w-24 h-24 rounded-full"
                                >
                                <div class="ml-5">
                                    <div class="font-bold">
                                        {{ item.name }}
                                    </div>
                                    <div class="color-custom">
                                        {{ item.title }}
                                    </div>
                                    <div class="w-5 mt-2">
                                        <img
                                            src="/images/icons/iconquote.png"
                                            alt=""
                                        >
                                    </div>
                                </div>
                            </div>
                            <div
                                class="h-20 overflow-hidden mt-4 text-sm"
                            >
                                {{ item.content }}
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>
                <div class="swiper-pagination" />
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

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        props: {
            feedbacks: {
                type: Array,
                require: true,
            },
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: true,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-testimonial .swiper-button-next',
                        prevEl: '.swiper-testimonial .swiper-button-prev',
                    },
                    breakpoints: {
                        769: {
                            slidesPerView: 3,
                            centeredSlides: false,
                        },
                        640: {
                            slidesPerView: 1.3,
                            centeredSlides: true,
                        },
                        320: {
                            slidesPerView: 1.3,
                            centeredSlides: true,
                        },
                    },
                },
            };
        },
        methods: {
            toImage,
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
