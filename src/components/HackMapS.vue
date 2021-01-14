<script>
	import md5 from 'js-md5';
	import echarts from 'echarts/index';
	import axios from 'axios';
	import CoordMap from '@/components/maps/coord_map.json';
	import 'echarts/map/js/china';
	import 'echarts/map/js/world';
	import 'echarts/map/js/province/beijing';
	console.log('CoordMap', CoordMap)
	const thisId = 'map-' + md5(Math.random() + '');

	const convertData = function(data) {
		const res = {
			hack: [],
			dot: []
		};
		for(let i = 0; i < data.length; i++) {
				let currentFromCity = {},
				currentToCity = {};
				currentFromCity.name = data[i].from.city;
				currentFromCity.val = data[i].from.val;
				currentFromCity.locations = [data[i].from.longitude,data[i].from.latitude];
				currentToCity.name = data[i].to.city;;
				currentToCity.locations = [data[i].to.longitude,data[i].to.latitude];
			if(JSON.stringify(currentFromCity) != '{}' && JSON.stringify(currentToCity) != '{}') {
				res.dot.push({
					name: currentToCity.name,
					value: currentToCity.locations
				});

				res.hack.push({
					fromName: currentFromCity.name,
					toName: currentToCity.name,
					val: currentFromCity.val,
					coords: [currentFromCity.locations, currentToCity.locations]
				})
			}
		}
		return res;
	}; 
	//let mapOption = ;
//	let myChart = '';
	import {
		getMap_one,
		getMap_two
	} from '../server/api.js'
	export default {
		name: 'ChinaMap',
		inject: ["timeType"],
		props: ['mapType', 'id'],
		data() {
			return {
				isData: true,
				mapOption:null,
				loading:false,
			}
		},
		computed: {
			time_type() {
				return this.timeType();
			}
		},
		watch: {  
			'time_type': function(newVal, oldVal) {
				document.getElementById(this.id).removeAttribute('_echarts_instance_'); // 移除容器上的 _echarts_instance_ 属性
				this.drawMap();  
			} 
		},
		mounted() {
			this.drawMap();
		},
		template: `<div id="echartsId" style="width:100%;height:100%;" v-loading="loading"><div :id=this.id style="width:100%;height:100%;"></div></div>`,
		methods: {
			drawMap() {
					let veness = -0.3;
					this.mapOption = null;
					this.loading = true;
				this.isData = true;
			const Cid = this.id || thisId;
				const mapType = this.mapType || 'china';
				let parama = {};
				if(this.mapType === 'china') {
					parama.type = 0;

				} else {
					parama.type = 1;
				}
				axios.all([getMap_one(parama), getMap_two(parama)]).then(axios.spread((res1, res2) => {
					console.log('21111211', res1);
					console.log('121222222222222', res2);
					this.loading = false;
						this.isData = false;
						const coverData = convertData(res1);
						const coverDataBack = convertData(res2);
						console.log('coverData', coverData)
						this.mapOption = {
							tooltip: {
								trigger: 'item',
								formatter: function(params) {
									console.log('9999999999999999',params)
									if(params.seriesName === '点') {
										return params.data.name;
									} else {
										return params.data.fromName + ' -> ' + params.data.toName + '：' + params.data.val;
									}

								}
							},
							left: 0,
							top:0,
							geo: {
								show: true,
								// center: ['50%',' 50%'],
								map: mapType,
								label: {
									normal: {
										show: false,
										color: '#fff'
									},
									emphasis: {
										show: true,
										color: '#fff'
									}
								},
								roam: true,
								//aspectScale: 0., //设置地图的长宽比
								//zoom: 0.8,
								itemStyle: {
									areaColor: 'rgb(0, 27, 47)',
									borderColor: '#2f8bca',
									borderWidth: 1,
								},
								emphasis: {
									itemStyle: {
										areaColor: 'rgb(0, 39, 69)',
										borderColor: '#2f8bca',
									}
								}
							},
							series: [{
								"name": "lineOne",
								"type": "lines",
								"zlevel": 1,
								"effect": {
									"show": true,
									"period": 5,
									"trailLength": 0.2,
									"color": "#fff",
									"symbolSize": 3
								},
								"lineStyle": {
									//"normal": {
									"color": "#ff6c00",
									"width": 0,

									"curveness": veness
									//}
								},
								"data": coverData.hack.length>0?coverData.hack:[],
							}, {
								"name": "lineTwo",
								"type": "lines",
								"zlevel": 2,
								"symbol": ["none", "none"],
								"symbolSize": 120,
								"effect": {
									"show": true,
									"period": 5, //箭头指向速度，值越小速度越快
		                            "trailLength": 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
		                            "symbol": 'circle', //箭头图标
		                            "symbolSize": 6, //图标大小
//									"period": 4,
//									"trailLength": 0.1,
//									"symbol": "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",
//									"symbolSize":3,
								},
								"lineStyle": {
									"color": "#ff6c00",
									"width": 0.5,
									"opacity": 0.8,
									"curveness": veness
								},
								"data": coverData.hack.length>0?coverData.hack:[],
							}, {
								"name": "点",
								"type": "effectScatter",
								"coordinateSystem": "geo",
								"zlevel": 2,
								"rippleEffect": {
									"brushType": "stroke"
                },
                "symbolSize": 8,
								"label": {
									"show": false,
									"position": "right",
									"formatter": "{b}"
								},
								"itemStyle": {
									"color": "#fff"
								},
								"data": coverData.dot.length>0?coverData.dot:[],
							},
							
							{
								"name": "lineOneBack",
								"type": "lines",
								"zlevel": 1,
								"effect": {
									"show": true,
									"period": 5,
									"trailLength": 0.2,
									"color": "#fff",
									"symbolSize": 3
								},
								"lineStyle": {
									//"normal": {
									"color": "#00fce7",
									"width": 0,

									"curveness": veness
									//}
								},
								"data": coverDataBack.hack.length>0?coverDataBack.hack:[],
							}, {
								"name": "lineTwoBack",
								"type": "lines",
								"zlevel": 2,
								"symbol": ["none", "none"],
								"symbolSize": 120,
								"effect": {
									"show": true,
									"period": 5, //箭头指向速度，值越小速度越快
		                            "trailLength": 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
		                            "symbol": 'circle', //箭头图标
		                            "symbolSize": 6, //图标大小
//									"period": 4,
//									"trailLength": 0.1,
//									"symbol": "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",
//									"symbolSize":3,
								},
								"lineStyle": {
									"color": "#00fce7",
									"width": 0.5,
									"opacity": 0.5,
									"curveness": veness
								},
								"data": coverDataBack.hack.length>0?coverDataBack.hack:[],
							}, {
								"name": "点",
								"type": "effectScatter",
								"coordinateSystem": "geo",
								"zlevel": 2,
								"rippleEffect": {
									"brushType": "stroke"
                },
                "symbolSize": 8,
								"label": {
									"show": false,
									"position": "right",
									"formatter": "{b}"
								},
								"itemStyle": {
									"color": "#fff"
								},
								"data": coverDataBack.dot.length>0?coverDataBack.dot:[],
							}
							
							
							]
						}
						let myChart = echarts.init(document.getElementById(Cid));
						myChart.setOption(this.mapOption);
				})).catch((error) =>{
					this.loading = false;
					console.log(error);
				})
			}
		}
	}
</script>