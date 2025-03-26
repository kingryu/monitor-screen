<template>
  <div class="screen-container">
    <el-row :gutter="16">
      <el-col :span="8">
        <el-card class="chart-card">
          <div ref="chart1" class="echarts-container"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <div ref="chart2" class="echarts-container"></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="chart-card">
          <div ref="chart3" class="echarts-container"></div>
        </el-card>
      </el-col>
    </el-row>
    <div class="left-pannel">
      <div class="left-item">项目1</div>
      <div class="left-item">项目2</div>
      <div class="left-item">项目3</div>
      <div class="left-item">项目4</div>
      <div class="left-item">项目5</div>
    </div>
    <div class="bottom-bar">
        <el-button>项目</el-button>
        <el-button>性能</el-button>
        <el-button>故障</el-button>
        <el-button>设备管理</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { useChartStore } from '@/store/charts'

const chartStore = useChartStore()
const chart1 = ref<HTMLElement>()
const chart2 = ref<HTMLElement>()
const chart3 = ref<HTMLElement>()

let chartInstance1: echarts.ECharts | null = null
let chartInstance2: echarts.ECharts | null = null
let chartInstance3: echarts.ECharts | null = null

const initCharts = () => {
  if (chart1.value) {
    chartInstance1 = echarts.init(chart1.value)
    chartStore.generateBarData()
    chartInstance1.setOption({
      title: { text: '各类别数据统计', textStyle: { color: '#fff' } },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: chartStore.barData.map(item => item.name),
        axisLabel: { color: '#fff' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' }
      },
      series: [{
        type: 'bar',
        data: chartStore.barData.map(item => item.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        }
      }]
    })
  }
  if (chart2.value) {
    chartInstance2 = echarts.init(chart2.value)
    chartStore.generatePieData()
    chartInstance2.setOption({
      title: { text: '数据类型分布', textStyle: { color: '#fff' } },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        textStyle: { color: '#fff' },
        data: chartStore.pieData.map(item => item.name)
      },
      series: [{
        name: '数据分布',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartStore.pieData
      }]
    })
  }
  if (chart3.value) {
    chartInstance3 = echarts.init(chart3.value)
    chartStore.generateLineData()
    chartInstance3.setOption({
      title: { text: '近7天数据趋势', textStyle: { color: '#fff' } },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: chartStore.lineData.times,
        axisLabel: { color: '#fff' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#fff' }
      },
      series: [{
        type: 'line',
        data: chartStore.lineData.values,
        smooth: true,
        symbol: 'none',
        areaStyle: {
          opacity: 0.3,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(128, 255, 165)'
          }, {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }])
        },
        itemStyle: {
          color: '#80FFA5'
        },
        emphasis: {
          focus: 'series'
        }
      }]
    })
  }
}

const handleResize = () => {
  chartInstance1?.resize()
  chartInstance2?.resize()
  chartInstance3?.resize()
}

onMounted(() => {
  initCharts()
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance1?.dispose()
  chartInstance2?.dispose()
  chartInstance3?.dispose()
})
</script>

<style scoped lang="scss">
.screen-container {
  width: 100%;
  height: 100%;
  background-color: #0f1624;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
}

.chart-card {
  height: 320px;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  :deep(.el-card__body) {
    height: 100%;
    padding: 12px;
  }
}

.echarts-container {
  width: 100%;
  height: 100%;
}
.bottom-bar {
  position: absolute;
  bottom: 10px;
  left: 0;
  width:100%;
}
.left-pannel{
  position: absolute;
  left:10px;
  top:330px;
  height:700px;
  width:200px;
  background-color: #0f1624;
}
.left-item{
    font-family: pmzd;
    font-size: 14px;
    color: #fff;
    height:100px;
    line-height: 100px;
    margin: 10px;
    background-color: #14223f;
    border: 1px solid #1d2d4e;
}
</style>