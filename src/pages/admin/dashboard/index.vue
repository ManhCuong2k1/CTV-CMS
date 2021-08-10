<template>
    <div class="bg-gray-100 min-h-screen py-5 -m-5">
        <div class="flex flex-wrap md:flex-nowrap md:mb-5">
            <BoxNumber
                :icon="['fas', 'dollar-sign']"
                :color="'text-green-400'"
                title="Doanh thu hôm nay"
                :value="todayOrderAmount"
            />
            <BoxNumber
                :icon="['fas', 'dollar-sign']"
                :color="'text-blue-400'"
                title="Doanh thu hôm qua"
                :value="yesterdayOrderAmount"
            />
            <BoxNumber
                :icon="['fas', 'dollar-sign']"
                :color="'text-red-400'"
                title="Doanh thu tuần này"
                :value="weekOrderAmount"
            />
            <BoxNumber
                :icon="['fas', 'dollar-sign']"
                :color="'text-yellow-400'"
                title="Doanh thu tháng này"
                :value="monthOrderAmount"
            />
        </div>
        <div class="flex flex-wrap md:flex-nowrap">
            <BoxNumber
                :icon="['fas', 'home']"
                :color="'text-green-400'"
                title="Điểm bán"
                :value="totalPointOfSale"
            />
            <BoxNumber
                v-if="userLoged.type == 'admin'"
                :icon="['fas', 'warehouse']"
                :color="'text-gray-400'"
                title="Nhà phân phối"
                :value="totalDistributor"
            />
            <BoxNumber
                :icon="['fas', 'home']"
                :color="'text-red-400'"
                title="Điểm bán mới"
                :value="totalNewPointOfSale"
            />
            <BoxNumber
                v-if="userLoged.type == 'admin'"
                :icon="['fas', 'warehouse']"
                :color="'text-red-400'"
                title="Nhà phân phối mới"
                :value="totalNewDistributor"
            />
            <BoxNumber
                v-if="userLoged.type == 'distributor'"
                :icon="['fas', 'shopping-cart']"
                :color="'text-red-400'"
                title="Đơn đang chuyển điểm bán"
                :value="totalOrderShipping"
            />
            <BoxNumber
                v-if="userLoged.type == 'distributor'"
                :icon="['fas', 'cogs']"
                :color="'text-red-400'"
                title="Đơn đang sản xuất"
                :value="totalOrderProducer"
            />
        </div>

        <div class="flex flex-wrap md:flex-nowrap mt-5 mx-5 md:mx-5 md:p-5 md:mt-10 bg-white shadow-lg">
            <div class="w-full">
                <OrderProducerChart :labels="labels" :amount-order-by-day="amountOrderByDay" :sum-order-by-day="sumOrderByDay" />
            </div>
        </div>

        <div class="flex flex-wrap md:flex-nowrap w-full mt-5 md:px-5 md:mt-10">
            <div class="w-full md:w-1/2 px-5 md:px-0 md:pr-2">
                <div class="bg-white md:p-3 p-3 mb-5 md:mb-0 shadow-lg">
                    <NewOrderProduce :table-data="newOrder" />
                </div>
            </div>
            <div class="w-full md:w-1/2 px-5 md:px-0 md:pl-2">
                <div class="bg-white md:p-3 p-3 shadow-lg">
                    <TopDistributor v-if="userLoged.type == 'admin'" :table-data="topSeller" />
                    <TopPointOfSale v-if="userLoged.type == 'distributor'" :table-data="topSeller" />
                </div>
            </div>
        </div>

        <!-- <div class="flex flex-wrap md:flex-nowrap w-full md:mt-10 mt-5">
            <div class="w-full md:w-1/2 bg-white md:mx-5 md:p-7 p-3 mb-5 md:mb-0 shadow-lg">
                <ProductRatio />
            </div>
            <div class="w-full md:w-1/2 bg-white md:mx-5 md:p-7 p-3 shadow-lg">
                <CityRatio />
            </div>
        </div> -->
    </div>
</template>

<script>
    import moment from 'moment';
    import BoxNumber from '~/components/admin/dashboard/BoxNumber.vue';
    import OrderProducerChart from '~/components/admin/dashboard/OrderProducerChart.vue';
    import NewOrderProduce from '~/components/admin/dashboard/NewOrderProduce.vue';
    import TopDistributor from '~/components/admin/dashboard/TopDistributor.vue';
    import TopPointOfSale from '~/components/admin/dashboard/TopPointOfSale.vue';
    // import ProductRatio from '~/components/admin/dashboard/ProductRatio.vue';
    // import CityRatio from '~/components/admin/dashboard/CityRatio.vue';

    export default {
        layout: 'admin',
        components: {
            BoxNumber,
            OrderProducerChart,
            NewOrderProduce,
            TopDistributor,
            TopPointOfSale,
            // ProductRatio,
            // CityRatio,
        },

        async asyncData({ $axios }) {
            const data = await $axios.$get('/admin/dashboard');
            return {
                weekOrderAmount: parseInt(data.weekOrderAmount[0].total_amount, 10) || 0,
                yesterdayOrderAmount: parseInt(data.yesterdayOrderAmount[0].total_amount, 10) || 0,
                todayOrderAmount: parseInt(data.todayOrderAmount[0].total_amount, 10) || 0,
                monthOrderAmount: parseInt(data.monthOrderAmount[0].total_amount, 10) || 0,
                totalPointOfSale: parseInt(data.totalPointOfSale, 10) || 0,
                totalDistributor: parseInt(data.totalDistributor, 10) || 0,
                totalNewPointOfSale: parseInt(data.totalNewPointOfSale, 10) || 0,
                totalNewDistributor: parseInt(data.totalNewDistributor, 10) || 0,
                labels: data.amountOrderByDay.map((i) => moment(i.formatCreatedAt, 'YYYYMMDD').format('DD-MM')),
                amountOrderByDay: data.amountOrderByDay.map((i) => i.count),
                sumOrderByDay: data.sumOrderByDay.map((i) => i.total),
                newOrder: data.newOrder,
                topSeller: data.topSeller,
                totalOrderShipping: data.totalOrderShipping,
                totalOrderProducer: data.totalOrderProducer,
            };
        },

        computed: {
            userLoged() {
                return this.$store.state.auth.user;
            },
        },
    };
</script>
