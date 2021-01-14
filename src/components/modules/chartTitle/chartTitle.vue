<template>
	<div class="ub chart-title" :style="{width:chartData.width+'px',height:chartData.height+'px',lineHeight:chartData.lineHeight+'px'}">
		<div>
			{{chartData.title}}
		</div>
	</div>
</template>

<script>
	export default {
		name:'back',
		props:{
			chartData:{
				type:Object,
				default(){
					return {
						type:"chartTitle",
						left:0,
						top:0,
						width:200,
						height:30,
						lineHeight:30,
						title:'图表标题'
					}
				}
			}
		},
		data(){
			return{
				startBg:false,
				endBg:false
			}
		},
		methods:{
			buttonClick(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang='scss' scoped>
.ub {
	display: -webkit-box!important;
	display: -moz-box!important;
	display: -ms-flexbox!important;
	display: -o-box!important;
	display: box!important;
	position: relative;
}
.ub-ac {
	-webkit-box-align: center;
	-moz-box-align: center;
	-ms-flex-align: center;
	-o-box-align: center;
	box-align: center;
}
.ub-pc {
	-webkit-box-pack: center;
	-moz-box-pack: center;
	-ms-flex-pack: center;
	-o-box-pack: center;
	box-pack: center;
}
.button-wrapper{
	width: 100px;
	font-size:0;
	cursor: pointer;
}
.button {
    height: 30px;
    border-radius:20px;
    color:#ffffff;
    font-size:14px;
    transition: all .3s;
    box-shadow: 0 2px 6px rgba(0,0,0,.3);
	background: #449aff; /* Old browsers */
	background: -moz-linear-gradient(left, #449aff 0%, #37d5fc 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(left, #449aff 0%,#37d5fc 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to right, #449aff 0%,#37d5fc 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
}
.button:hover{
	opacity: .8;
}
</style>