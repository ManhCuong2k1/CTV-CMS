<template>
    <div>
        <div class="flex text-xl font-bold pt-6">
            Trích dẫn
        </div>
        <div class="mt-4 text-justify">
            {{ bookQuote }}
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            bookQuote: {
                type: String,
            },
        },
    };
</script>
