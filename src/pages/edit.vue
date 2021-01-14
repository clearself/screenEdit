<template>
	<div class="edit">
		<div class="ub ub-ac ub-pj top-tool">
			<el-form ref="currentNode" :model="currentNode" label-width="80px" :inline="true">
			  <el-form-item label="top:">
			    <el-input style="width:60px;" size="mini" v-model="currentNode.top"></el-input>
				<span class="unit">
					px
				</span>
			  </el-form-item>
			  <el-form-item label="left:">
			    <el-input style="width:60px;" size="mini" v-model="currentNode.left"></el-input>
				<span class="unit">
					px
				</span>
			  </el-form-item>
			  <el-form-item label="width:">
			    <el-input style="width:60px;" size="mini" v-model="currentNode.width"></el-input>
				<span class="unit">
					px
				</span>
			  </el-form-item>
			  <el-form-item label="height:">
			    <el-input style="width:60px;" size="mini" v-model="currentNode.height"></el-input>
				<span class="unit">
					px
				</span>
			  </el-form-item>
			 </el-form>
			 <div>
				 <el-button size="mini" type="primary" icon="el-icon-plus" @click="save">保存本地</el-button>
				 <el-button size="mini" type="primary" icon="el-icon-delete" @click="del">删 除</el-button>
				 <el-button size="mini" type="primary"  icon="el-icon-view" @click="preview">预 览</el-button>
			 </div>
		</div>
		<div class="left-tool">
			<leftMenu :list="menuData" @changeBackground="switchBackground"></leftMenu>
		</div>
		<div draggable="false" class="right-tool">
			<div class="set-box" v-if="currentNode.type==='bar'">
				<barSet :chartData="currentNode" @change-data="update_data"></barSet>
			</div>
		</div>
		
		<div class="edit-wrapper":style="{'background-image':'url('+nodes.bgInfo.url+')'}"  >
			<div class="edit-box" id="edit-box" @drop="dropFun($event)" @dragover.prevent>
				<vue-draggable-resizable
					v-for="(item,index) in nodes.list"
						:key="item.id"
				        :w="item.width"
				        :h="item.height"
				        :x="item.left"
				        :y="item.top"
				        :min-width="50"
				        :min-height="50"
				        :parent="true"
				        :grid="[10,10]"
						:z="item.zIndex"
						:prevent-deactivation="item.isPrevent"
						:active="item.isPrevent"
				        class-name="dragging1"
						@activated="onActivated(item,index)"
				        @dragging="onDrag(arguments,item)"
				        @resizing="onResize(arguments,item)"
						
				      >
				        <bar v-if="item.type === 'bar'" :chartData="item" />
				      </vue-draggable-resizable>
			</div>
			
		</div>
		<div class="fixed-box" v-if="previewDiolg">
			
		</div>
	</div>
</template>

