<template>
    <view class="content" >
        <listItem
            v-for="(item, index) in indexBlogs"
            :item="item"
            :key="index"
        />
    </view>
</template>

<script>
import listItem from "../../components/index-list-item/index-list-item";
import { mapState, mapActions } from "vuex";
export default {
    components: {
        listItem
    },
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
        this.getIndexBlog();
    },
    async onPullDownRefresh() {
        try {
            this.lastPage = false;
            this.$store.commit("REFRESHBLOGS");
            await this.getIndexBlog();
        } catch (error) {
            this.$showToast("用户信息无效");
        }
        uni.stopPullDownRefresh();
    },
    onNavigationBarSearchInputClicked() {
        uni.navigateTo({
            url: "../search/search",
            animationType: "fade-in"
        });
    },
    methods: {
        ...mapActions(["getIndexBlog"])
    },
    onReachBottom() {
        this.getIndexBlog();
    }
};
</script>

<style lang="scss" scoped>
// 750/x= 360/15
.content {
    width: 750rpx;
    /* #ifndef MP-WEIXIN */
    padding-top: 44px;
    margin-top: var(--status-bar-height);
    /* #endif */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
