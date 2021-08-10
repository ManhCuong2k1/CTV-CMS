<template>
    <div>
        <div class="swiper-container swiper-banner">
            <swiper ref="bannerSwiper" :options="swiperOption" class="swiper-wrapper">
                <swiper-slide v-for="item in bannersData" :key="item.index">
                    <img :src="toImage(item.banner, 'full')" alt="">
                </swiper-slide>
            </swiper>
            <div class="swiper-pagination" />
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
            bannersData: {
                type: Array,
                require: true,
            },
        },
        data() {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-banner .swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-banner .swiper-button-next',
                        prevEl: '.swiper-banner .swiper-button-prev',
                    },
                },
            };
        },
        methods: {
            toImage,
        },
    };
</script>
