<template>
    <div class="review">
        <div
            v-for="item in reviewsData"
            :key="item.hash_id"
            class="border-t border-custom border-dashed py-9"
        >
            <div class="flex items-center">
                <div class="mr-8">
                    <nuxt-link :to="`/u/${item.author.username}/posts`">
                        <img
                            :src="item.author.avatar ? toImage(item.author.avatar, 'avatar') : '/images/avatar-default.png' "
                            alt=""
                            class="w-20 h-20 rounded-full"
                        >
                    </nuxt-link>
                </div>
                <div>
                    <div class="flex text-base">
                        <div class="font-bold">
                            <nuxt-link :to="`/u/${item.author.username}/posts`">
                                {{ item.author.first_name }} {{ item.author.last_name }}
                            </nuxt-link>
                        </div>
                        <div
                            class="ml-2 color-custom-3 italic"
                        >
                            @{{ item.author.username }}
                        </div>
                    </div>
                    <div class="flex mt-2">
                        <div class="font-bold">
                            Rate
                        </div>
                        <div
                            class="flex justify-center ml-2"
                        >
                            <BookVote
                                class="mb-5"
                                :read-only="true"
                                :size="15"
                                :rate="item.vote"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="mt-4 overflow-hidden text-left"
                v-html="item.content + '...'"
            />
            <div class="mt-4">
                <!-- <span>31 Comments - </span> -->
                <nuxt-link :to="makeReviewLink(item)" class="color-primary">
                    Xem thêm
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { image as toImage } from '~/utils/url';
    import { stringToSlug } from '~/utils/hashId';
    import BookVote from '~/components/user/book/BookVote.vue';

    export default {
        components: {
            BookVote,
        },
        props: {
            reviewsData: {
                type: Array,
            },
        },
        methods: {
            toImage,
            makeReviewLink(item) {
                return `/danh-gia-sach/${stringToSlug(item.author.username)}-${item.hash_id}`;
            },
        },
    };
</script>
