<template>
    <div>
        <TopBar />
        <Header />
        <Nuxt />
        <Footer />
    </div>
</template>

<script>
    import TopBar from '~/components/layout/TopBar.vue';
    import Header from '~/components/layout/Header.vue';
    import Footer from '~/components/layout/Footer.vue';

    export default {
        components: {
            TopBar,
            Header,
            Footer,
        },
    };
</script>

<style lang="scss" src="@/assets/scss/index.scss">
</style>
