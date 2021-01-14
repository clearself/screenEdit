import echarts from 'echarts/index';
import geoCoordMap from './coord_map.json';
import axios from 'axios';
import 'echarts/map/js/china';

const defaultMark = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAABECAYAAACbO/V0AAADCUlEQVRYhbWYvYsUQRDFfz3b5+GBgYgiosFpoGiggUYGBkaCf4CB4F9gZHiBiIGRiaGBiZlmmhiZCCZyGGlwiSj4hQh+IKe7210G0ytzu2+53mJsWG7Zm3mvq+rV65oJduc8C6zQ+W41N8Q5vzfADmA3sB/YA6wAu8r/fgE/gW/AJ+AL8EeRxs7fFeAAcBDYB1wETgJfgQ/AO2CjgJ8AjgCrwF7gJfCkXPcG+Aj8BiwCF4Al4ChwrJCtAu+B78CZbbKwXnZ+pdxDIXkBjCKwCZwC3gKfy4U/gHPAQ+ARsEyb/0kKlkuqJjU5DRwCMvAUeF029ixiNgSeE8Llks8bwF1gJ3B1zq6tfCYEibYej2lrdwmze8BmBDNgiNl9QnMNOAycBcbbpGZ6BeAmcBzLt2hrRezAjCDfZqlZK5FM73haokFcs84or9GmnZYgWFdaQ8bpOnHwasHdt2ucHkzT6j4wq2qimhU1mBNfYE2KvHWNSV6GWQIT222cEWRpFXkWzRpnBLNYOoLgLLLAilgWFzpzJLAiUjJZsNZRzBJkkY7gVJHAmkPgrIEkUH0QrMc+UBGo32qWjkD6gjMCLVMRQfDKVKVIWYVXRSqCIDTvtQqBFUkiRSH7CASWLrJKW91SKVJ9kBc98Mt9SqZJEJjTi7RV/G8VKavIysNrloxAqIjgjECrSO3WaxWiDyyJCJyNJrDmnAfORqt2U+vTTZVVNMmnImkVanTMzhNNjo5ZdG1qfFYhsPTghTcCfR6IFDW+Gggs3clemcojU44tXoLa8X3xB8BCUNsHIfTYB2okNvNFILAi4x7tWmDpGni9SNZAydQ7F8kDRzaaU6ay0ZI69J1ThcDSKcrBa3aVnaxmpaolO7nHCKQXqRpEp13LGigV0addywdxp4rkg7gqqPv5QE7XogaDPvtAqSh5J7vasSXJebWCQKVIObM5H2MFln4AGfTYB2bN7EbMNzoqrBiSGN+DL0UKa8t0bYNB+eI70QKCoFv4kP7huiJQgozWeRfceSvsI5h5nQ1/AR4W1O01bb2vAAAAAElFTkSuQmCC';

const [max, min, maxSize4Pin, minSize4Pin] = [5000, 0, 100, 20];

const convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};

const mapOption = {
    tooltip: {
        trigger: 'item',
        formatter: function (params) {
            if(typeof(params.value[2]) == "undefined"){
                if(!isNaN( params.value)){
                    return params.name + ' : ' + params.value;
                }else{
                    return params.name;
                }
            }else{
                return params.name + ' : ' + params.value[2];
            }
        }
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
            borderWidth: 1,
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
                return 3;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'center',
                    show: true,
                    fontSize:12,
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgb(5, 255, 255)'
                }
            },
            data: []
        },
        {
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: function(){
                return defaultMark;
            },
            symbolSize: function (val) {
                var a = (maxSize4Pin - minSize4Pin) / (max - min);
                var b = minSize4Pin - a*min;
                b = maxSize4Pin - a*max;
                return [20,a*val[2]+b];
            },
            symbolOffset:[10, -20],
            label: {
                normal: {
                    formatter: function (val) {
                        return val.data.value[2];
                    },
                    position: 'top',
                    show: true,
                    textStyle: {
                        color: '#fff',
                        fontSize: 10,
                    }
                }
            },
            zlevel: 6,
            data: []
        }
    ]
};

export default {
  name: 'ChinaMapScatter',
  props: ['dataUrl','symbol'],
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
        dataUrl : {
            handler(newVal,oldVal) {
            //Charts.clear();
            //Charts.dispose();
            this.drawMap();            
        },
        deep: false
        }
  },
  methods:{
	drawMap(){
        axios.get(this.dataUrl).then( res => {
            mapOption.series[0].data = convertData(res.data);
            mapOption.series[1].data = convertData(res.data);

            if(this.symbol && typeof this.symbol == 'function'){
                mapOption.series[1].symbol = this.symbol;
            }
            
            this.thisChart.setOption(mapOption);
        })        
	}
  }
}
