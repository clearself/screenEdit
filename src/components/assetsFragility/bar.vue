<template>
	<div ref="myEcharts" class="echarts"></div>
</template>

<script>
	export default {
		name: 'bar',
		props: ['chartData', 'title', 'type'],
		data() {
			return {
				
			}
		},
		mounted() {
			let that = this;
			var fontColor = 'rgba(255,255,255,1)';
			let xData = [],yData=[];
			this.chartData.forEach(item=>{
				xData.push(item.name);
				yData.push(item.num);
			})
			
			let option = {
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					show: true,
					x: 'center',
					y: 'top',
					icon: 'stack',
					itemWidth: 15,
					itemHeight: 5,
					textStyle: {
						color: 'rgba(255,255,255,1)',
						fontSize: 10
					},
					nameTextStyle: {
						color: 'rgba(255,255,255,1)'
					},
				},
				grid: {
					left: '2%',
					right: '2%',
					top: '5%',
					bottom: '2%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: xData,
					axisTick: {
						show: false
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.05)',
							type: 'dashed'
						}
					},
					axisLabel: {
						formatter: function (value, index) {
						    return value.split(',')[0];
						},
						color: fontColor,
						fontSize: 12,
						rotate:10,
					},
					splitLine: {
						show: false
					}
				}],
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
					name: '',
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
//							barBorderRadius: [5, 5, 0, 0]
						},
						emphasis: {
							color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0.3,
								color: 'rgba(132,222,255,1)'
							}, {
								offset: 1,
								color: 'rgba(76,208,255,1)'
							}], false),
//							barBorderRadius: [5, 5, 0, 0]
						}
					}
				}]
			};
			var myChart = echarts.init(this.$refs.myEcharts);
			myChart.setOption(option);
			myChart.on('click',(params)=>{
				this.$emit('click',params)
			})
	}
	}
</script>

<style scoped>
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>