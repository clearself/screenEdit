<template>
  <div style="width: 100%;height: 100%;" ref="myEcharts"></div>
</template>

<script>
import echarts from 'echarts/index';
export default {
  name: "ResultPie_1",
  props: ['chartData', 'title', 'type'],
  data () {
    return {
    }
  },
  mounted () {
    let data = this.chartData;
    console.log(data)
    // let data = [{name: '192.168.192.123', value: 1},
    //   {name: '192.168.192.122', value: 2},
    //   {name: '192.168.122.122', value: 3},
    //   {name: '192.128.192.123', value: 4},
    //   {name: '192.168.194.123', value: 5},
    //   {name: '192.148.192.123', value: 6},
    //   {name: '142.168.192.123', value: 7},
    //   {name: '其他', value: 9}];
    let option = option = {
      color:['#0bcfff', '#00fff4', '#7ffffe'],
      title: {
        text: '影响资产类型',
        left: 'center',
        bottom: '5',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} 件',
        position: ['50%', '50%']
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '60%',
          center: ['50%', '40%'],
          data: data,
          label: {
            formatter: '{c} 件',
          },
          labelLine: {
            show: true,
            smooth: false,
            length: 10,
            length2: 10,
            lineStyle: {
              type: 'dotted',
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    let myChart = new echarts.init(this.$refs.myEcharts);
    myChart.setOption(option, true);
  },
}
</script>

<style scoped>

</style>
