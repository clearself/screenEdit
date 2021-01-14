import echarts from 'echarts/index';
//import geoCoordMap from '@/components/command/coord_map.json';
import 'echarts/map/js/china';

const mapOption = {
    tooltip: {
		show:false,        
    },
    grid: {
        show:false,
        top: '0',
        bottom:'0',
        left: '0',
        right: '0',
        containLabel: true
    },
    geo: {
        show: true,
        map: 'china',
        zoom: 1.25,
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false,
            }
        },
        roam: false,
        itemStyle: {
            areaColor: '#001b30',
            borderColor: '#2f8bca',
            borderWidth: 2, 
			shadowColor: '#2f8bca',
			shadowBlur: 30
        },
        emphasis: {
            itemStyle: {
                areaColor: '#001b3f',
                borderColor: '#2f8bcf',
            }
        }
    },
    series : [
        {
            name: 'cityName',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: function (val) {
                return 10;
            },
            label: {				
                normal: {                    
                    position: 'center',
                    show: true,
                    fontSize:14,
					color: '#fff',
					lineHeight:40,
					//formatter: '{b}',
					formatter: (d)=>{
						return d.data.value[2];
					},
                },
				emphasis: {
					color: '#fff'
				}
            },
            itemStyle: {
                normal: {
                    color: '#4bc2ec'
                }
            },
            data: []
        },
		{
			type: 'map',
			map: 'china',
			geoIndex: 1,
			zoom:1.25,
			aspectScale: 0.75, //长宽比
			showLegendSymbol: false, // 存在legend时显示
			label: {
				normal: {
					show: false,
				},
				emphasis: {
					show: false,
					textStyle: {
						color: '#fff'
					}
				}
			},
			roam: false,
			itemStyle: {
				normal: {
					areaColor: '#001b2f',
					borderColor: '#2f8bca',
					borderWidth:1
				},
				emphasis: {
					areaColor: '#087fc2',
					borderColor: '#64f0fe',
					borderWidth:2
				}
			},			
			data:[
                //{name:'河北', selected:true}
            ]			
		}
    ]
};
/*
const showData = [
	{
		"name": "北京",
		"value": 86

	}, {
		"name": "福建",
		"value": 65
	}, {
		"name": "广东",
		"value": 53
	}, {
		"name": "上海",
		"value": 48
	}
];
*/
const convertDotData = function(data){
	const res = [];
	if(data && data.length >= 1){
		
		data.forEach(item => {
			const newObj = {};
			newObj.name = item.name;
			newObj.value = [item.Lng, item.lat, item.client]
			res.push(newObj);
		})		
	}
	return res;
}
const convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
		// console.log(data[i].name)
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value,data[i].companyCount),
            });
        }
    }
    return res;
};
export default {
	name: 'ChinaMapScatter',
	props: ['showData', 'seletcArea', 'dottInfo'],
	data () {
		return {
			thisChart : ''
		}
	},
	mounted(){
		this.thisChart = echarts.init(this.$el);
		this.drawMap();
	},
	template : `<div id="map-chart" ref="chart" style="width:100%;height:100%;"></div>`,
	watch: {
		showData(){
			this.drawMap();
		},
		seletcArea(){
			this.drawMap();
		}
	},
	methods:{
		drawMap(){
			/*
			const mapShowData =  convertData(this.showData);
			mapOption.series[0].data = mapShowData;
			*/
			const mapShowData =  convertDotData(this.dottInfo);
			mapOption.series[0].data = mapShowData;
			
			mapOption.series[1].data = [{name: this.seletcArea, selected:true}];
			this.thisChart.setOption(mapOption);
			
			this.thisChart.off('click');
			this.thisChart.on('click', (param) => {
				//console.log(param.name, this.showData);
				this.showData.forEach(item => {
					if(item.name == param.name){
						this.$emit('showNow',param.name);
					}/*else{
						console.log('该省没有信息');
					}*/
				})
			})
		}
	}
}
