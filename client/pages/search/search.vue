<template>
    <view class="search">
        <view class="search-inner">
            <search-bar
                focus
                :handleLeft="handleLeft"
                :handleRight="handleRight"
            >
                <template v-slot:left>
                    <text class="left-text iconfont icon-fanhui" />
                </template>
                <template v-slot:right>
                    <view class="text">
                        搜索
                    </view>
                </template>
            </search-bar>
        </view>
        <blog-item
            v-for="(item, index) in blogs"
            :item="item"
            :key="index"
        ></blog-item>
    </view>
</template>

<script>
export default {
    data() {
        return {
            blogs: []
        };
    },
    methods: {
        async searchBlog(keyword) {
            let blogs = await this.$http(
                "/blog-service/search?keyword=" + encodeURIComponent(keyword),
                "GET"
            );
            this.blogs = blogs;

            this.$showToast("已载入");
        },
        handleLeft() {
            uni.switchTab({
                url: "../index/index"
            });
        },
        handleRight(value) {
            this.searchBlog(value);
        }
    }
};
</script>

<style lang="scss" scope>
.search {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    /* #ifndef H5 */
    height: (50px + var(--status-bar-height));
    /* #endif */
    padding-top: calc(50px + var(--status-bar-height));
    .search-inner {
        width: 100%;
        position: fixed;
        height: 50px;
        top: 0;
        .left-text {
            display: block;
            width: 2.15rem;
            text-align: center;
            font-size: 16px;
        }
        .text {
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>
