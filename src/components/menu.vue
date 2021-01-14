<template>
	<div class="menu w100" id="menus">
		<div class="menu-list w100">
			<div class="menu-item w100" v-for="(item,index) in listResponse" :key="index">
				<div class="ub ub-ac menu-item-top w100" @click="menuShow(item)">
					<div class="menu-item-icon"><i :class="[item.icon]"></i></div>
					<div class="ub ub-f1 line1 menu-item-title">{{item.title}}</div>
					<div class="menu-item-right"><i :class="{'el-icon-arrow-down':!item.isShow,'el-icon-arrow-up':item.isShow}"></i></div>
				</div>
				<ul v-show="item.isShow" class="w100 menu-inner-list" style="padding-left:20px;">
					<li class="ub ub-pc" v-for="(_item,_index) in item.childs" :key="_index" >
						<div v-if="_item.type==='background'" class="image-box" :style="{'background-image':'url('+_item.imageUrl+')'}" @click="clickFun(_item)" ></div>
						<div v-else draggable="true"  class="image-box" :style="{'background-image':'url('+_item.imageUrl+')'}" @dragstart="dragStart($event,_item.type)"></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>

	export default {
		name: 'leftMenu',
		props:['list'],
		data() {
			return {
			}
		},
		computed:{
			listResponse(){
				return this.list;
			}
		},
		mounted() {
			
		},
		methods: {
			dragStart(e,type){
				console.log('start',e)
				e.dataTransfer.setData('type',type)
			},
			menuShow(item){
				item.isShow = !item.isShow;
			},
			clickFun(_item){
				if(_item.type==='background'){
					this.$emit('changeBackground',_item.imageUrl);
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	$titleColor:#018E9F;
	.menu{
		padding:20px;
		box-sizing: border-box;
	}
	.menu-item-icon{
		i{
			font-size:16px;
			color:$titleColor;
			cursor: pointer;
		}
		margin-right: 10px;
	}
	.menu-item-title{
		font-size:16px;
		color:$titleColor;
		cursor: pointer;
	}
	.menu-item-right{
		i{
			font-size:16px;
			color:#ccc;
			cursor: pointer;
			
		}
	}
	.menu-inner-list{
		padding:10px 0;
		>li{
			width:160px;
			height:100px;
			// border:1px solid red;
			margin-top:10px;
		}
	}
	.image-box{
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}
</style>>
