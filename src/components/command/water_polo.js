import echarts from 'echarts/index';
import 'echarts-liquidfill'

const option = {
    title: {
        text: '',
        textStyle: {
            fontWeight: 'normal',
            fontSize: 25,
            color: 'rgb(97, 142, 205)'
        }
    },
    series: [{
            type: 'liquidFill',
            radius: '90%',
            center: ['50%', '50%'],
            data: [0, 0, 0], // data个数代表波浪数
            backgroundStyle: {
                borderWidth: 0,
                color: 'rgba(0, 30, 53, 1)',
				//backgroundImage: "radial-gradient(rgba(0,0,0,0), green, blue)",
                //color: '#00fdff'
            },
			outline: {
                show: false,
            },
            label: {
                normal: {
					//formatter: (0.66 * 100).toFixed(2) + '%',
					formatter: (parms)=>{
						return (parms.data * 100).toFixed(1) + '%';						
					},
                    textStyle: {
                        fontSize: 20,
						color:'#fff'
                    }
                }
            },
			color: [{
				 type: 'linear',
				 x: 0,
				 y: 0,
				 x2: 0,
				 y2: 1,
				 colorStops: [{
					 offset: 1,
					 color: 'rgba(58, 71, 212, 0)'
				 }, {
					 offset: 0.5,
					 color: 'rgba(31, 222, 225, .2)'
				 }, {
					 offset: 0,
					 color: 'rgba(31, 222, 225, .2)'
				 }],
				 globalCoord: false
			},
			{
				 type: 'linear',
				 x: 0,
				 y: 0,
				 x2: 0,
				 y2: 1,
				 colorStops: [{
					 offset: 1,
					 color: 'rgba(58, 71, 212, 0)'
				 }, {
					 offset: 0.5,
					 color: 'rgba(31, 222, 225, .2)'
				 }, {
					 offset: 0,
					 color: 'rgba(31, 222, 225, .2)'
				 }],
				 globalCoord: false
			},
			{
				 type: 'linear',
				 x: 0,
				 y: 0,
				 x2: 0,
				 y2: 1,
				 colorStops: [{
					 offset: 1,
					 color: 'rgba(58, 71, 212, 0)'
				 }, {
					 offset: 0.5,
					 color: 'rgba(31, 222, 225, .2)'
				 }, {
					 offset: 0,
					 color: 'rgba(31, 222, 225, .2)'
				 }],
				 globalCoord: false
			},			
			]
        },
        {
            "type": "pie",
            "center": ["50%", "50%"],
            "radius": ["98%", "100%"],
            "hoverAnimation": false,
            "data": [{
                    "name": "",
                    "value": 600,
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                        color: '#00fdff'
                    },
                    emphasis: {
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            color: '#00fdff'
                        },
                    }
                },
                { //画中间的图标
                    "name": "",
                    "value": 4,
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                        color: '#ffffff',
                        "normal": {
                            "color": "#00fdff",
                            "borderColor": "#00fdff",
                            "borderWidth": 10,
                            // borderRadius: '100%'
                        },
                    },
                    label: {

                        borderRadius: '100%'
                    },
                    emphasis: {
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            color: '#00fdff'
                        },
                    }

                },
                { // 解决圆点过大后续部分显示明显的问题
                    "name": "",
                    "value": 4.5,
                    labelLine: {
                        show: false
                    },
                    itemStyle: {
                        color: '#00fdff'
                    },
                    emphasis: {
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            color: '#00fdff'
                        },
                    }
                },
                { //画剩余的刻度圆环
                    "name": "",
                    "value": 88,
                    itemStyle: {
                        color: '#050038'
                    },
                    "label": {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    emphasis: {
                        labelLine: {
                            show: false
                        },
                        itemStyle: {
                            color: '#050038'
                        },
                    }
                }
            ]
        }

    ]
};

export default {
    name: 'waterPolo',
    props: ['showValue'],
    data() {
        return {
            thisChart : ''
        }
    },
    mounted(){
        this.thisChart = echarts.init(this.$el);
        this.drawMap();
    },
    template: `<div style="width:100%;height:100%;"></div>`,
    watch: {      
        showValue(){
			this.drawMap();
		}
    },
    methods:{    
        drawMap(){			
			option.series[0].data=[this.showValue, this.showValue, this.showValue];
            this.thisChart.setOption(option);
            
        }
    }
}