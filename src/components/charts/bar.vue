<template>
	<div ref="myEcharts" class="echarts"></div>
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
		props: ['chartData', 'title', 'type'],
		data() {
			return {

			}
		},
		mounted() {
			let that = this;
			var fontColor = 'rgba(255,255,255,1)';
			let xData = [],yData=[],y1Data=[];
			this.chartData.forEach(item=>{
				xData.push(item.hostName+','+item.typeId);
				yData.push(item.num);
				y1Data.push(accMul(item.num,1.1));
			})

			let option = {
				tooltip: {
					trigger: 'axis',
				},
				legend: {
					show: true,
          right: '10%',
          top: 'top',
					icon: 'stack',
          data: ['数量','趋势'],
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
					name: '数量',
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
				},{
			        name: '趋势',
			        type: 'line',
			        // smooth: true, //是否平滑曲线显示
			        // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
			        showAllSymbol: true,
			        symbol: 'emptyCircle',
			        symbolSize: 6,
			        lineStyle: {
			            normal: {
			                color: "#28ffb3", // 线条颜色
			            },
			            borderColor: '#f0f'
			        },
			        label: {
			            show: false,
			            position: 'left',
			            textStyle: {
			                color: '#fff',
			            }
			        },
			        itemStyle: {
			            normal: {
			                color: "#28ffb3",
			
			            }
			        },
			        tooltip: {
			            show: false
			        },
			        data: y1Data,
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
