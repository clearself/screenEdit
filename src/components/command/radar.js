import echarts from 'echarts/index';

const option = {
	color: ['#5793f3', '#d14a61'],
	tooltip: {
		show:false,
		textStyle: {
			lineHeight: 40,
			color: '#fff',
			fontSize: 14
		}
	},
	/*
	grid: {
        left: 0,
        right: 0,
        top: 0,
		bottom: 0,
        containLabel: true
    },*/
	legend: {
		show: false,
		orient: 'horizontal',
		//data: [],
		//selectedMode:false,
		textStyle: {
			color: '#fff',
			fontSize: 24,
			fontFamily: 'Microsoft YaHei',
			padding: [0, 20]
		},
		width: '85%'
	},
	radar: {
		// shape: 'circle',
		name: {
			textStyle: {
				color: '#fff',
				fontSize: 14
				/*backgroundColor: '#999',
				borderRadius: 3,
				padding: [3, 5]*/
			}
		},
		roam: true,
		indicator: [/*{
				name: '一般',
				max: 1000
			}, {
				name: '警告',
				max: 1000
			}, {
				name: '重要',
				max: 1000
			}, {
				name: '严重',
				max: 1000
			}, {
				name: '瘫痪',
				max: 1000
			}, {
				name: '其他',
				max: 1000
			}*/
		],
		splitArea: {
			show: true,
			areaStyle: {
				color: 'rgba(33, 211, 255, 0.08)', // 图表背景网格的颜色
				shadowColor: '#fff',
				shadowBlur: 30,
				shadowOffsetX: 0,
				shadowOffsetY: 0,
				opacity: 1
			},
			
		},
		splitLine: {
			show: true,
			lineStyle: {
				width: 1,
				color: 'rgba(33, 211, 255, 0.5)', // 图表背景网格线的颜色
			}
		},
		center: ['50%', '51%'],
		

	},
	series: [
		{
			//areaStyle: {normal: {}},
			type: 'radar',
			itemStyle: {
                color: 'rgba(0, 252, 255 , 1)' ,
			    borderWidth: 5,
            },
            lineStyle: {
				color: 'rgba(110, 237, 255 , 1)' 
            },
            areaStyle: {
				color: 'rgba(33, 237, 255, .2)',              
            },
			data: [
				/*
				{
					value: [1,2,3,4,5,6,7,8,9,5]
				}
				*/
			]
		}
	]
};

const coverData = function (data) {	
	const res = {
		indicator: [],
		data: []		
	}
	if(data.length > 0){
		data.forEach(item => {
			res.indicator.push({
				name: item.name,
				max: 9999
			});
			res.data.push(item.value);
		});
	}else{
		return res;
	}
	
	const max = res.data.reduce((a, b) => {
		return b > a ? b : a;
	});
	
	for(let i = 0; i < res.indicator.length; i++){
		res.indicator[i].max = max;
	}
	
	return res;
}

export default {
	name: 'Radar',
	props: ['showData', 'attackType'],
	data() {
		return {
			thisChart: ''
		}
	},
	mounted() {
		this.thisChart = echarts.init(this.$el);
		this.drawMap();
	},
	watch: {
		/*dataUrl: {
			handler(newVal, oldVal) {
				this.drawMap();
			},
			deep: false
		}*/
		showData(){
			this.drawMap();
		}
		
	},
	template: `<div style="width:100%;height:100%;"></div>`,
	methods: {
		drawMap() {
			const charData = coverData(this.showData);
			option.radar.indicator = charData.indicator;
			
			option.series[0].data = [];
			if(charData.data.length > 0){
				option.series[0].data.push({value: charData.data});
			}
			this.thisChart.setOption(option);
			
		}
	}
}
