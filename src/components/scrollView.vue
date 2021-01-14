<template>
	<!--<div id="chatContent" ref="chatContent" @scroll="onScroll">-->
	<div class="chat-scroll" style="width:100%;height:100%;">
		<div class="container" :id="id" v-infinite-scroll="load" ref="objContainer">
			<div class="content">
				<div v-for="(item,index) in data" :key="index">
					<div v-if="!item.isUser" class="list-item left">
						<div class="left-contemt left">
							<div class="left-imgHeader left l" :style="{backgroundColor:item.bgc,color:item.color}">{{item.last_name}}</div>
							<div class="name left" style="width:100%;">{{item.name}}&nbsp;&nbsp;{{item.time}}</div>
							<div v-if="item.msgType==0" class="message left" :class="{'myMessage':item.isMyMessage}"><i></i>{{item.msg}}</div>
							<div v-if="item.msgType==3" class="message left"><i></i><img :src="item.msg" alt="表情" /></div>
							<div v-if="item.msgType==1" class="message left" style="background-color: rgba(0,0,0,0);padding:0;">
								<p style="margin: 14px 0;">{{item.fileName}}</p>
								<el-image class="assets-big-image" style="width:100%;height:100%" :src="item.path" fit="scale-down" @click="viewImage(item.path)">
								</el-image>
							</div>
							<div v-if="item.msgType==2" class="message left" style="background-color: rgba(0,0,0,0);padding:0;">
								<p style="margin: 14px 0;">{{item.fileName}}</p>
								<el-tooltip class="item" effect="dark" content="点击下载" placement="right">
									<a :href="item.download" download>
										<img width="100" src="../assets/img/doc.png" alt="" />
										<!--<i style="font-size:60px;color:red;" class="el-icon-document"></i>-->
									</a>
								</el-tooltip>
							</div>
						</div>
					</div>
					<div v-else class="list-item right">
						<div class="right-contemt right">
							<div class="right-imgHeader right r" :style="{backgroundColor:'#8295a3',color:item.color}">我</div>
							<div class="name right" style="text-align: right;width:100%;">{{item.time}}&nbsp;&nbsp;{{item.name}}</div>
							<div v-if="item.msgType==0" class="message right" :class="{'myMessage':item.isMyMessage}" style="background-color:#0a5968;"><i></i>
								<p class="right">{{item.msg}}</p>
							</div>
							<div v-if="item.msgType==3" class="message right" style="background-color:#0b5a6b;"><i></i>
								<p class="right"><img :src="item.msg" alt="表情" /></p>
							</div>
							<div v-if="item.msgType==1" class="message right" style="background-color: rgba(0,0,0,0);padding:0;">
								<p style="margin: 14px 0;">{{item.fileName}}</p>
								<el-image class="assets-big-image" style="width:100%;height:100%" :src="item.path" fit="scale-down" @click="viewImage(item.path)">
								</el-image>
							</div>
							<div v-if="item.msgType==2" class="message right" style="background-color: rgba(0,0,0,0);padding:0;">
								<p style="margin: 14px 0;">{{item.fileName}}</p>
								<el-tooltip class="item" effect="dark" content="点击下载" placement="left">
									<a :href="item.download" download>
										<img width="100" src="../assets/img/doc.png" alt="" />
										<!--<i style="font-size:60px;color:red;" class="el-icon-document"></i>-->
									</a>
								</el-tooltip>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="data.length>=10||data.length==0" class="ub w100 ub-pc item load-tips" style="height:20px;color:#fff;">
				<i v-if="!isLast" style="font-size:18px;" class="el-icon-loading"></i>
				<span v-else style="font-size:12px;color:#999;">{{data.length == 0 ? '': loadText}}</span>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'scrollView',
		components: {

		},
		props: {
			id: {
				type: String,
				default: function() {
					return 'container' + new Date().getTime();
				}
			},
			data: {
				type: Array,
				default: function() {
					return []
				}
			},
			refreshDelay: {
				type: Number,
				default: 10
			},
			isPush: {
				type: Boolean,
				default: false
			},
			isLast: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				pre_scrollHeight: 0,
				container: null,
				scrollHeight: 0,
				loadText: "没有更多数据",
			}
		},
		mounted() {
			var that = this;
			var isFirefox = navigator.userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器;
			var addEvent = (function() {
					if(window.addEventListener) {
						return function(el, sType, fn, capture) {
							el.addEventListener(sType, fn, (capture));
						};
					} else if(window.attachEvent) {
						return function(el, sType, fn, capture) {
							el.attachEvent("on" + sType, fn);
						};
					} else {
						return function() {};
					}
				})(),
				stopEvent = function(event) {
					if(event.stopPropagation) {
						event.stopPropagation();
					} else {
						event.cancelBubble = true;
					}
					if(event.preventDefault) {
						event.preventDefault();
					} else {
						event.returnValue = false;
					}
				},
				// isFirefox 是伪代码，大家可以自行实现 
				mousewheel = isFirefox ? "DOMMouseScroll" : "mousewheel";
			// object 是伪代码，你需要注册 Mousewheel 事件的元素 
			
			this.$nextTick(() => {
				addEvent(that.$refs.objContainer, mousewheel, function(event) {
					var e = event || window.event;
					stopEvent(e);
					if(e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件         
						console.log(e.wheelDelta)
						if(e.wheelDelta > 0) { //当滑轮向上滚动时  
							//事件
							that.$refs.objContainer.scrollTop = that.$refs.objContainer.scrollTop + 120;
						}
						if(e.wheelDelta < 0) { //当滑轮向下滚动时  
							//事件 
							that.$refs.objContainer.scrollTop = that.$refs.objContainer.scrollTop - 120;
						}
					} else if(e.detail) { //Firefox滑轮事件  
						console.log('e.detail',e.detail)
						if(e.detail > 0) { //当滑轮向上滚动时  
							//事件 
							that.$refs.objContainer.scrollTop = that.$refs.objContainer.scrollTop - 120;
						}
						if(e.detail < 0) { //当滑轮向下滚动时  
							//事件  
							that.$refs.objContainer.scrollTop = that.$refs.objContainer.scrollTop + 120;
						}
					}
				}, false);
			})
			
		},
		methods: {
				viewImage(path) {
					this.$emit('look', path);
				},

				load() {
					this.$isClick(() => {
						this.$emit('loadMore');
					})
				},
			}

		}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		/*height: 100%;*/
		overflow-y: auto;
		/*overflow-x: hidden;*/
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		direction: rtl;
	}
	
	.content {
		width: 100%;
	}
	
	.list-item {
		width: 100%;
		margin: 20px 0;
		padding: 0 40px;
		/*overflow: hidden;*/
		box-sizing: border-box;
		transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
		direction: ltr;
	}
	
	.load-tips {
		transform: rotate(180deg);
		-webkit-transform: rotate(180deg);
	}
	
	.el-image>>>.el-image-viewer__wrapper {
		transform: none;
		-webkit-transform: none;
	}
	
	.left-imgHeader,
	.right-imgHeader {
		width: 30px;
		height: 30px;
		position: absolute;
		top: 0;
		font-size: 16px;
		color: #333;
		text-align: center;
		line-height: 30px;
		border-radius: 50%;
		background-color: #ccc;
	}
	
	.left {
		float: left;
	}
	
	.right {
		float: right;
	}
	
	.l {
		left: -30px;
	}
	
	.r {
		right: -30px;
	}
	
	.left-contemt {
		width: 100%;
		position: relative;
		padding-left: 10px;
	}
	
	.right-contemt {
		width: 100%;
		position: relative;
		padding-right: 10px;
	}
	
	.name {
		font-size: 13px;
		color: #fff;
	}
	
	.message {
		margin-top: 5px;
		max-width: 50%;
		font-size: 15px;
		color: #fff;
		background-color: #0c5b6c;
		padding: 10px;
		border-radius: 5px;
		word-break: break-all;
		-webkit-user-select: text;
		-moz-user-select: text;
		-o-user-select: text;
		user-select: text;
		p {
			text-align: center;
			-webkit-user-select: text;
			-moz-user-select: text;
			-o-user-select: text;
			user-select: text;
		}
		p.right {
			text-align: justify;
			-webkit-user-select: text;
			-moz-user-select: text;
			-o-user-select: text;
			user-select: text;
		}
		a {
			display: block;
			max-width: 100%;
			text-align: center;
			cursor: pointer;
			img {
				vertical-align: top;
				max-width: 100%;
			}
		}
		i {
			width: 12px;
			height: 14px;
			position: absolute;
			top: 24px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: 100% 100%;
		}
	}
	
	.message.left i {
		left: 4px;
		background-image: url(../assets/img/corner1.png);
	}
	
	.message.right i {
		right: 4px;
		background-image: url(../assets/img/corner2.png);
	}
</style>