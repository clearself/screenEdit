<template>
	<div ref="myEcharts" class="echarts"></div>
</template>

<script>
	export default {
		name: 'pie',
		props: ['chartData', 'title', 'type'],
		data() {
			return {

			}
		},
		mounted() {
			let that = this;
			let data = this.chartData;
			let colors = null;
			if(this.type==1){
				colors = ['#134dff', '#c987ff', '#13c7ff', '#10f6ff', '#fff'];
			}else if(this.type==2){
				colors = ['#83ffff', '#00c6ff', '#fffd83', '#ff8200', '#ff0000'];
			}
			let option = {
				color: colors,
				grid: {
					left: '2%',
					right: '2%',
					top: '0',
//					bottom: '10%',
					containLabel: true
				},
				legend: { //图例组件，颜色和名字
					type:'scroll',
					pageTextStyle:{
						color:'#fff',
					},
					show: true,
					x: 'center',
					y: 'bottom',
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
				series: [{
					name: '',
					type: 'pie',
					legendHoverLink:false,
					clockwise: true, //饼图的扇区是否是顺时针排布
					minAngle: 2, //最小的扇区角度（0 ~ 360）
					center: ['50%', '40%'], //饼图的中心（圆心）坐标
					radius: [80, 100], //饼图的半径
					avoidLabelOverlap: false,
					// itemStyle: { //图形样式
					// 	normal: {
					// 		borderColor: '#ffffff',
					// 		borderWidth: 3,
					// 	},
					// },
					label: {
						normal: {
							show: false,
							position: 'center',
							formatter: '{c}条\n{text|{b}}',
							rich: {
								text: {
									color: "#fff",
									fontSize: 20,
									align: 'center',
									verticalAlign: 'middle',
									padding: 5
								},
								value: {
									color: "#fff",
									fontSize: 14,
									align: 'center',
									verticalAlign: 'middle',
								},
							}
						},
						emphasis: {
							show: true,
							textStyle: {
								fontSize: '26',
							}
						}
					},
					data: data
				}]
			};

			var myChart = echarts.init(this.$refs.myEcharts);
			myChart.setOption(option);

			setTimeout(function() {
				myChart.dispatchAction({
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: 0
				});

				myChart.on('mouseover', function(params) {
					// console.log(params)
					if(params.name == that.chartData[0].name) {
						myChart.dispatchAction({
							type: 'highlight',
							seriesIndex: 0,
							dataIndex: 0
						});
					} else {
						myChart.dispatchAction({
							type: 'downplay',
							seriesIndex: 0,
							dataIndex: 0
						});
					}
				});

				myChart.on('mouseout', function(params) {
					myChart.dispatchAction({
						type: 'highlight',
						seriesIndex: 0,
						dataIndex: 0
					});
				});
			}, 1000);

		}
	}
</script>

<style scoped lang="scss">
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>
