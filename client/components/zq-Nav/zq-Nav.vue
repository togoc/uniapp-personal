<template>
	<view class="custom-nav-box">
		<scroll-view class="custom-nav" scroll-x="true" show-scrollbar="false" scroll-with-animation :scroll-left="lineBoxLeft">
			<view class="nav" v-for="(item, index) in navData" :key="index" @click="changeNav(index)" :class="index === navIndex? 'change-nav':'nav'">
				<!-- 数据格式在此修改 -->
				{{item.name}}
			</view> 
			<view class="custom-nav-line">
				<view class="line" :style='"transform:translateX("+lineLeft+"px);width:"+lineWidth+"px;background:"+lineColor+";height:"+lineHeight+"rpx;"'></view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 下划线背景色
				lineColor: '#999',
				// 下划线高度(rpx单位)
				lineHeight: 2,
				// 以下数值动态生成
				devideWidth: 0,
				lineBoxWidth: 0,
				lineBoxLeft: 0,
				lineLeft: 0,
				lineWidth: 0,
				navIndex: 0
			};
		},
		props:{
			navData: {},
			changeNavIndex: Number
		},
		watch:{
			changeNavIndex(navIndex) {
				this.navIndex = navIndex
				this.changeNav(navIndex)
			}
		},
		methods:{
			setLineWidth() {
				this.devideWidth = document.body.clientWidth
				let navDom = document.getElementsByClassName('nav')
				let lineBoxWidth = 0
				for (let i = 0; i < this.navData.length; i++) {
					this.lineBoxWidth += navDom[i].offsetWidth*2
				}
				this.lineWidth = navDom[0].offsetWidth
			},
			changeNav(index) {
				this.navIndex = index
				this.lineBoxLeft = 0
				let navDom = document.getElementsByClassName('nav')
				let navLeft = navDom[index].offsetLeft
				let navDomWidth = navDom[index].offsetWidth
				this.lineLeft = navLeft
				if (navLeft > this.devideWidth/2) {
					this.lineBoxLeft = navLeft - this.devideWidth/2
				}
				// 根据标题长度变化下划线长度
				this.lineWidth = navDomWidth
				this.$emit('changeTab', index)
			}
		},
		mounted() {
			this.$nextTick(function(){
				this.setLineWidth()
			})
		}
		
	}
</script>

<style lang="less">
	.custom-nav-box {
		height: 100rpx;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		.custom-nav {
			display: flex;
			white-space: nowrap;
			.nav {                     // 未选中字体样式
				display: inline-block;
				padding: 0 20rpx;
				font-size: 28rpx;
				color: #d8d8d8;
			}
			.change-nav {               // 选中字体样式
				font-size: 32rpx;
				font-weight: bold;
				color: #666;
			}
		}
		.custom-nav-line {
			position: relative;
			height: 4rpx; //下划线高度
			display: flex;
			.line {
				width: 100rpx;
				height: 100%;
				transition: .5s;
			}
		}
	}
</style>
