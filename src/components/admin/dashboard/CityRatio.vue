<template>
    <div>
        <div>
            <span class="font-bold text-gray-600 text-lg">Tỉ trọng đơn hàng theo thành phố</span>
        </div>
        <DoughnutChart
            :data="chartData"
            :options="chartOptions"
            :height="300"
        />
    </div>
</template>

<script>
    import DoughnutChart from '../shared/DoughnutChart';

    export default {
        components: {
            DoughnutChart,
        },
        data() {
            return {
                chartData: {
                    labels: [
                        'Hà Nội',
                        'Thái Bình',
                        'New York',
                        'London',
                    ],
                    datasets: [
                        {
                            backgroundColor: [
                                this.randomColor(),
                                this.randomColor(),
                                this.randomColor(),
                                this.randomColor(),
                                this.randomColor(),
                                this.randomColor(),
                                this.randomColor(),
                            ],
                            data: [1000000, 2000000, 3000000,
                                   8000000,
                            ],
                        },
                    ],
                },
                chartOptions: {
                    tooltips: {
                        callbacks: {
                            label(tooltipItem, data) {
                                const dataset = data.datasets[0].data[tooltipItem.index];
                                const label = data.labels[tooltipItem.index];
                                return `${label}: ${dataset.toLocaleString()}`;
                            },
                        },
                    },
                },
            };
        },
        methods: {
            randomColor() {
                return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
            },
        },
    };
</script>
