<template>
    <div>
        <div class="px-3 mt-3">
            <div
                v-for="item in reviewsData"
                :key="item.hash_id"
                class="flex items-center mb-3 border-b pb-3"
            >
                <div class="w-full">
                    <div class="flex justify-between md:text-base w-full">
                        <div class="md:flex flex-1 flex-wrap text-sm">
                            <div class="text-sm mr-2">
                                <span class="capitalize">{{ item.author.first_name }} {{ item.author.last_name }}</span>
                            </div>
                            <span class="mr-2 text-gray-400"> {{ item.updated_at | humanizeTime }} </span>
                            <div>
                                <el-tag
                                    v-if="item.status !== 'publish'"
                                    effect="dark"
                                    size="mini"
                                >
                                    Chờ duyệt
                                </el-tag>
                                <el-tag
                                    v-if="item.status === 'publish'"
                                    effect="dark"
                                    size="mini"
                                    type="success"
                                >
                                    Đã duyệt
                                </el-tag>
                            </div>
                        </div>
                        <div>
                            <el-button size="mini">
                                Sửa
                            </el-button>
                        </div>
                    </div>
                    <div class="flex">
                        <span class="text-lg font-bold">{{ item.book.title }}</span>
                    </div>
                    <div class="flex mt-1">
                        <div class="flex mr-5">
                            <img src="/images/icons/eye.svg" class="w-3">
                            <span class="color-custom-2 ml-1">
                                100
                            </span>
                        </div>
                        <div class="flex mr-5">
                            <img src="/images/icons/bookmark.svg" class="w-3">
                            <span class="color-custom-2 ml-1">
                                100
                            </span>
                        </div>
                        <div class="flex mr-5">
                            <img src="/images/icons/messenger.svg" class="w-3">
                            <span class="color-custom-2 ml-1">
                                100
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            reviewsData: {
                type: Array,
                require: true,
            },
        },
    };
</script>
