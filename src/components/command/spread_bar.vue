<template>
	<div style="width:100%;height:100%;">
		<ul class="zhus">
			<li v-for="(item,index) in liData">
				<div class="name" :title="item.name">{{ item.name }}</div>
				<div class="pross">
					<div class="s"></div>
					<div :class="classShow(index)" :style={width:item.persent}></div>
					<div class="b">{{ item.admission_personnel }}人</div>
				</div>
				<div class="tips">{{ item.persent }}</div>
			</li>
			<!--
			
			<li>
				<div class="name">我是客户</div>
				<div class="pross">
					<div class="s"></div>
					<div class="c" style="background-image: linear-gradient(90deg, #ff4e00 0%,#ff7200 100%)"></div>
					<div class="b">2人</div>
				</div>
				<div class="tips">20%</div>
			</li>
			
			<li>
				<div class="name">我是客户</div>
				<div class="pross">
					<div class="s"></div>
					<div class="c" style="background-image: linear-gradient(90deg, #ffc000 0%, #fcff00 100%)"></div>
					<div class="b">2人</div>
				</div>
				<div class="tips">20%</div>
			</li>
			
			<li>
				<div class="name">我是客户</div>
				<div class="pross">
					<div class="s"></div>
					<div class="c" style="background-image: linear-gradient(90deg, #00a2ff 0%, #00f0ff 100%)"></div>
					<div class="b">2人</div>
				</div>
				<div class="tips">20%</div>
			</li>
			
			<li>
				<div class="name">我是客户</div>
				<div class="pross">
					<div class="s"></div>
					<div class="c" style="background-image: linear-gradient(90deg, #6926ce 0%, #9a6ce7 100%)"></div>
					<div class="b">2人</div>
				</div>
				<div class="tips">20%</div>
			</li>
			
			<li>
				<div class="name">我是客户</div>
				<div class="pross">
					<div class="s"></div>
					<div class="c" style="background-image: linear-gradient(90deg, #00bb12 0%, #5bea91 100%)"></div>
					<div class="b">2人</div>
				</div>
				<div class="tips">20%</div>
			</li>
			-->
		</ul>
	</div>
</template>
<script>
export default {
    name: 'BarChart',
    props: ['showData'],
    data() {
        return {
            liData: [],
			total: 0
        }
    },
    watch: {
        showData(){
			this.dataInit();
		}
    },
    mounted() {
        this.dataInit();
    },
    methods: {
        dataInit(){
			/*const newArray = [];
			this.showData.forEach(item => {
				this.total += item.value;
				const nitem = {};
				nitem.name = item.name;
				nitem.value = item.value;
				newArray.push(nitem);
			});
			this.liData = newArray;*/
			if(this.showData && this.showData.length > 0){
				let newArray = [];
				this.showData.forEach(item => {
					const nitem = item || {};
					nitem.persent = (item.admission_personnel / item.input_personnel * 100).toFixed(1) + '%';
					//nitem.value = (item.admission_personnel / item.input_personnel * 100).toFixed(1);
					newArray.push(nitem);
				});
				//newArray = newArray.sort((a, b) => a.value - b.value);
				newArray = newArray.sort((a, b) => parseFloat(a.persent.replace('%','')) - parseFloat(b.persent.replace('%','')));
				this.liData = newArray.slice(0,5); 
			}	
		},
				
		classShow(i){
			return 'c s'+i;
		}
    }
}
</script>
<style lang="scss" scoped>

.zhus{
	width: 100%;
	height: 100%;
	li{
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 16px;
		margin-bottom:30px;
		line-height: 16px;
		.name{
			flex: 0 0 70px;
			font-size:14px;
			margin-right: 15px;
			color: #fff;
			overflow:hidden;
			text-overflow:ellipsis;
			word-break: keep-all;
		}
		.pross{
			flex: 1 1 ;
			position: relative;
			.s{
				position:absolute;
				top: 0px;
				left: 0px;
				height:16px;
				position:absolute;
				z-index:5;
				border-radius: 8px;
				background-color:rgba(0,0,0,0.5);
				width:100%;
			}
			.c{
				position:absolute;
				top: 0px;
				left: 0px;
				height:16px;
				position:absolute;
				z-index: 6;
				border-radius: 8px;
				width: 50%;				
			}
			.b{
				height:16px;
				line-height:16px;
				position:absolute;
				z-index: 6;
				font-size: 12px;
				top: 0px;
				right: 10px;
				color:#fff;
			}
		}
		.tips{
			flex: 0 0 50px;
			font-size:14px;
			margin-left:15px;
			color: #00d8ff;
			overflow:hidden;
		}
		.s0{
			background-image: linear-gradient(90deg, #ff4e00 0%,#ff7200 100%)
		}
		.s1{
			background-image: linear-gradient(90deg, #ffc000 0%, #fcff00 100%)
		}
		.s2{
			background-image: linear-gradient(90deg, #00a2ff 0%, #00f0ff 100%)
		}
		.s3{
			background-image: linear-gradient(90deg, #6926ce 0%, #9a6ce7 100%)
		}
		.s4{
			background-image: linear-gradient(90deg, #00bb12 0%, #5bea91 100%)
		}
	}
}

</style>