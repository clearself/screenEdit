<template>
	<div ref="myEcharts" class="echarts"></div>
</template>

<script>
	export default {
		name: 'brokenLineBar',
		props: ['chartData', 'title', 'type','page'],
		data() {
			return {

			}
		},
		mounted() {
			let colors = ['#00f2f8', '#7453ff', '#0089f1','#ffffff', '#18e066'];
			var fontColor = 'rgba(255,255,255,1)';
			let data = this.chartData
			console.log('结果', data)
			let xData = [];
			let legendData = [];
			let series = [];
            data.forEach((item, index) => {
                    xData.push(item.day.substring(8,10))
               })
			console.log(xData)
			for(let i=0;i<5;i++){
				let names = [];
				let list = [],k = (this.page-1)*5+i;
				data.forEach((item, index) => {
					if(item.data&&item.data[k]){
						list.push(item.data[k].num);
					}
				});	
				if(data[0].data&&data[0].data[k]){
					legendData.push(data[0].data[k].name === null ? '未知'+(i+1) : data[0].data[k].name);
					let obj = {
						name: data[0].data[k].name === null ? '未知'+(i+1) : data[0].data[k].name,
						type: 'line',
						stack: 'hehe',
						smooth: false, //true 为平滑曲线，false为直线
						itemStyle: {
							normal: {
								color: colors[i],
								lineStyle: {
									color: colors[i],
									width: 1
								},
							}
						},
						data: list
					}
				let objBar = {
			        name: data[0].data[k].name === null ? '未知'+(i+1) : data[0].data[k].name,
			        type: 'bar',
			        stack: '趋势',
			        barWidth: 10,
			        barMinHeight:2,
			        itemStyle: {
		           		normal: {
		                	color: colors[i],
		            	}
		           },
			        data: list
				}
				series.push(obj),
				series.push(objBar),
				console.log('series',series)
				}
			}
			let option = {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    grid: {
                        left: '2%',
                        right: '2%',
                        top: '14%',
                        bottom: '5%',
                        containLabel: true
                    },
                    tooltip: {
                        show: true,
//                      trigger: 'item'
                    },
                    legend: {
                        type:'scroll',
                        pageTextStyle:{
                            color:'#fff',
                        },
                        show: true,
                        x: 'center',
                        y: 0,
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
                        data: legendData
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: true,
                        axisLabel: {
                            color: fontColor,
                            fontSize: 10,
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
                        //
                        minInterval: 1,
                        //name: '次数/(次)',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize: 10,
                            padding: [0, 0, -6, 20]
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
                    series: series
                };

			var myChart = echarts.init(this.$refs.myEcharts);
			myChart.setOption(option);
		}
	}
</script>

<style scoped >
	.echarts {
		width: 100%;
		height: 100%;
	}
</style>
