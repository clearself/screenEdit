<template>
	<div style="width:100%;height:100%;" class="set-wrapper">
		<el-tabs type="border-card" style="height:100%;overflow-y: auto;">
			<el-tab-pane label="数据">
				<div class="set-title">数据源配置</div>
				<el-form label-width="80px" :model="chartDataResponse">
					<el-form-item label="API接口:">
						<el-input size="mini" placeholder="请输入" v-model="chartDataResponse.apiInfo.api_name"></el-input>
					</el-form-item>
					<el-form-item label="X轴字段:">
						<el-input size="mini" placeholder="请输入" v-model="chartDataResponse.apiInfo.x_field"></el-input>
					</el-form-item>
					<el-form-item label="Y轴字段:">
						<el-input size="mini" placeholder="请输入" v-model="chartDataResponse.apiInfo.y_field"></el-input>
					</el-form-item>
					<el-form-item label="是否启用:">
						<el-switch @change="startApi(chartDataResponse.apiInfo)" v-model="chartDataResponse.apiInfo.isApi" active-color="#13ce66"
						 inactive-color="#ff4949" active-text="是" inactive-text="否">
						</el-switch>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div class="ub w100 ub-pj ">
					<div class="set-title">静态数据置</div>
					<div>
						<el-button size="mini" type="text" icon="el-icon-plus" @click="add_data">添加数据</el-button>
					</div>
				</div>
				<el-table class="table-box" :data="chartDataResponse.data" border>
					<el-table-column align="center" prop="name" label="X轴">
						<template slot-scope="scope" class="filed-box">
							<el-input size="mini" v-model="scope.row.name"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="center" label="Y轴">
						<template slot-scope="scope">
							<el-input size="mini" v-model="scope.row.value"></el-input>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作" width="48">
						<template slot-scope="scope">
							<el-button size="mini" type="text" icon="el-icon-delete" @click="delete_data(scope.$index)"></el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="ub ub-ac ub-pc btn">
					<el-button size="mini" @click="user_data">使用数据</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane label="高级参数">
				<div class="set-title">背景颜色设置</div>
				<el-form label-width="80px" :model="chartDataResponse" class="table-box">
					<el-form-item label="背景颜色:">
						<el-color-picker style="vertical-align: middle;" v-model="chartDataResponse.backgroundColor" size="mini" show-alpha></el-color-picker>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div class="set-title">图例设置</div>
				<el-form label-width="80px" :model="chartDataResponse" class="table-box">
					<el-form-item label="是否显示:">
						<el-switch v-model="chartDataResponse.option.legend.show" active-color="#13ce66"
						 inactive-color="#ff4949" active-text="显示" inactive-text="不显示">
						</el-switch>
					</el-form-item>
					<el-form-item label="图例名称:">
						<el-input size="mini" placeholder="请输入" v-model="chartDataResponse.seriesName"></el-input>
					</el-form-item>
					<el-form-item label="位置:" label-width="80px" class="location">
						<div>
							<span>top：</span><el-input style="width:40px;" size="mini" v-model="chartDataResponse.option.legend.top"></el-input>
						</div>
						<div>
							<span>left：</span><el-input style="width:40px;" size="mini" v-model="chartDataResponse.option.legend.left"></el-input>
						</div>
						<div>
							<span>right：</span><el-input style="width:40px;" size="mini" v-model="chartDataResponse.option.legend.right"></el-input>
						</div>
						<div>
							<span>bottom：</span><el-input style="width:40px;" size="mini" v-model="chartDataResponse.option.legend.bottom"></el-input>
						</div>
					</el-form-item>
					<el-form-item label="标记宽高:" class="location">
						<div>
							<span>宽：</span><el-input style="width:40px;" size="mini" v-model.number="chartDataResponse.option.legend.itemWidth"></el-input>
						</div>
						<div>
							<span>高：</span><el-input style="width:40px;" size="mini" v-model.number="chartDataResponse.option.legend.itemHeight"></el-input>
						</div>
					</el-form-item>
					<el-form-item label="icon:">
						<el-select size="mini" v-model="chartDataResponse.option.legend.icon" placeholder="请选择">
						    <el-option
						      v-for="item in icons"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					</el-form-item>
					<el-form-item label="文本设置:" class="location">
						<div style="vertical-align: middle;">
							<span>颜色：</span><el-color-picker style="vertical-align: middle;" v-model="chartDataResponse.option.legend.textStyle.color" size="mini"></el-color-picker>
						</div>
						<div style="vertical-align: middle;">
							<span>大小：</span><el-input style="width:40px;vertical-align: middle;" size="mini" v-model.number="chartDataResponse.option.legend.textStyle.fontSize"></el-input>
						</div>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div class="set-title">坐标系设置</div>
				<el-form label-width="80px" :model="chartDataResponse" class="table-box">
					<el-form-item label="是否显示:">
						<el-switch v-model="chartDataResponse.option.grid.show" active-color="#13ce66"
						 inactive-color="#ff4949" active-text="显示" inactive-text="不显示">
						</el-switch>
					</el-form-item>
					<el-form-item label="位置:" label-width="80px" class="location">
						<div>
							<span>top：</span><el-input style="width:40px;" size="mini" v-model="chartDataResponse.option.grid.top"></el-input>
						</div>
						<div>
							<span>left：</span><el-input style="width:40px;" size="mini" v-model="chartDataResponse.option.grid.left"></el-input>
						</div>
						<div>
							<span>right：</span><el-input style="width:40px;" size="mini" v-model="chartDataResponse.option.grid.right"></el-input>
						</div>
						<div>
							<span>bottom：</span><el-input style="width:40px;" size="mini" v-model="chartDataResponse.option.grid.bottom"></el-input>
						</div>
					</el-form-item>
					<el-form-item label="颜色设置:" class="location">
						<div style="vertical-align: middle;">
							<span>背景颜色：</span><el-color-picker style="vertical-align: middle;" v-model="chartDataResponse.option.grid.backgroundColor" size="mini" show-alpha></el-color-picker>
						</div>
						<div style="vertical-align: middle;">
							<span>边框颜色：</span><el-color-picker style="vertical-align: middle;" v-model="chartDataResponse.option.grid.borderColor" size="mini" show-alpha></el-color-picker>
						</div>
					</el-form-item>
				</el-form>
				<el-divider></el-divider>
				<div class="set-title">X轴设置</div>
				<el-form label-width="80px" :model="chartDataResponse" class="table-box">
					<el-form-item label="坐标刻度:">
						<el-switch v-model="chartDataResponse.option.xAxis.axisTick.show" active-color="#13ce66"
						 inactive-color="#ff4949" active-text="显示" inactive-text="不显示">
						</el-switch>
					</el-form-item>
				</el-form>
				<div class="ub ub-ac ub-pc btn">
					<el-button size="mini" @click="user_data">使用数据</el-button>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		name: 'barSet',
		props: {
			chartData: {
				type: Object,
				default () {
					return {
						backgroundColor:'rgba(0,0,0,0)',
						type: "bar",
						left: 0,
						top: 0,
						width: 300,
						height: 200,
						apiInfo: {
							api_name: '',
							isApi: false,
							x_field: '',
							y_field: '',
						},
						option: {
							grid: {
								show:true,
								backgroundColor:'#000',
								borderColor:'#ccc',
								left: '2%',
								right: '0',
								top: '5%',
								bottom: '2%',
								containLabel: true
							},
							xAxis:{
								axisTick: {
									show: true
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
									color: '#fff',
									fontSize: 12,
									rotate:10,
								},
								splitLine: {
									show: false
								}
							},
							legend: {
								show: true,
								right: 'center',
								top: 'top',
								left:'auto',
								bottom:'auto',
								icon: 'stack',
								itemWidth: 15,
								itemHeight: 5,
								textStyle: {
									color: '#fff',
									fontSize: 10
								},
							},
						},
						seriesName:'',
						data: [{
							name: '上海4',
							value: 300,
						}, {
							name: '北京4',
							value: 30,
						}, {
							name: '广州4',
							value: 90,
						}, {
							name: '深圳4',
							value: 23,
						}, {
							name: '河南4',
							value: 200,
						}, ]
					}
				}
			}
		},
		computed: {
			chartDataResponse() {
				return this.chartData;
			},
		},
		data() {
			return {
				icons:[
					{
						label:'circle',
						value:'circle'
					},{
						label:'rect',
						value:'rect'
					},{
						label:'roundRect',
						value:'roundRect'
					},{
						label:'triangle',
						value:'triangle'
					},{
						label:'diamond',
						value:'diamond'
					},{
						label:'pin',
						value:'pin'
					},{
						label:'none',
						value:'none'
					},
					
				]
			}
		},
		mounted() {

		},
		methods: {
			startApi(obj) {
				if (obj.isApi) {
					if (obj.api_name == '') {
						this.$message({
							message: 'API接口不能为空',
							type: 'warning'
						});
						obj.isApi = false;
						return;
					} else if (obj.x_field == '') {
						this.$message({
							message: 'X轴字段不能为空',
							type: 'warning'
						});
						obj.isApi = false;
						return;
					} else if (obj.y_field == '') {
						this.$message({
							message: 'Y轴字段不能为空',
							type: 'warning'
						});
						obj.isApi = false;
						return;
					}
				}
			},
			add_data() {
				this.chartData.data.push({
					name: '',
					value: ''
				})
			},
			delete_data(index) {
				this.chartData.data.splice(index, 1);
			},
			user_data() {
				this.$emit('change-data', this.chartDataResponse);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.set-title {
		line-height: 16px;
		text-indent: 6px;
		font-size: 14px;
		color: #333;
		font-weight: 600;
		margin: 10px 0;
		border-left: 2px solid #333;
	}

	.set-wrapper>>>.el-form-item__label {
		font-size: 12px;
	}

	.el-form-item {
		margin-bottom: 0px;
	}

	.set-wrapper>>>.el-table td,
	.set-wrapper>>>.el-table th {
		padding: 4px 0;
	}

	.set-wrapper>>>.el-table {
		font-size: 12px;
	}

	.set-wrapper .table-box>>>.el-input__inner {
		padding: 0 0 0 2px;
	}

	.set-wrapper .table-box>>>.el-input--mini .el-input__inner {
		height: 22px;
		line-height: 22px;
	}

	.btn {
		width: 100%;
		margin-top: 50px;
	}
	.location div{
			display: inline-block;
			vertical-align: middle;
			margin: 0 3px;
			span{
				font-size:12px;
			}
		}
	.set-wrapper>>>.el-tabs--border-card>.el-tabs__content{
		padding:5px;
	}
</style>
<style>

</style>
