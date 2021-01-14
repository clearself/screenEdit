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
			let colors = ['#feffff', '#00fff5', '#0abdff', '#8efeff', '#5eebff', 'red'],
				series = [];
				
			let colors1 = ['#fd0000', '#fc7601', '#fefa75', '#00b4fe', '#78fdfe', 'red'];
			//['#feffff', '00fff5', '5eebff', '8efeff', '0abdff', 'red']
			var fontColor = 'rgba(255,255,255,1)';
			let lendData = [],
				xData = [];
			data.forEach((item, index) => {
				xData.push(item.name+','+item.id);
			});
			if(this.type == 1) {
				console.log('333333333333333333333333',this.chartData)
				data[0].typeNum.forEach((item, index) => {
					lendData.push(item.name);
					let list = [];
					data.forEach((_item, _index) => {
						list.push(_item.typeNum[index].num);
					});
					let obj = {
						name: item.name,
						type: 'bar',
						stack: '排名',
						data: list,
						barMinHeight: 2,
						barWidth: 8,
						itemStyle: {
							normal: {
								color: colors[index]
							}
						}
					}
					series.push(obj)
				})

			} else if(this.type == 2) {
				console.log('555555555555555555555', data);
				data[0].typeNum.forEach((item, index) => {
					lendData.push(item.levelName);
					let list = [];
					data.forEach((_item, _index) => {
						list.push(_item.typeNum[index].num);
					});
					let obj = {
						name: item.levelName,
						type: 'bar',
						stack: '排名',
						data: list,
						barMinHeight: 2,
						barWidth: 8,
						itemStyle: {
							normal: {
								color: colors1[index]
							}
						}
					}
					series.push(obj)
				})
			}
			let option = {
				//color: ["#ed9d3c", '#4fd7fd'],
				tooltip: {
					trigger: 'axis',
					formatter (params) {
			          console.log(params)
			          let htmlStr = '';
			          htmlStr ='<div>';
			           htmlStr +='<div>'+params[0].name.split(',')[0] + '</div>';
			          params.forEach(item=>{
			          	let color = item.color;
			          	htmlStr +='<div style="text-align:left;">';
				          //实现了一个点的效果
				          htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;background-color:'+color+';"></span>';
				          htmlStr += item.seriesName + ':';
				          //这里可以自定义文本内容
				          htmlStr += `<span style="color:${color};">${item.value}</span>`
				          htmlStr += '</div>';
				       })
			          htmlStr += '</div>';
			          return htmlStr;
			         },
				},
				legend: {
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
						formatter: function(value, index) {
							return value.split(',')[0];
						},
						color: fontColor,
						fontSize: 12,
						rotate: 10,
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
				series: series
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