<template>
    <div class="block__blog">
        <div class="text-xl font-bold pb-1">
            {{ title }}
        </div>
        <div v-for="item in data" :key="item.hash_id" class="flex pb-3">
            <div class="flex-1 pr-4">
                <a :href="makePostLink(item)">
                    <img
                        :src="item.avatar ? toImage(item.avatar, 'full') : '/images/blog-2.png'"
                        alt=""
                        class="object-cover h-24"
                    >
                </a>
            </div>
            <div class="flex-1">
                <a :href="makePostLink(item)">
                    <div class="font-bold text-line-3">
                        {{ item.title }}
                    </div>
                </a>
                <div
                    class="content flex pb-2 color-custom-3"
                >
                    <div class="time">
                        {{ item.updated_at | humanizeTime }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { image as toImage } from '~/utils/url';
    import { stringToSlug } from '~/utils/hashId';

    export default {
        props: {
            title: {
                type: String,
            },
            data: {
                type: Array,
                require: true,
            },
        },
        methods: {
            toImage,
            makePostLink(post) {
                return `/tin-tuc/${stringToSlug(post.title)}-${post.hash_id}`;
            },
        },
    };
</script>
