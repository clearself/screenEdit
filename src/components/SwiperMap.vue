<template>
	<div style="width:100%;height:100%;position: relative;">
		<div class="swiper-show">
			<div class="swiper-container gallery-thumbs map-switch" id="gallery-thumbs">
				<div class="ub ub-ver swiper-wrapper swipgallery-toper-wrapper">
					<div class="ub ub-ac ub-f1 ub-pc swiper-slide china">中国地图</div>
					<div class="ub ub-ac ub-f1 ub-pc swiper-slide world">世界地图</div>
				</div>
			</div>
			<div class="swiper-container gallery-top" id="gallery-top">
				<div class="swiper-wrapper">
					<div class="swiper-slide">
						<div class="item-map">1
							<HackMaps  mapType="china" id="ccc1"/>
						</div>
					</div>
					<div class="swiper-slide">
						<div class="item-map">2
							<HackMaps mapType="world" id="ccc2" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	//import Swiper from 'swiper';
	import HackMaps from '@/components/HackMapS';

	export default {
		name: 'SwiperMap',
		components: {
			'HackMaps': HackMaps
		},
		data() {
			return {
				Data1: [1],
				Data2:[1],
			}
		},
		mounted() {
			setTimeout(() => {
					var galleryThumbs = new Swiper('#gallery-thumbs', {
					spaceBetween: 0,
					direction: 'vertical',
					slidesPerView: 3,
//					freeMode: true,
					watchSlidesVisibility: true,
				});
					var galleryTop = new Swiper('#gallery-top', {
						direction: 'vertical',
						/*effect: 'fade',*/
						//					autoplay: {
						//						delay: 5000,
						//						disableOnInteraction: false,
						//					},
						thumbs: {
							swiper: galleryThumbs
						}
					});
				}, 2000)
		},
		methods: {
		}
	}
</script>
<style scoped>
	.swiper-show {
		width: 100%;
		height: 100%;
		/*display: flex;
		justify-content: space-between;*/
		margin: 0;
		padding: 0;
		position: relative;
	}
	
	.gallery-thumbs {
		width:250px;
		height:200px;
		position: absolute;
		left:4%;
		top:60%;
		transform: translateY(-100%);
		z-index: 10;
	}
	
	.gallery-thumbs .swiper-wrapper {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.gallery-top {
		width:100%;
		flex: 1 0 65%;
		height: 100%;
	}
	
	.item-map {
		height: 100%;
	}
	
	.gallery-thumbs .swiper-slide {
		width: 100% !important;
		/*margin: 20px 0!important;*/
		height: 90px;
		line-height: 90px;
		box-sizing: border-box;
		font-size: 18px;
		padding-left: 30px;
		position: relative;
		opacity: 0.5;
		color:#FFFFFF;
		
	}
	
	.china {
		background-image: url('../assets/img/02.png');
		background-repeat: no-repeat;
		background-size: contain;
	}
	
	.world {
		background-image: url('../assets/img/01.png');
		background-repeat: no-repeat;
		background-size: contain;
	}
	
	.beijing {
		background-image: url('../assets/img/03.png');
		background-repeat: no-repeat;
	}
	
	.gallery-thumbs .swiper-slide.swiper-slide-thumb-active {
		transform: scale(1.2);
		opacity: 1;
		background-position: 10px center;
		text-shadow: 0 0 10px rgba(0, 216, 255, 1);
	}
	.swiper-slide-thumb-active::before {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-left: 20px solid rgba(0, 216, 255, 1);
		right: 30px;
		top: 39px;
	}
</style>>