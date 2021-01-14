<template>
	<div ref="myEcharts" class="echarts"></div>
</template>

<script>
	export default {
		name: 'brokenLine',
		props: ['chartData', 'title', 'type'],
		data() {
			return {

			}
		},
		mounted() {

			var fontColor = 'rgba(255,255,255,0.5)';
			let data = this.chartData
			let xData = [];
			let yData = [];
			data.forEach(item=>{
				xData.push(item.day);
				yData.push(item.num);
			});
			let option = {
				backgroundColor: '#rgb(3, 19, 52);',
				grid: {
					left: '2%',
					right: '3%',
					top: '5%',
					bottom: '10%',
					containLabel: true
				},
				tooltip: {
					show: true,
					trigger: 'item'
				},
				legend: {
					show: true,
					x: 'center',
					y: 'bottom',
					icon: 'stack',
					itemWidth: 15,
					itemHeight: 5,
					textStyle: {
						color: 'rgba(255,255,255,1)',
						fontSize: 15
					},
					nameTextStyle: {
						color: 'rgba(255,255,255,1)'
					},
//					data: [data[0].name]
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					axisLabel: {
						color: fontColor,
						fontSize: 10
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: 'rgba(255,255,255,0.1)',
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: 'rgba(255,255,255,0.05)',
						}
					},
					data: xData
				}],
				yAxis: [{
					type: 'value',
//					name: '次数/(次)',
					nameTextStyle: {
						color: '#fff',
						fontSize: 12
					},
					axisLabel: {
						formatter: '{value}',
						textStyle: {
							color: fontColor,
							fontSize: 10
						}
					},
					axisLine: {
						lineStyle: {
							color: 'rgba(255,255,255,0.1)',
						}
					},
					axisTick: {
						show: false,
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: 'rgba(255,255,255,0.05)',
						}
					}
				}],
				series: [{
//						name: data[0].name,
						type: 'line',
						smooth: true, //true 为平滑曲线，false为直线
						// smooth:true,  //这个是把线变成曲线
						itemStyle: {
							normal: {
								color: '#0092f6',
								lineStyle: {
									color: "#0092f6",
									width: 1
								},
								areaStyle: {
									color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
										offset: 0,
										color: 'rgba(0,255,255,0)'
									}, {
										offset: 1,
										color: 'rgba(0,255,255,1)'
									}]),
								}
							}
						},
						data: yData
					},
				]
			};
			var myChart = echarts.init(this.$refs.myEcharts);
			myChart.setOption(option);
		}
	}
</script>

<style scoped lang="scss">
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>