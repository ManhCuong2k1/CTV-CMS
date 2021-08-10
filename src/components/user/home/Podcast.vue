<template>
    <div class="mt-6 md:mt-12 border-b border-custom">
        <div class="flex justify-between items-center pb-6">
            <div class="flex text-2xl font-bold">
                <a href="#">Video / Post card</a>
            </div>

            <div class="btn flex items-center hidden">
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
        <div class="block__blog">
            <div class="grid grid-cols-1 lg:grid-cols-5 lg:gap-5">
                <div class="pb-6 lg:col-span-3 lg:pb-12">
                    <div class="relative">
                        <div class="blog__media">
                            <a :href="podcasts[0].link" target="_blank">
                                <img
                                    :src="toImage(podcasts[0].thumbnail, 'full')"
                                    alt=""
                                    class="absolute inset-0 w-full h-full object-cover"
                                >
                            </a>
                        </div>
                        <div
                            class="absolute left-0 bottom-0 bg-black bg-opacity-50 text-white py-6 px-8 w-full"
                        >
                            <a :href="podcasts[0].link" target="_blank">
                                <div
                                    class="content flex pb-2 color-custom-3 hidden"
                                >
                                    <div class="category">
                                        Trinh thám
                                    </div>
                                    <div class="time">
                                        3 tuần trước
                                    </div>
                                </div>

                                <div class="text-base pb-2">
                                    {{ podcasts[0].title }}
                                </div>
                                <div class="">
                                    <span
                                        class="author__label font-bold"
                                    >
                                        Tác giả:
                                    </span>
                                    <span class="author__value">
                                        {{ podcasts[0].author }}
                                    </span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="pb-6 lg:col-span-2 lg:pb-12">
                    <div class="flex flex-wrap">
                        <div
                            v-for="item in podcasts.slice(1, 4)"
                            :key="item.index"
                            class="flex flex-wrap pb-5 text-sm md:flex-nowrap"
                        >
                            <div
                                class="w-full h-36 overflow-hidden md:mr-6 md:flex-1 md:w-auto h-fit-content"
                            >
                                <a :href="item.link" target="_blank">
                                    <img
                                        :src="toImage(item.thumbnail, 'full')"
                                        alt=""
                                        class=""
                                    >
                                </a>
                            </div>
                            <div
                                class="mt-3 border-custom md:mt-0 md:border-b md:flex-1"
                            >
                                <div
                                    class="content flex pb-2 color-custom-3 hidden"
                                >
                                    <div class="category">
                                        Trinh thám
                                    </div>
                                    <div class="time">
                                        3 tuần trước
                                    </div>
                                </div>
                                <a :href="item.link" target="_blank">
                                    <div class="font-bold">
                                        {{ item.title }}
                                    </div>
                                </a>
                                <div class="mt-3">
                                    <span
                                        class="author__label font-bold"
                                    >
                                        Tác giả:
                                    </span>
                                    <span class="author__value">
                                        {{ item.author }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { image as toImage } from '~/utils/url';

    export default {
        components: {
        },
        props: {
            podcasts: {
                type: Array,
                require: true,
            },
        },
        data() {
            return {
            };
        },
        methods: {
            toImage,
        },
    };
</script>
