<template>
    <div>
        <div>
            <star-rating
                v-model="rating"
                :read-only="readOnly || false "
                :star-size="size"
                :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
                :show-rating="false"
                @rating-selected="setCurrentSelectedRating"
            />
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            readOnly: {
                type: Boolean,
            },
            rate: {
                type: Number,
            },
            size: {
                type: Number,
                require: false,
                default: 20,
            },
        },
        data() {
            return {
                rating: this.rate,
            };
        },
        methods: {
            setCurrentSelectedRating(rating) {
                this.$emit('selected', rating);
            },
        },
    };
</script>
