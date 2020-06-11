<template>
	<view class="search-box">
		<uni-icons class="icon-search" type="search" size="20" color="#666"></uni-icons>
		<input type="text" placeholder="搜索" value="" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.search-box {
		width: 100%;
		height: 50rpx;
		position: relative;
		.icon-search {
			position: absolute;
			left: 20rpx;
			line-height: 50rpx;
		}
		input{
			box-sizing: border-box;
			width: 100%;
			height: 50rpx;
			line-height: 50rpx;
			padding-left: 80rpx;
			border-radius: 20rpx;
			background-color: #d7d7d7;
			font-size: 28rpx;
			color: #666;
		}
	}
</style>