<script>
	import leftMenu from '../components/menu.vue';
	export default {
		name: 'edit',
		components:{
			leftMenu
		},
		data() {
			return {
				previewDiolg:false,
				currentIndex:0,
				image:require('../assets/img/BG.jpg'),
				menuData:[
					{
						title:"背景设置",
						isShow:true,
						icon:'iconfont icon-charutupian',
						childs:[
							{
								imageUrl:require('../assets/img/BG.jpg'),
								type:'background'
							},
						]
					},
					{
						title:"图表组件",
						isShow:true,
						icon:'iconfont icon-charutupian',
						childs:[
							{
								imageUrl:require('../assets/img/echart_bgs/bar.png'),
								type:'bar'
							}
						]
					}
				],
				currentNodeIndex:'',
				currentNode:{},
				nodes:{
					bgInfo:{
						url:"",
					},
					list:[],
				},
			}
		},
		mounted(){
			let data = this.$getsessionStorage('data');
			
			console.log('data',data)
			this.nodes = this.$deepCopy(data)
			if(data&&data.list.length>0){
				let currentNode = this.$getsessionStorage('currentNode');
				if(this.nodes.list.some(item=>item.id===currentNode.id)){
					this.currentNodeIndex = this.nodes.list.findIndex(item=>item.id===currentNode.id);
					this.$set(this,'currentNode',this.$deepCopy(currentNode))
					console.log('currentNode',this.currentNode)
					this.currentIndex = currentNode.zIndex;
				}
			}
			
		},
		methods: {
			genID(length){
			   return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
			},
			del(){
				if(this.nodes.list.some((item,index)=>item.id===this.currentNode.id)){
					let currentNodeIndex = this.nodes.list.findIndex((item,index)=>item.id===this.currentNode.id);
					this.nodes.list.splice(currentNodeIndex,1);
					this.currentIndex = 0;
					this.currentNodeIndex = '';
					this.currentNode = {};
					this.$setsessionStorage('data',this.nodes);
				}else{
					this.$message({
						message:'请选中删除的节点',
						type:"warning"
					})
				}
			},
			preview(){
				this.$setsessionStorage('data',this.nodes);
				this.$router.push({
					name:'screen'
				})
			},
			dropFun(e){
				let x = document.getElementById('edit-box').getBoundingClientRect().left;
				let y = document.getElementById('edit-box').getBoundingClientRect().top;
				let _x = e.pageX-x-150;
				let _y = e.pageY-y-100;
				console.log(e)
				console.log(e.dataTransfer.getData('type'))
				this.nodes.list.push({
							id:this.genID(10),	
							backgroundColor:'rgba(0,0,0,0)',
							type:"bar",
							left:_x,
							top:_y,
							width:300,
							height:200,
							isPrevent:false,
							zIndex:this.currentIndex+1,
							apiInfo:{
								api_name:'',
								isApi:false,
								x_field:'',
								y_field:'',
							},
							option: {
								grid: {
									show:true,
									backgroundColor:'#3f3f3f',
									borderColor:'#ccc',
									left: '2%',
									right: '0',
									top: '10%',
									bottom: '0',
									containLabel: true
								},
								xAxis:{
									boundaryGap:true,
									axisTick: {
										show: true,
										alignWithLabel:true,
										// lineStyle:{
										// 	color:'red'
										// }
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
									icon: 'circle',
									itemWidth: 15,
									itemHeight: 5,
									textStyle: {
										color: 'rgba(255,255,255,1)',
										fontSize: 10
									},
								},
							},
							seriesName:'数量',
							data:[
								{
									name:'上海4',
									value:300,
								},{
									name:'北京4',
									value:30,
								},{
									name:'广州4',
									value:90,
								},{
									name:'深圳4',
									value:23,
								},{
									name:'河南4',
									value:200,
								},
							]
						})
			},
			//切换背景图
			switchBackground(imageUrl){
				this.nodes.bgInfo.url = imageUrl;
			},
			save(){
				this.$setsessionStorage('data',this.nodes);
				this.$message({
					message:'本地保存成功',
					type:"success"
				})
			},
			onActivated(item,index){
				console.log(item,index)
				this.nodes.list = this.nodes.list.map(_item=>{
					_item.isPrevent = false;
					return _item;
				})
				this.currentIndex ++;
				console.log('this.currentIndex',this.currentIndex)
				item.zIndex = this.currentIndex;
				this.currentNodeIndex = index;
				item.isPrevent = true;
				this.currentNode = this.$deepCopy(item)
				this.$setsessionStorage('data',this.nodes);
				this.$setsessionStorage('currentNode',item);
			},
			 onResize(obj, item){
				item.left = obj[0]
				item.top = obj[1];
				item.width = obj[2];
				item.height = obj[3];
				this.currentNode.width = item.width;
				this.currentNode.height = item.height;
				this.currentNode.left = item.left;
				this.currentNode.top = item.top;
			},
			onDrag(obj, item){
				console.log('x',obj[0]);
				console.log('y',obj[1]);
				item.left = obj[0];
				item.top = obj[1];
				this.currentNode.left = item.left;
				this.currentNode.top = item.top;
			},
			update_data(data){
				console.log(data)
				this.nodes.list = this.nodes.list.map((item,index)=>{
					if(this.currentNodeIndex===index){
						item = this.$deepCopy(data);
					}
					return item;
				})
				//this.$set(this.nodes.list[this.currentNodeIndex], this.$deepCopy(data));
				// this.nodes.list[this.currentNodeIndex] = this.$deepCopy(data);
				// console.log('this.nodes.list',this.nodes.list[this.currentNodeIndex])
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.edit{
		position: absolute;
		width:100%;
		height:100%;
		left:0;
		top:0;
		overflow: hidden;
		background-color: rgba(17,29,43,1);
	}
	.fixed-box{
		width:100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		z-index: 999999;
		background-color: #fff;
	}
	.top-tool>>>.el-input__inner,.top-tool>>>.el-textarea__inner,.top-tool>>>.el-input__inner{
		background: transparent;
		border: 1px solid #1cd7fa;
		box-shadow: 0px 0px 7px #389bf7 inset;
		color: #fff;
	}
	.top-tool{
		width:1280px;
		height:50px;
		margin: 0 auto;
		background-color:rgba(17,29,43,1);
		transform: translateX(-20px);
	}
	.unit{
		font-szie:12px;
		color:#fff;
		margin-left: 5px;
	}
	.edit-wrapper{
		width:1280px;
		height:720px;
		margin: 0px auto;
		transform: translateX(-20px);
		border:1px solid #1cd7fa;
		position: relative;
		background-color: #666;
		background-repeat: no-repeat;
		background-position:center;
		background-size: cover;
		box-sizing: border-box;
	}
	.edit-box{
		width:100%;
		height:100%;
		position: relative;
		background:linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px, linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px) 0% 0% / 10px 10px;
	}
	.el-form-item{
		margin-bottom: 0;
	}
	.top-tool>>>.el-form-item__label{
		color:#fff;
	}
	.dragging1{
		position: absolute;
	}
	.left-tool{
		width:280px;
		position: absolute;
		left:0;
		top:0;
		bottom:0;
		overflow-x: hidden;
		overflow-y: auto;
		z-index: 9999;
		background-color: #010205;
	}
	.left-tool::after {
	    content: "";
	    position: absolute;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    opacity: 0.4;
	    background-image: url("../assets/img/leftBg.png");
	    background-position: 0 0;
	    background-repeat: no-repeat;
	    background-size: 100% 100%;
	    z-index: -1;
	}
	.right-tool{
		width:320px;
		position: absolute;
		right:0;
		top:0;
		bottom:0;
		overflow: hidden;
		z-index: 999;
		// pointer-events: none;
	}
	.set-box{
		width:100%;
		height:100%;
	}
</style>