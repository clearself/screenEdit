import echarts from 'echarts/index';

const option = {
    color: ['#6373e7'],
	title: {
        show:false
    },
    tooltip: {
		show: false,
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        },
        textStyle: {
            align: 'left'            
        },
        extraCssText: 'padding:10px',
        formatter(parms){
			const show = parms[0];
			return `<span style="font-size:16px">${show.name}</span><br />${show.marker}${show.seriesName}：${show.value}`;
		},
    },
    grid: [{
        left: '0%',
        right: '0%',
        top: 0,
		bottom:0,
        containLabel: true
    }],
	legend: {
		show: false,
    },
    xAxis: {
        show: true,
        type: 'value',
        splitLine:{ 				//网格线
            show: true,
            lineStyle:{
                color: 'rgba(124,124,124,0.5)',
                width: 1,
                type: 'dotted',
                opacity: 0.5
            }
        },
         axisLabel:{
			interval:0,
			rotate:40,
            textStyle:{
                color:'#9f9f9f'
            }
        }
    },
    yAxis: {
        type: 'category',
        data: [/*
            '192.168.0.1',
            '197.102.0.11', 
            '168.143.129.11', 
            '192.168.0.2', 
            '194.187.1.1', 
            '139.129.12.3',
            '198.199.120.1',
            '192.19.12.110',
            '103.104.125.198',
            '其他'*/
        ],
        boundaryGap: ['0%', '80%'],
        axisLabel: {
            interval: 0,
            rotate: 0,
            textStyle:{
                color:'#9f9f9f'
            }
        }
    },
    series: [
        {
            name: '攻击量',
            type: 'bar',
            barWidth: 8,
            data: [/*7852, 6421, 6521, 4456, 3521, 2890, 2684, 998, 205, 9187*/],
            itemStyle: {
                emphasis: {
                    //barBorderRadius: 7.5
                },
                normal: {
                    //barBorderRadius: 7.5
                },
            },
            label: {
                show: false,
                position: 'right',
                formatter: '{c} 个',
                lineHeight: '10',
                fontSize:24
            }
        }
    ]
};
const converData = function (data) {
    const res = {
        yAxis: [],
        seriesData: []
    };
    for (let i = 0; i < data.length; i++) {
        res.yAxis.push(data[i].name);
        res.seriesData.push(data[i].value);
    }
    return res;
}
export default {
    name: 'BarChartY',
    props: ['showData', 'title'],
    data() {
        return {
            thisChart: ''
        }
    },
    watch: {
        showData: {
            handler(newVal, oldVal) {
                this.drawMap();
            },
            deep: false
        }
    },
    mounted() {
        this.thisChart = echarts.init(this.$el);
        this.drawMap();
    },
    template: `<div style="width:100%;height:100%;"></div>`,
    methods: {
        drawMap() {
			const chartData = converData(this.showData);
			option.yAxis.data = chartData.yAxis;
            option.series[0].data = chartData.seriesData;
            /*this.thisChart.showLoading({
                text: '数据加载中...',
                color: '#8a8e91',
                textColor: '#8a8e91',
                maskColor: 'rgba(255, 255, 255, 0.8)',
                }
            );
            */
            this.thisChart.setOption(option);
        }
    }
}
