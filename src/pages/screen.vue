<template>
	<dv-full-screen-container class="event main defense-screen">
			<div class="list-item" v-for="(item,index) in list" :key="index" :style="{width:item.width+'px',height:item.height+'px',top:item.top+'px',left:item.left+'px'}">
				<bar v-if="item.type==='bar'" :chartData="item" />
			</div>
	</dv-full-screen-container>
</template>

<script>
	import nodeData from './data.js'
	export default {
		name: 'screen',
		data() {
			return {
				list:[],
			}
		},
		mounted() {
			let data = this.$getsessionStorage('data');
			console.log('data',data)
			let w = 1280,h=720;
			let currentW = window.screen.width,currentH = window.screen.height;
			this.list = data.list.map(item=>{
				item.width = (currentW/w)*item.width;
				item.height = (currentH/h)*item.height;
				item.top = (currentH/h)*item.top;
				item.left = (currentW/w)*item.left;
				return item;
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	html,
	body,
	#app {
		width: 100%;
		height: 100%;
		margin: 0px;
		padding: 0px;
		
	}
	.full-screen {
		/*background-image:url(../assets/img/MK_top.jpg)!important;*/
		display: flex;
		flex-direction: column;
	}
	.main {
		background-color: #010205;
		background-image: url(../assets/img/situation_bg.jpg);
		background-repeat: no-repeat;
		/*overflow: auto;*/
		position: relative;
	}
	.list-item{
		position: absolute;
	}
</style>

