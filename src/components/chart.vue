<template>
    <div class="chart">
        <chart :options="chartOptions" :initOptions="initOptions" :autoResize="true" ref="chart" :watchShallow="true"/>
    </div>
</template>
<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markLine'

export default {
    data(){
        return {
            initOptions: {
                width: window.innerWidth,
                height: '110'
            },
            autoResize: true
        }
    },
    props: {
        chartOptions: Object
    },
    components: {
        chart: ECharts
    },
    methods: {
        chartResize(){
            this.initOptions.width = window.innerWidth;
        }
    },
    mounted(){
        window.addEventListener('resize',this.chartResize,false)
    },
    unMount(){
        window.removeEventListener('resize',this.chartResize)
    }
}
</script>
<style lang="scss">
    .chart .echarts{
        width: auto;
        height: auto;
    }
</style>

