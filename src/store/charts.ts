import { defineStore } from 'pinia'

interface ChartData {
  barData: { name: string; value: number }[]
  pieData: { name: string; value: number }[]
  lineData: {
    times: string[]
    values: number[]
  }
}

export const useChartStore = defineStore('chart', {
  state: (): ChartData => ({
    barData: [],
    pieData: [],
    lineData: {
      times: [],
      values: []
    }
  }),
  actions: {
    generateBarData() {
      const categories = ['类别A', '类别B', '类别C', '类别D', '类别E']
      this.barData = categories.map(category => ({
        name: category,
        value: Math.floor(Math.random() * 1000)
      }))
    },
    generatePieData() {
      const types = ['类型1', '类型2', '类型3', '类型4']
      this.pieData = types.map(type => ({
        name: type,
        value: Math.floor(Math.random() * 100)
      }))
    },
    generateLineData() {
      const times = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        return date.toLocaleDateString()
      })
      this.lineData = {
        times,
        values: times.map(() => Math.floor(Math.random() * 200))
      }
    },
    generateAllData() {
      this.generateBarData()
      this.generatePieData()
      this.generateLineData()
    }
  }
})