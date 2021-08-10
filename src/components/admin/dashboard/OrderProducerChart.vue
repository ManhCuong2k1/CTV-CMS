<template>
    <div>
        <LineChart
            :data="chartData"
            :options="chartOptions"
            :height="100"
        />
    </div>
</template>

<script>
    import LineChart from '../shared/LineChart';

    export default {
        components: {
            LineChart,
        },
        props: {
            labels: {
                type: Array,
            },
            amountOrderByDay: {
                type: Array,
            },
            sumOrderByDay: {
                type: Array,
            },
        },
        data() {
            return {
                chartData: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: 'Doanh thu',
                            yAxisID: 'A',
                            borderColor: 'red',
                            tension: 0,
                            backgroundColor: 'transparent',
                            data: this.sumOrderByDay,
                        }, {
                            label: 'Đơn hàng',
                            yAxisID: 'B',
                            borderColor: 'skyblue',
                            tension: 0,
                            backgroundColor: 'transparent',
                            data: this.amountOrderByDay,
                        },
                    ],
                },
                chartOptions: {
                    scales: {
                        yAxes: [{
                            id: 'A',
                            type: 'linear',
                            position: 'left',
                            ticks: {
                                callback(label) {
                                    return label.toLocaleString();
                                },
                                precision: 0,
                            },
                        }, {
                            id: 'B',
                            type: 'linear',
                            position: 'right',
                            ticks: {
                                precision: 0,
                            },
                        }],
                    },
                    tooltips: {
                        callbacks: {
                            label(tooltipItem) {
                                return tooltipItem.yLabel.toLocaleString();
                            },
                        },
                    },
                },
            };
        },
        methods: {
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            },
        },
    };
</script>
