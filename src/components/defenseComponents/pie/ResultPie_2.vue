<template>
  <div style="width: 100%;height: 100%;" ref="myEcharts"></div>
</template>

<script>
import echarts from 'echarts/index';
export default {
  name: "ResultPie_2",
  props: ['chartData', 'title', 'type'],
  data () {
    return {
    }
  },
  mounted () {
    let data = this.chartData[0];
    if (!data.value && data.value != 0) {
      data.value = 100;
    }
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
      color:['#00fff4','#fff'],
      title: {
        text: '影响比例',
        left: 'center',
        bottom: '5',
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['50%', '40%'],
          avoidLabelOverlap: false,
          label: {
            position: 'center',
            fontSize: '20',
            color: '#fff',
            formatter: data.value + '%'
          },
          labelLine: {
            show: false
          },
          data: [{
            value: data.value,
            label:{
              normal:{
                show:true
              }
            }
          },
          {
            value: 100-data.value,
            name: ''
          }],
        }
      ]
    };
    let myChart = new echarts.init(this.$refs.myEcharts);
    myChart.setOption(option);
  },
}
</script>

<style scoped>

</style>
