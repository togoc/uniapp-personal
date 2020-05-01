<template>
    <view :scroll-y="true" class="content">
        <view class="search">
            <search-bar ref="search" @click.native="handleSearch" disabled>
                <template v-slot:middle>
                    <view>
                        middle
                    </view>
                </template>
                <template v-slot:right>
                    <text
                        class="iconfont icon-add"
                        @click.stop="handleAdd"
                    ></text>
                </template>
            </search-bar>
        </view>
        <blog-item
            @handleClickItem="handleClickItem"
            @handleLiked="handleLiked"
            v-for="(item, index) in indexBlogs"
            :item="item"
            :key="index"
            class="blog-item"
        ></blog-item>
    </view>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            title: "Hello",
            text: "text",
            opacity: 1
        };
    },
    computed: {
        ...mapState(["indexBlogs"])
    },
    onReady() {
        this.$store.dispatch("getIndexBlog");
    },
    async onPullDownRefresh() {
        this.lastPage = false;
        await this.$store.dispatch("getIndexBlog");
        uni.stopPullDownRefresh();
    },
    onNavigationBarSearchInputClicked() {
        uni.navigateTo({
            url: "../search/search",
            animationType: "fade-in"
        });
    },
    // onReachBottom() {
    //     this.$store.dispatch("getIndexBlog");
    // },
    methods: {
        async handleClickItem(id) {
            uni.navigateTo({
                url: "../blog/blog?blogID=" + id
            });
        },
        async handleLiked(id) {
            let data = await this.$store.dispatch("toggleLike", id);
        },
        handleSearch() {
            uni.navigateTo({
                url: "../search/search"
            });
        },
        handleAdd() {
            console.log(2);
        }
    },
    onPageScroll(e) {
        let { scrollTop } = e;
        this.opacity = 200 / scrollTop;
    }
};
</script>

<style lang="scss" scoped>
page {
    width: 750rpx;
    height: 100%;
    box-sizing: border-box;
}
.content {
    width: 750rpx;
    display: flex;
    padding: 0px $uni-spacing-col-base 50px $uni-spacing-col-base;
    /* #ifndef H5 */
    margin-top: var(--status-bar-height);
    padding-bottom: 0;
    /* #endif */
    padding-top: 50px;

    box-sizing: border-box;
    background-color: $uni-bg-color;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .blog-item {
        width: 100%;
    }
    .search {
        width: 100%;
        position: fixed;
        z-index: 5;
        top: 0;
        height: 50px;
        /* #ifndef H5 */
        height: (50px + var(--status-bar-height));
        /* #endif */
        background-color: $uni-bg-color-grey-more;

        .title {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgb(221, 92, 92);
        }
        .icon-add {
            line-height: 50px;
            height: 50px;
            width: 100%;
            text-align: center;
            font-size: 16px;
            font-weight: bold;
        }
    }
}
</style>
