<template>
    <scroll-view :scroll-y="true" class="content">
        <index-list-item
            @handleClickItem="handleClickItem"
            v-for="(item, index) in indexBlogs"
            :item="item"
            :key="index"
        />
    </scroll-view>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {
            title: "Hello",
            text: "text"
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
    onReachBottom() {
        this.$store.dispatch("getIndexBlog");
    },
    methods: {
        async handleClickItem(e) {
            let { type, id } = e.target.dataset;
            if (type === undefined && id) {
                uni.navigateTo({
                    url: "../blog/blog?blogID=" + id
                });
            } else if (type) {
                switch (type) {
                    case "like":
                        let data = await this.$store.dispatch("toggleLike", id);
                    default:
                        break;
                }
                console.log(type);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
page {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 44px;
}
.content {
    width: 750rpx;
    /* #ifndef MP-WEIXIN */
    margin-top: var(--status-bar-height);
    /* #endif */
    display: flex;
    padding: 0 $uni-spacing-col-base;
    box-sizing: border-box;
    background-color: $uni-bg-color;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
}
</style>
