<template>
    <div>
        <div class="flex text-xl font-bold pt-6">
            Về tác giả
        </div>
        <div class="pt-6">
            <div class="flex items-center">
                <div class="mr-3">
                    <a href="#">
                        <img
                            src="/images/blog.png"
                            alt=""
                            class="w-10 h-10 rounded-full"
                        >
                    </a>
                </div>
                <div class="">
                    <a href="#">
                        <div class="font-bold text-base">
                            {{ authorData.fullname }}
                        </div>
                    </a>
                    <!-- <div class="text-gray-500">
                        <span
                            class="color-custom-2"
                        >10000</span>
                        Follow
                    </div> -->
                </div>
            </div>
            <div
                class="mt-4 h-32 overflow-hidden text-left"
                v-html="authorData.summary"
            />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            authorData: {
                type: Object,
            },
        },
    };
</script>
