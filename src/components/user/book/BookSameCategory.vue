<template>
    <div class="mt-1">
        <div class="flex justify-between items-center pb-6">
            <div class="flex text-2xl font-bold">
                <span>Sách cùng thể loại</span>
            </div>

            <!-- <div class="btn flex items-center">
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
            </div> -->
        </div>
        <div class="block__blog relative swiper-same-cate-book">
            <div class="swiper-container">
                <swiper ref="bookSameCateSW" :options="swiperOption" class="">
                    <swiper-slide v-for="book in booksData" :key="book.hash_id">
                        <div class="text-sm">
                            <div class="relative aspect-ratio-2-4">
                                <nuxt-link :to="makeBookLink(book)">
                                    <img
                                        :src="book.avatar ? toImage(book.avatar, 'full') : '/images/book-4.png'"
                                        alt=""
                                        class="absolute inset-0 w-full h-full object-cover"
                                    >
                                </nuxt-link>
                            </div>
                            <div class="pt-3">
                                <nuxt-link :to="makeBookLink(book)">
                                    <div class="font-bold mb-2.5 line-calmp line-calmp-title">
                                        {{ book.title }}
                                    </div>
                                </nuxt-link>
                                <div v-if="book.categories" class="mb-2.5">
                                    <span
                                        class="author__label font-bold"
                                    >
                                        Thể loại:
                                    </span>
                                    <span class="capitalize author__value">
                                        {{ book.categories.title }}
                                    </span>
                                </div>
                                <div v-if="book.attAuthors">
                                    <span
                                        class="author__label font-bold"
                                    >
                                        Tác giả:
                                    </span>
                                    <span class="author__value">
                                        {{ book.attAuthors.fullname }}
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
            hashId: {
                type: String,
                required: true,
            },
        },
        async fetch() {
            const { data: booksData } = await this.$axios.$get('/web/book/by-category', { params: { hash_id: this.hashId, limit: 7 } });
            this.booksData = booksData;
        },
        data() {
            return {
                booksData: null,
                swiperOption: {
                    slidesPerView: 2,
                    spaceBetween: 65,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 4,
                        },
                        640: {
                            slidesPerView: 3,
                        },
                    },
                },
            };
        },
        methods: {
            toImage,
            swiperNext() {
                this.$refs.bookSameCateSW.$swiper.slideNext();
            },
            swiperPrev() {
                this.$refs.bookSameCateSW.$swiper.slidePrev();
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
