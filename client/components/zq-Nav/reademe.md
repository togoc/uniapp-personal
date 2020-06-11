**插件使用说明**

- 集合商城项目常用的搜索框/导航栏/滑动更换列表
- 使商城项目更加快速搭建

## 1. 数据放置位置

### 1.1 在pages/index中引入插件并且注册

``` javascript 
	import Nav from '@/components/zq-Nav/zq-Nav'
	import Search from '@/components/zq-Nav/zq-Search'
	components:{
		Nav: Nav,
		Search: Search
	}
```
	
### 1.2 在pages/index中的template使用组件
```html
	<scroll-view scroll-y="true"  refresher-enabled="true" :refresher-triggered="refreshering" @refresherrefresh="refresher">
		<view class="content">
			<Search></Search>
			<Nav :navData="navData" @changeTab='changeTab' :changeNavIndex="current"></Nav>
			<swiper :current="current" :autoplay="false" ::duration="100" @change="changeSwiper">
				<swiper-item  v-for="(item, index) in classifyData" >
					<view class="swiper-item">
						{{item.content}}
					</view>
				</swiper-item>
			</swiper>
		</view>
	</scroll-view>
```

### 1.3 在pages/index中data部分添加
``` javascript
		data() {
			return {
				// 导航栏数据
				navData: [],
				// 分类数据
				classifyData: [],
				// swiper动态高度
				swiperHeight: 0,
				// 默认选中第一个导航项
				current: 0,
				// 刷新状态
				refreshering: true
			}
		},
```	

### 1.3 在pages/index中methods部分添加

``` javascript
			// 选择导航栏事件
			changeTab(index){
				this.current = index
			},
			// 滑动内容页事件
			changeSwiper(e) {
				this.current = e.detail.current
				this.$emit('changeNavIndex', e.detail.current)
			},
			// 下拉刷新事件
			refresher() {
				var that = this
				that.refreshering = true
				console.log('下拉刷新')
				setTimeout(function() {
					that.refreshering = false
					console.log('刷新成功')
				},2000)
			}
```
### 1.4 在pages/index中style部分添加

```style
	scroll-view {
		height: 100%;
		.content {
			box-sizing: border-box;
			height: 100%;
			padding: 20rpx;                            //页面内边距
			swiper {
				height: calc(100% - 150rpx);
				swiper-item {                         // 内容页样式
					box-sizing: border-box;
					padding: 20rpx;
					.swiper-item {
						text-align: center;
						height: 100%;
						border-radius: 20px;
						background-color: #d7d7d7;
					}
				}
			}
		}
	}

```


## 此时只需要获取导航数据后填充到navData 和 classifyData中即可

	