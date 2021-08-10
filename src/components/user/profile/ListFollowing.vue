<template>
    <div>
        <div class="flex flex-wrap px-3 mt-3">
            <div
                v-for="item in listFollowing"
                :key="item.hash_id"
                class="items-center md:w-1/2 mb-3 pb-3"
            >
                <UserCard :user-info="item" :show-username="false" />
            </div>
        </div>
    </div>
</template>

<script>
    import UserCard from '~/components/user/share/UserCard.vue';

    export default {
        components: {
            UserCard,
        },
        props: {
            listFollowing: {
                type: Array,
                require: true,
            },
        },
    };
</script>
