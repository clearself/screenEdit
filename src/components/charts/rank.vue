<template>
	<div ref="myEcharts" class="echarts"></div>
</template>

<script>
	export default {
		name: 'rank',
		props: ['chartData', 'title', 'type'],
		data() {
			return {

			}
		},
		mounted() {
			let vm = this;
			console.log('aaaaaaaaaaaaaaa',this.chartData)
			let getArrByKey = (data, k) => {
				let key = k || "value";
				let res = [];
				if(data) {
					data.forEach(function(t) {
						console.log('555555555',t)
						if(vm.type==1&&t[key].length>7){
							res.push(t[key].substring(0,7));
						}else{
							res.push(t[key]);
						}
					});
				}
				console.log('444444444444444',res)
				return res;
			};
			let opt = {
				index: 0
			}
			let color = ['#FC619D', '#FF904D', '#48BFE3'];
//			data = data.sort((a, b) => {
//				return b.value - a.value
//			});
			let option = {
				grid: {
					top: '2%',
					bottom: -15,
					right: 30,
					left: 0,
					containLabel: true
				},
				tooltip: {
                        show: true,
                        trigger: 'item'
                    },
				xAxis: {
					show: false
				},
				yAxis: [{
					triggerEvent: true,
					show: true,
					inverse: true,
					data: getArrByKey(this.chartData, 'name'),
					axisLine: {
						show: false
					},
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLabel: {
						interval: 0,
						color: '#fff',
						align: 'right',
						margin: 20,
						fontSize: 13,
						

					},
				},
				{
			        triggerEvent: true,
			        show: true,
			        inverse: true,
			        data: getArrByKey(this.chartData, 'name'),
			        axisLine: {
			            show: false
			        },
			        splitLine: {
			            show: false
			        },
			        axisTick: {
			            show: false
			        },
			        axisLabel: {
			            interval: 0,
			            color: '#fff',
			            align: 'left',
			            margin: 0,
			            fontSize: 13,
			            formatter: function (value, index) {
			                return vm.chartData[index].value+'次'
			            },
			        }
			    }
],
				series: [{
					name: this.type == 1 ? '被攻击客户' : '反制IP',
					type: 'bar',
					yAxisIndex: 0,
					data: this.chartData,
					barWidth: 6,
					itemStyle: {
						color: '#00effe',
						barBorderRadius: 30,
					}
				}]
			};

			var myChart = echarts.init(this.$refs.myEcharts);
			myChart.setOption(option);
		}
	}
</script>

<style scoped>
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>