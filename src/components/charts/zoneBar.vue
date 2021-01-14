<template>
	<div ref="myEcharts" class="echarts"></div>
</template>

<script>
	export default {
		name: 'barMut',
		props: ['chartData', 'title', 'type'],
		data() {
			return {

			}
		},
		mounted() {
			let that = this;
			let data = this.chartData;
			console.log(data);
			var fontColor = 'rgba(255,255,255,1)';
			let lendData = ['安全设备','WEB应用','服务器','类别四','其他'];
			let data1 = [],data2 = [],data3 = [],data4 = [],data5 = [],xData = [];
			data.forEach(item=>{
				xData.push(item.name);
				data1.push(item.num1);
				data2.push(item.num2);
				data3.push(item.num3);
				data4.push(item.num4);
				data5.push(item.num5);
			})
			let option = {
				//color: ["#ed9d3c", '#4fd7fd'],
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					type:'scroll',
					pageTextStyle:{
						color:'#fff',
					},
					show: true,
					x: 'right',
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

					selectedMode: false, //取消图例上的点击事件
					data: lendData,

				},
				grid: {
					left: '2%',
					right: '2%',
					top: '15%',
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
				yAxis: [{
					type: 'value',
          minInterval: 1,
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
				}],
				series: [{
						name: lendData[0],
						type: 'bar',
						stack: '排名',
						data: data1,
						barWidth: 8,
						itemStyle: {
							normal: {
								color:'#4fd7fd'
							}
						}
					},
					{
						name: lendData[1],
						type: 'bar',
						stack: '排名',
						data: data2,
						barWidth: 8,
						itemStyle: {
							normal: {
								color:'#1c96e9'
							}
						}
					},
					{
						name: lendData[2],
						type: 'bar',
						stack: '排名',
						data: data3,
						barWidth: 8,
						itemStyle: {
							normal: {
								color:'yellow'
							}
						}
					},
					{
						name: lendData[3],
						type: 'bar',
						stack: '排名',
						data: data4,
						barWidth: 8,
						itemStyle: {
							normal: {
								color:'green'
							}
						}
					},
					{
						name: lendData[4],
						type: 'bar',
						stack: '排名',
						data: data5,
						barWidth: 8,
						itemStyle: {
							normal: {
								color:'red'
							}
						}
					},
					
				]
			};
			var myChart = echarts.init(this.$refs.myEcharts);
			myChart.setOption(option, true);
			myChart.on('click', (params) => {
				this.$emit('click', params)
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
