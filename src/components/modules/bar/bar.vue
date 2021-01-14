<template>
	<div ref="myEcharts" class="echarts" :style="{width:chartData.width+'px',height:chartData.height+'px'}"></div>
</template>

<script>
	function accMul(arg1,arg2){ 
    var m=0,s1=arg1.toString(),s2=arg2.toString(); 
    try{m+=s1.split(".")[1].length}catch(e){} 
    try{m+=s2.split(".")[1].length}catch(e){} 
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
} 
	export default {
		name: 'bar',
		props: {
			chartData:{
				type:Object,
				default(){
					return {
					type:"bar",
					left:0,
					top:0,
					width:300,
					height:200,
					data:[
						{
							name:'上海',
							value:100,
						},{
							name:'北京',
							value:30,
						},{
							name:'广州',
							value:90,
						},{
							name:'深圳',
							value:23,
						},{
							name:'河南',
							value:200,
						},
					]
				}
				}
			}
		},
		computed:{
			chartDataResponse(){
				return this.chartData;
			},
		},
		watch:{
			 'chartData.width': {
			      deep: true,  // 深度监听
			      handler(newVal,oldVal) {
			         console.log(newVal,oldVal)
					 this.myChart.resize();
			      }
			  },
			  'chartData.height': {
			       deep: true,  // 深度监听
			       handler(newVal,oldVal) {
					   
			          console.log(newVal,oldVal)
			  					 this.myChart.resize();
			       }
			   },
			   'chartData.data': {
			        deep: true,  // 深度监听
			        handler(newVal,oldVal) {
						console.log('oldVal',oldVal)
						console.log('newVal',newVal)
			   			this.init();
			        }
			    }
		},
		data() {
			return {
				myChart:null,
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			init(){
				let that = this;
				var fontColor = 'rgba(255,255,255,1)';
				let xData = [],yData=[];
				this.chartData.data.forEach(item=>{
					xData.push(item.name);
					yData.push(item.value);
				})
				
				let option = {
					backgroundColor:this.chartData.backgroundColor,
					tooltip: {
						trigger: 'axis',
					},
					legend:this.chartData.option.legend,
					grid: this.chartData.option.grid,
					xAxis: {
						type: 'category',
						data: xData,
						axisTick:this.chartData.option.xAxis.axisTick,
						axisLine: this.chartData.option.xAxis.axisLine,
						axisLabel:this.chartData.option.xAxis.axisLabel,
						splitLine: this.chartData.option.xAxis.splitLine,
					},
					yAxis: {
						type: 'value',
						axisTick: {
							show: false
						},
						axisLine: {
							show: false,
							lineStyle: {
								color: 'rgba(255,255,255,0.05)'
							}
						},
						axisLabel: {
							formatter: '{value}',
							color: fontColor,
							fontSize: 12
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: 'rgba(255,255,255,0.05)',
								type: 'dashed'
							}
						},
					},
					series: [{
						name: this.chartData.seriesName,
						type: 'bar',
						barWidth: '10',
						barMinHeight:'2',
						data: yData,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0.3,
									color: 'rgba(84,232,215,1)'
								}, {
									offset: 1,
									color: 'rgba(30,208,188,1)'
								}], false),
							},
							emphasis: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
									offset: 0.3,
									color: 'rgba(132,222,255,1)'
								}, {
									offset: 1,
									color: 'rgba(76,208,255,1)'
								}], false),
							}
						}
					}]
				};
				this.myChart = echarts.init(this.$refs.myEcharts);
				this.myChart.clear();
				this.myChart.setOption(option,true);
			}
		}
		
	}
</script>

<style scoped>
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>
